import { Resolver, Query } from 'type-graphql'
import * as HealthService from '../../../services/HealthService'
import { HealthState } from '../schemas/HealthState'

@Resolver(HealthState)
export class HealthResolver {
    @Query(_ => HealthState)
    async healthCheck(): Promise<HealthState> {
        return new Promise<HealthState>(resolve => {
            resolve(HealthService.healthCheck())
        })
    }
}
