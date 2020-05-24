export type User = {
    id: string
    name: string
}

export type Identity = Omit<User, 'id'> & {
    token: string
}

export type Credentials = {
    name: string
    password: string
}