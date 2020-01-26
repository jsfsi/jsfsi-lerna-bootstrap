import { ObjectType, Field } from 'type-graphql'

export class UserRoles {
    [key: string]: string
}

export class UserToken {
    id: string
    email: string
    tenant: string
    roles: UserRoles
}

@ObjectType()
export class User {
    @Field()
    id: string

    @Field()
    email: string
}

@ObjectType()
export class Login {
    @Field()
    user: User

    @Field()
    token: string
}
