import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { Inject } from 'typescript-ioc'
import { Login, UserToken } from '../types/Login'
import { AuthenticationError } from 'apollo-server'
import { LoginService, Context } from '@jsfsi-core/typescript-nodejs'
import { Configuration } from '../../../application/Configuration'

@Resolver()
export class LoginResolver {
    @Inject
    private configuration: Configuration

    @Inject
    private loginService: LoginService<UserToken>

    @Mutation(_ => Login)
    async loginWithGoogle(
        @Arg('accessToken') accessToken: string,
        @Ctx() context: Context,
    ): Promise<Login> {
        try {
            const loginInfo = await this.loginService.loginWithGoogle(accessToken)

            context &&
                context.response.cookie(
                    this.configuration.cookie.name,
                    loginInfo.refreshToken.token,
                    {
                        httpOnly: true,
                        maxAge: loginInfo.refreshToken.duration,
                        domain: this.configuration.cookie.domain,
                        secure: this.configuration.cookie.secure,
                    },
                )

            return { user: loginInfo.user, token: loginInfo.token }
        } catch (error) {
            throw new AuthenticationError(error.message)
        }
    }
}
