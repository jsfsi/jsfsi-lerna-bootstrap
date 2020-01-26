import { Logger, HttpServerBuilder, HttpServer } from '@jsfsi-core/typescript-nodejs'
import { Configuration } from './Configuration'
import controllers from '../communication/rest/controllers'
import resolvers from '../communication/graphql/resolvers'
import { Inject } from 'typescript-ioc'
import { createConnection, ConnectionOptions } from 'typeorm'

export class Application {
    @Inject
    private configuration: Configuration

    private server: HttpServer

    private configureServer() {
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
                context: ({ res }) => {
                    return { response: res }
                },
            })
            .build()
    }

    private async configureDatabase() {
        const configuration = {
            ...this.configuration.database,
            entities: [__dirname + '/../data/models/*.js'],
            migrations: [__dirname + '/../data/migrations/*.js'],
            uuidExtension: 'uuid-ossp',
        }

        await createConnection(configuration as ConnectionOptions)
    }

    private configureLogger() {
        Logger.configure(this.configuration.log.level)
        Logger.info('Configuring application')
    }

    public async configure() {
        this.configureLogger()
        await this.configureDatabase()
        this.configureServer()
    }

    public start() {
        Logger.debug('Starting application')
        this.server.start()
    }
}
