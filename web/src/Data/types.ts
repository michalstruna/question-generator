export type AsyncData<TData, TError = string | number | Error> = {
    isSent?: boolean
    payload?: TData
    error?: TError
}

export type Sort = {
    column: number
    isAsc: boolean
}