import { Link, HttpMethods, HttpRequest } from '@jsfsi-core/typescript-cross-platform'

const googleLink = {
    method: HttpMethods.GET,
    href: 'http://google.com',
} as Link

const call = async (link: Link) => {
    const response = await HttpRequest.fetch(link)
    console.log(response.data)
}

call(googleLink)
