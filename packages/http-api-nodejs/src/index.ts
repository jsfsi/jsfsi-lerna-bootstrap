// NOTE: We must ensure that it is imported at the top of our entry file before we use/import type-graphql
import 'reflect-metadata'
import { Application } from './application/Application'

const bootstrap = async () => {
    const application = new Application()

    await application.configure()
    application.start()
}

bootstrap()
