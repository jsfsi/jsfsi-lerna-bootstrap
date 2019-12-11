export class AuthenticateException extends Error {
    constructor(public message: string) {
        super(message)
    }
}
