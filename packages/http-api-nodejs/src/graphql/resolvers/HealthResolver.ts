import { HealthState } from '../schemas/HealthState'
import { Resolver, Query } from 'type-graphql'
import { Configuration } from '../../application/Configuration'

@Resolver(HealthState)
export class HealthResolver {
    @Query(_ => HealthState)
    async healthCheck(): Promise<HealthState> {
        return new Promise<HealthState>(resolve => {
            resolve({
                healthy: true,
                date: new Date(),
                version: Configuration.version,
            })
        })
    }
}
