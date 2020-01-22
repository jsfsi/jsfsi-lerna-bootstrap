import 'cross-fetch/polyfill'
import { executeShell, TokenGenerator } from '@jsfsi-core/typescript-nodejs'
import { User, Login } from '@jsfsi-core-bootstrap/contracts'
import { Configuration } from '../configuration/Configuration'
import {
    HttpRequest,
    HttpMethods,
    HttpRequestError,
} from '@jsfsi-core/typescript-cross-platform'

describe('Login using rest and google', () => {
    it('with success', async () => {
        const googleAccessToken = await executeShell('gcloud auth print-access-token')
        const googleUserEmail = ((await executeShell(
            'gcloud config list account --format "value(core.account)"',
        )) as string).trim()

        const userLogin = await HttpRequest.fetch<Login>(
            {
                href: `${Configuration.baseUrl}${Configuration.restPath}/login/google`,
                method: HttpMethods.POST,
            },
            { accessToken: googleAccessToken },
        )

        const token = userLogin?.data?.token
        const user = await TokenGenerator.verifyJWT<User>(token, {
            publicKey: Buffer.from(Configuration.jwt.publicKey, 'base64'),
            algorithms: [Configuration.jwt.algorithm],
        })

        expect(token).toBeTruthy()
        expect(user).toBeTruthy()
        expect(user.email).toStrictEqual(googleUserEmail)
        expect(user.id).toBeTruthy()
        expect(user.tenants).toBeTruthy()
        expect(user.tenants.length).toBeTruthy()
        expect(user.roles).toBeTruthy()
        expect(user.roles.length).toBeTruthy()
    })

    it('with invalid google access token', async () => {
        try {
            await HttpRequest.fetch<Login>(
                {
                    href: `${Configuration.baseUrl}${Configuration.restPath}/login/google`,
                    method: HttpMethods.POST,
                },
                { accessToken: 'invalid' },
            )
        } catch (error) {
            const httpError = error as HttpRequestError

            expect(httpError.statusCode).toBe(401)
        }
    })
})
