export type QueryValue = string | number | null | undefined | boolean | (string | number | boolean)[]
export type QuerySet = Record<string, QueryValue>

export interface Location {
    hash: string
    pathname: string
    search: string
}

export interface Target extends Omit<Partial<Location>, 'search'> {
    query?: QuerySet
}

export interface LinkData extends Target {
    text?: string
}