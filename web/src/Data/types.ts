export type AsyncData<TData, TError = string | number | Error> = {
    pending?: boolean
    payload?: TData
    error?: TError
}

export type Sort = {
    column: number
    isAsc: boolean
}

export type Filter<T = string> = T

export type Segment = {
    size: number
    index: number
}

export type Cursor = {
    sort: Sort
    filter: Filter
    segment: Segment
}

export type Pageable<Item> = {
    content: Item[]
    totalElements: number
}