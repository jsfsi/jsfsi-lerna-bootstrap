import { Container } from 'typescript-ioc'
import { BootstrapUserRepository } from '../repositories/BootstrapUserRepository'
import { Configuration } from './Configuration'
import {
    LoginServiceConfiguration,
    UserRepository,
    RedisConfiguration,
    Storage,
    MemoryStorage,
} from '@jsfsi-core/typescript-nodejs'

export class DependencyInjection {
    public static configure() {
        Container.bind(LoginServiceConfiguration).to(Configuration)
        Container.bind(RedisConfiguration).to(Configuration)
        Container.bind(UserRepository).to(BootstrapUserRepository)
        Container.bind(Storage).to(MemoryStorage)
    }
}
