export class Configuration {
    version = process.env.VERSION || 'local'

    jwt = {
        privateKey: process.env.JWT_PRIVATE_KEY,
        algorithm: process.env.JWT_ALGORITHM,
        duration:
            (process.env.JWT_DURATION && parseInt(process.env.JWT_DURATION)) || 5 * 60,

        refreshToken: {
            duration:
                (process.env.JWT_REFRESH_TOKEN_DURATION &&
                    parseInt(process.env.JWT_REFRESH_TOKEN_DURATION)) ||
                2592000,
        },
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

    database = {
        type: process.env.DATABASE_TYPE || 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: (process.env.DATABASE_PORT && parseInt(process.env.DATABASE_PORT)) || 5432,
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE_NAME || 'postgres',
        schema: process.env.DATABASE_SCHEMA || 'bootstrap',
        synchronize: process.env.DATABASE_SYNCHRONIZE?.toLowerCase() === 'true' || false,
    }

    cookie = {
        name: process.env.COOKIE_NAME || 'jsfsi-bootstrap',
        domain: process.env.COOKIE_DOMAIN || 'localhost',
        secure: process.env.COOKIE_SECURE?.toLowerCase() === 'true' || false,
    }

    redis = {
        host: process.env.REDIS_HOST || 'localhost',
        port: (process.env.REDIS_PORT && parseInt(process.env.REDIS_PORT)) || 6379,
        db: process.env.REDIS_DB || 'bootstrap',
        password: process.env.REDIS_PASSWORD || 'redis',
        ['connect_timeout']:
            (process.env.REDIS_TIMEOUT && parseInt(process.env.REDIS_TIMEOUT)) || 6379,
    }
}
