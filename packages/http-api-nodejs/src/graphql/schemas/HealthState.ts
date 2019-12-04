import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class HealthState {
    @Field()
    healthy: boolean

    @Field()
    date: Date

    @Field()
    version: string
}
