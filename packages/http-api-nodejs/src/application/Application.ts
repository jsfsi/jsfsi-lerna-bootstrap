import { Logger, HttpServerBuilder, HttpServer } from '@jsfsi-core/typescript-nodejs'
import { Configuration } from './Configuration'
import controllers from '../communication/rest/controllers'
import resolvers from '../communication/graphql/resolvers'
import { createConnection, ConnectionOptions } from 'typeorm'

export class Application {
    private server: HttpServer

    private configureServer() {
        this.server = new HttpServerBuilder()
            .withSwagger({ docsEndpoint: '/rest/docs' })
            .withPort(Configuration.server.port)
            .withJsonParse({ limit: '5mb' })
            .withCookieParser({})
            .withCors(Configuration.server.corsDomains)
            .withControllers(controllers)
            .withGraphql({
                path: '/graphql',
                playground: Configuration.graphql.playground,
                resolvers,
                tracing: Configuration.graphql.tracing,
                introspection: Configuration.graphql.introspection,
                context: ({ res }) => {
                    return { response: res }
                },
            })
            .build()
    }

    private async configureDatabase() {
        const configuration = {
            ...Configuration.database,
            entities: [__dirname + '/../data/models/*.js'],
            migrations: [__dirname + '/../data/migrations/*.js'],
            uuidExtension: 'uuid-ossp',
        }

        await createConnection(configuration as ConnectionOptions)
    }

    private configureLogger() {
        Logger.configure(Configuration.log.level)
        Logger.info('Configuring application')
    }

    private unhandledRejection(reason: {}, promise: Promise<object>) {
        Logger.error('unhandledRejection', reason, promise)
    }

    private uncaughtException(error: Error) {
        Logger.error('uncaughtException', error)
    }

    public async configure() {
        this.configureLogger()

        process.on('unhandledRejection', this.unhandledRejection)
        process.on('uncaughtException', this.uncaughtException)
        
        await this.configureDatabase()
        this.configureServer()
    }

    public start() {
        Logger.debug('Starting application')
        this.server.start()
    }
}
