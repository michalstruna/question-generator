export type AsyncData<TData, TError = string | number | Error> = {
    pending?: boolean
    payload?: TData
    error?: TError
}

export type Sort = {
    column: number
    isAsc: boolean
}