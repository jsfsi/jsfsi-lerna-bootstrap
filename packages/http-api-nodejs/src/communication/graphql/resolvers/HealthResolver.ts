import { Resolver, Query } from 'type-graphql'
import { HealthService } from '../../../services/HealthService'
import { HealthState } from '../types/HealthState'
import { Inject } from 'typescript-ioc'

@Resolver(HealthState)
export class HealthResolver {
    @Inject
    private healthService: HealthService

    @Query(_ => HealthState)
    async healthCheck(): Promise<HealthState> {
        return new Promise<HealthState>(resolve => {
            resolve(this.healthService.healthCheck())
        })
    }
}
