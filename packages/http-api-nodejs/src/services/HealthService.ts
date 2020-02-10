import { Configuration } from '../application/Configuration'
import { HealthState } from '@jsfsi-core-bootstrap/contracts'

export class HealthService {
    healthCheck = (): HealthState => {
        return {
            healthy: true,
            date: new Date(),
            version: Configuration.version,
        }
    }
}
