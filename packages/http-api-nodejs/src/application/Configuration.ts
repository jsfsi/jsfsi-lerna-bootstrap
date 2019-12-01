export const Configuration = {
    version: process.env.VERSION,
    server: {
        port: (process.env.SERVER_PORT && parseInt(process.env.SERVER_PORT, 10)) || 8080,
        corsDomains: process.env.CORS_DOMAINS || '.*',
    },
    log: {
        level: process.env.LOG_LEVEL || 'info',
    },
}
