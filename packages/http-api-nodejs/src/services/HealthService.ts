import { Configuration } from '../application/Configuration'
import { HealthState } from '@jsfsi-core-bootstrap/contracts'
import { Inject } from 'typescript-ioc'

export class HealthService {
    @Inject
    private configuration: Configuration

    healthCheck = (): HealthState => {
        return {
            healthy: true,
            date: new Date(),
            version: this.configuration.version,
        }
    }
}
