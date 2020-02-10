import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { Login } from '../types/Login'
import { AuthenticationError } from 'apollo-server'
import { Context } from '@jsfsi-core/typescript-nodejs'
import { Configuration } from '../../../application/Configuration'
import { LoginService } from '../../../services/LoginService'

@Resolver()
export class LoginResolver {
    @Mutation(_ => Login)
    async loginWithGoogle(
        @Arg('accessToken') accessToken: string,
        @Ctx() context: Context,
    ): Promise<Login> {
        try {
            const loginInfo = await LoginService.loginWithGoogle(accessToken)

            context &&
                context.response.cookie(
                    Configuration.cookie.name,
                    loginInfo.refreshToken.token,
                    {
                        httpOnly: true,
                        maxAge: loginInfo.refreshToken.duration,
                        domain: Configuration.cookie.domain,
                        secure: Configuration.cookie.secure,
                    },
                )

            return { user: loginInfo.user, token: loginInfo.token }
        } catch (error) {
            throw new AuthenticationError(error.message)
        }
    }
}
