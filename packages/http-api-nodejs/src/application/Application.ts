import { Logger, HttpServerBuilder, HttpServer } from '@jsfsi-core/typescript-nodejs'
import { Configuration } from './Configuration'
import controllers from '../rest/controllers'
import { ApolloServer } from 'apollo-server-express'
import graphqlConfig from '../graphql'

export class Application {
    private server: HttpServer

    public configure() {
        Logger.configure(Configuration.log.level)
        Logger.info('Configuring application')

        this.server = new HttpServerBuilder()
            .withSwagger({ docsEndpoint: '/rest/docs' })
            .withPort(Configuration.server.port)
            .withJsonParse({ limit: '5mb' })
            .withCookieParser({})
            .withCors(Configuration.server.corsDomains)
            .withControllers(controllers)
            .build()

        const graphqlServer = new ApolloServer(graphqlConfig)

        Logger.info('Graphql playground available in path: /graphql')
        graphqlServer.applyMiddleware({ app: this.server.application, path: '/graphql' })
    }

    public start() {
        Logger.debug('Starting application')
        this.server.start()
    }
}
