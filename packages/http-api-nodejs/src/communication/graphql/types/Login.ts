import { ObjectType, Field } from 'type-graphql'
import * as contracts from '@jsfsi-core-bootstrap/contracts'

@ObjectType()
export class Login implements contracts.Login {
    @Field()
    token: string
}
