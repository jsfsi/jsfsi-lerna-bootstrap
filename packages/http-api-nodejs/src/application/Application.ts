import { Logger, HttpServerBuilder, HttpServer } from '@jsfsi-core/typescript-nodejs'
import { Configuration } from './Configuration'
import controllers from '../rest/controllers'
import resolvers from '../graphql/resolvers'

export class Application {
    private server: HttpServer

    public async configure() {
        Logger.configure(Configuration.log.level)
        Logger.info('Configuring application')

        this.server = new HttpServerBuilder()
            .withSwagger({ docsEndpoint: '/rest/docs' })
            .withPort(Configuration.server.port)
            .withJsonParse({ limit: '5mb' })
            .withCookieParser({})
            .withCors(Configuration.server.corsDomains)
            .withControllers(controllers)
            .withGraphql({
                path: '/graphql',
                resolvers,
                tracing: true,
            })
            .build()
    }

    public start() {
        Logger.debug('Starting application')
        this.server.start()
    }
}
