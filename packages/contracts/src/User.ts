export interface User {
    id: string
    email: string
    tenants: Array<string>
    roles: Array<string>
}
