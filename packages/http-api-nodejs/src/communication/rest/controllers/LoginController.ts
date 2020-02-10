import { POST, Path, Context, ServiceContext } from 'typescript-rest'
import { Tags } from 'typescript-rest-swagger'
import { UnauthorizedError } from '@jsfsi-core/typescript-cross-platform'
import { Configuration } from '../../../application/Configuration'
import { LoginService } from '../../../services/LoginService'

interface GoogleToken {
    accessToken: string
}

@Path('/rest/login')
export class LoginController {
    @POST
    @Path('/google')
    @Tags('Login')
    public async loginWithGoogle(
        googleToken: GoogleToken,
        @Context context: ServiceContext,
    ) {
        try {
            const loginInfo = await LoginService.loginWithGoogle(googleToken?.accessToken)

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
            throw new UnauthorizedError(error.message)
        }
    }
}
