import { POST, Path, Context, ServiceContext } from 'typescript-rest'
import { Tags } from 'typescript-rest-swagger'
import { Inject } from 'typescript-ioc'
import { UnauthorizedError } from '@jsfsi-core/typescript-cross-platform'
import { LoginService } from '@jsfsi-core/typescript-nodejs'
import { UserToken } from '../../graphql/types/Login'
import { Configuration } from '../../../application/Configuration'

interface GoogleToken {
    accessToken: string
}

@Path('/rest/login')
export class LoginController {
    @Inject
    private configuration: Configuration

    @Inject
    private loginService: LoginService<UserToken>

    @POST
    @Path('/google')
    @Tags('Login')
    public async loginWithGoogle(
        googleToken: GoogleToken,
        @Context context: ServiceContext,
    ) {
        try {
            const loginInfo = await this.loginService.loginWithGoogle(
                googleToken?.accessToken,
            )

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
            throw new UnauthorizedError(error.message)
        }
    }
}
