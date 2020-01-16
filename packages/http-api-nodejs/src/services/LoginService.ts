import { Login, User } from '@jsfsi-core-bootstrap/contracts'
import { Configuration } from '../application/Configuration'
import { HttpRequest, HttpMethods } from '@jsfsi-core/typescript-cross-platform'
import { Logger, TokenGenerator } from '@jsfsi-core/typescript-nodejs'
import { AuthenticateException } from './exceptions/AuthenticateException'

export const loginWithGoogle = async (accessToken: string): Promise<Login> => {
    try {
        const request = await HttpRequest.fetch<User>({
            href: `${Configuration.google.tokenInfoURL}${accessToken}`,
            method: HttpMethods.GET,
        })

        const token = await TokenGenerator.generateJWT<User>(
            { email: request?.data?.email },
            {
                expirationDate:
                    (new Date().getTime() + (Configuration.jwt.duration || 0)) / 1000,
                privateKey: Buffer.from(Configuration.jwt.privateKey, 'base64'),
                algorithm: Configuration.jwt.algorithm,
            },
        )

        // TODO:
        // - Use an hydrator to hydrate the google user
        // - Add long lived refresh token
        // - Return long lived refresh token in http only cookie
        return {
            token,
        }
    } catch (error) {
        Logger.debug(
            `Failed to authenticate with google access token: ${accessToken} | `,
            error,
        )
        throw new AuthenticateException('Unable to authenticate with google')
    }
}
