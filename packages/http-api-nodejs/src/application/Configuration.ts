export class Configuration {
    version = process.env.VERSION || 'local'

    jwt = {
        privateKey: process.env.JWT_PRIVATE_KEY,
        algorithm: process.env.JWT_ALGORITHM,
        duration:
            (process.env.JWT_DURATION && parseInt(process.env.JWT_DURATION)) || 5 * 60,
    }

    server = {
        port: (process.env.SERVER_PORT && parseInt(process.env.SERVER_PORT, 10)) || 8080,
        corsDomains: process.env.CORS_DOMAINS || '.*',
    }

    log = {
        level: process.env.LOG_LEVEL || 'info',
    }

    graphql = {
        path: process.env.GRAPHQL_PATH || '/graphql',
        tracing: process.env.GRAPHQL_TRACING?.toLowerCase() === 'true' || false,
        playground: process.env.GRAPHQL_PLAYGROUND?.toLowerCase() === 'true' || false,
        introspection:
            process.env.GRAPHQL_INTROSPECTION?.toLowerCase() === 'true' || false,
    }

    google = {
        tokenInfoURL: process.env.GOOGLE_TOKENINFO_URL,
    }
}
