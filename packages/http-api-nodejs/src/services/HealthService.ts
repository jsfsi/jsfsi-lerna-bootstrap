import { Configuration } from '../application/Configuration'
import { HealthState } from '@jsfsi-core/contracts'

export const healthCheck = (): HealthState => {
    return {
        healthy: true,
        date: new Date(),
        version: Configuration.version,
    }
}
