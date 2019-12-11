import { Resolver, Mutation, Arg } from 'type-graphql'
import { Login } from '../types/Login'
import * as LoginService from '../../../services/LoginService'
import { AuthenticationError } from 'apollo-server'

@Resolver()
export class LoginResolver {
    @Mutation(_ => Login)
    async loginWithGoogle(@Arg('accessToken') accessToken: string): Promise<Login> {
        try {
            return await LoginService.loginWithGoogle(accessToken)
        } catch (error) {
            throw new AuthenticationError(error.message)
        }
    }
}
