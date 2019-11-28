import { RestServerBuilder, Logger } from '@jsfsi-core/typescript-nodejs'

Logger.configure('debug')

const a = {
    b: 'test',
    c: {
        c1: 'test2',
    },
    d: {
        d1: 'test3',
    },
}

console.log(a?.b)
console.log(a.c?.c1)
a.d = null
console.log(a.c ?? 'Nullish Coalescing')
console.log(a.d ?? 'Nullish Coalescing')

new RestServerBuilder().build().start()
