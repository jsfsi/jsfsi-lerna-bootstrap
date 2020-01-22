import { Logger, HttpServerBuilder, HttpServer } from '@jsfsi-core/typescript-nodejs'
import { Configuration } from './Configuration'
import controllers from '../communication/rest/controllers'
import resolvers from '../communication/graphql/resolvers'
import { Inject } from 'typescript-ioc'

export class Application {
    @Inject
    private configuration: Configuration

    private server: HttpServer

    public async configure() {
        Logger.configure(this.configuration.log.level)
        Logger.info('Configuring application')

        this.server = new HttpServerBuilder()
            .withSwagger({ docsEndpoint: '/rest/docs' })
            .withPort(this.configuration.server.port)
            .withJsonParse({ limit: '5mb' })
            .withCookieParser({})
            .withCors(this.configuration.server.corsDomains)
            .withControllers(controllers)
            .withGraphql({
                path: '/graphql',
                playground: this.configuration.graphql.playground,
                resolvers,
                tracing: this.configuration.graphql.tracing,
                introspection: this.configuration.graphql.introspection,
            })
            .build()
    }

    public start() {
        Logger.debug('Starting application')
        this.server.start()
    }
}
