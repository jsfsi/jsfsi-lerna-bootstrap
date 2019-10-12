import { RestServerBuilder, Logger } from '@jsfsi-core/typescript-nodejs'

Logger.configure('debug')

new RestServerBuilder().build().start()
