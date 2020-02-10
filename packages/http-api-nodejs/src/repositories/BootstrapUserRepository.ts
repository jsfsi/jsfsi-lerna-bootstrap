import { GoogleUser } from '@jsfsi-core/typescript-nodejs'
import { User } from '../data/models/User'
import { NotFoundError } from '@jsfsi-core/typescript-cross-platform'
import { UserToken } from '../communication/graphql/types/Login'

export class BootstrapUserRepository {
    static async getUserByGoogleUser(googleUser: GoogleUser): Promise<UserToken> {
        const user = await User.findOne({ email: googleUser.email })

        if (!user) {
            throw new NotFoundError(`User with email ${googleUser.email} does not exist`)
        }

        return {
            email: user.email,
            id: user.id,
            tenant: '1',
            roles: {
                admin: '1',
            },
        }
    }
}
