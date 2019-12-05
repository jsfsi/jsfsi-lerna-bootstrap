import { GET, Path } from 'typescript-rest'
import { Tags } from 'typescript-rest-swagger'
import * as HealthService from '../../../services/HealthService'

@Path('/rest/health')
export class HealthCheckController {
    @GET
    @Path('/')
    @Tags('HealthCheck')
    public async health() {
        return HealthService.healthCheck()
    }
}
