import { GET, Path } from 'typescript-rest'
import { Tags } from 'typescript-rest-swagger'
import { HealthService } from '../../../services/HealthService'
import { Inject } from 'typescript-ioc'

@Path('/rest/health')
export class HealthCheckController {
    @Inject
    private healthService: HealthService

    @GET
    @Path('/')
    @Tags('HealthCheck')
    public async health() {
        return this.healthService.healthCheck()
    }
}
