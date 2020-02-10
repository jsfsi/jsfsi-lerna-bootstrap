import { Configuration } from '../application/Configuration'
import { HealthState } from '@jsfsi-core-bootstrap/contracts'

export class HealthService {
    public static async healthCheck(): Promise<HealthState> {
        return {
            healthy: true,
            date: new Date(),
            version: Configuration.version,
        }
    }
}
