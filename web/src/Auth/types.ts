export type User = {
    id: number
    name: string
    email: string
}

export type Identity = User & {
    token: string
}

export type Credentials = {
    email: string
    password: string
}