import { GET, Path } from 'typescript-rest'
import { Tags } from 'typescript-rest-swagger'

@Path('/rest/health')
export class HealthCheckController {
    @GET
    @Path('/')
    @Tags('HealthCheck')
    public async health() {
        return 'OK'
    }
}
