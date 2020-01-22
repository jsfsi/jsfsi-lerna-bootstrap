import { Container } from 'typescript-ioc'
import { BootstrapUserRepository } from '../repositories/BootstrapUserRepository'
import { Configuration } from './Configuration'
import { LoginServiceConfiguration, UserRepository } from '@jsfsi-core/typescript-nodejs'

export class DependencyInjection {
    public static configure() {
        Container.bind(LoginServiceConfiguration).to(Configuration)
        Container.bind(UserRepository).to(BootstrapUserRepository)
    }
}
