import { User } from '@jsfsi-core-bootstrap/contracts'
import { GoogleUser, UserRepository } from '@jsfsi-core/typescript-nodejs'

export class BootstrapUserRepository extends UserRepository<User> {
    getUserByGoogleUser(googleUser: GoogleUser): Promise<User> {
        return new Promise<User>(resolve => {
            resolve({
                email: googleUser.email,
                id: googleUser.aud,
                tenants: ['1'],
                roles: ['admin'],
            } as User)
        })
    }
}
