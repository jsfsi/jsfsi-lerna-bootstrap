import { ObjectType, Field } from 'type-graphql'
import * as contracts from '@jsfsi-core-bootstrap/contracts'

@ObjectType()
export class HealthState implements contracts.HealthState {
    @Field()
    healthy: boolean

    @Field()
    date: Date

    @Field()
    version: string
}
