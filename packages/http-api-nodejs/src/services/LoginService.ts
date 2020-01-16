import { Login } from '@jsfsi-core-bootstrap/contracts'
import { Configuration } from '../application/Configuration'
import { HttpRequest, HttpMethods } from '@jsfsi-core/typescript-cross-platform'
import { Logger } from '@jsfsi-core/typescript-nodejs'
import { AuthenticateException } from './exceptions/AuthenticateException'
import { sign, SignOptions } from 'jsonwebtoken'

export const loginWithGoogle = async (accessToken: string): Promise<Login> => {
    try {
        const request = await HttpRequest.fetch({
            href: `${Configuration.google.tokenInfoURL}${accessToken}`,
            method: HttpMethods.GET,
        })

        const jwtPrivateKey = Buffer.from(Configuration.jwt.privateKey, 'base64')
        const jwtExpirationDate =
            (new Date().getTime() + (Configuration.jwt.duration || 0)) / 1000
        const signOptions: SignOptions = { algorithm: 'RS512' }

        // TODO:
        // - Sign JWT with user data
        return {
            token: sign(
                { user: request.data, exp: jwtExpirationDate },
                jwtPrivateKey,
                signOptions,
            ),
        }
    } catch (error) {
        Logger.debug(
            `Failed to authenticate with google access token: ${accessToken} | `,
            error,
        )
        throw new AuthenticateException('Unable to authenticate with google')
    }
}
