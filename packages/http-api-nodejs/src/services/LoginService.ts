import { UnauthorizedError } from '@jsfsi-core/typescript-cross-platform'
import {
    Google,
    Logger,
    Storage,
    md5,
    MemoryStorage,
    TokenGenerator,
} from '@jsfsi-core/typescript-nodejs'
import { Configuration } from '../application/Configuration'
import { BootstrapUserRepository } from '../repositories/BootstrapUserRepository'
import { UserToken } from '../communication/graphql/types/Login'

export class LoginService {
    // TODO: conditionally instantiate either memory or redis storage based on configuration
    private static tokenStorage: Storage<string, string> = new MemoryStorage()

    private static privateKey: Buffer = Buffer.from(
        Configuration.jwt.privateKey,
        'base64',
    )
    private static google: Google = new Google(Configuration.google.tokenInfoURL)

    public static async loginWithGoogle(accessToken: string) {
        try {
            const { jwt } = Configuration

            const googleUser = await this.google.userInfo(accessToken)

            const user = await BootstrapUserRepository.getUserByGoogleUser(googleUser)
            const expirationDate = (new Date().getTime() + (jwt.duration || 0)) / 1000
            const privateKey = this.privateKey

            const token = await TokenGenerator.generateJWT<UserToken>(user, {
                expirationDate,
                privateKey,
                algorithm: jwt.algorithm,
            })

            const refreshToken = md5(user)
            await this.tokenStorage.set(refreshToken, JSON.stringify(user))
            await this.tokenStorage.expireIn(refreshToken, jwt.refreshToken.duration)

            return {
                user,
                token,
                refreshToken: {
                    token: refreshToken,
                    duration: jwt.refreshToken.duration,
                },
            }
        } catch (error) {
            Logger.debug(
                `Failed to authenticate with google access token: ${accessToken} | `,
                error,
            )
            throw new UnauthorizedError('Unable to authenticate with google')
        }
    }
}
