import * as React from 'react'
import { useDispatch } from 'react-redux'

import Loader from './Loader'
import { AsyncData } from '../../Data'

export interface Static<T> {

}

export interface Props<T> {
    data: AsyncDataAction<T> | AsyncDataAction<T>[]
    pending?: () => React.ReactNode
    success?: () => React.ReactNode
    fail?: () => React.ReactNode
}

type AsyncDataAction<TPayload, TError = string> = {
    0: AsyncData<TPayload, TError> // Storage in store.
    1?: () => void // Action.
    2?: any[] // Array of updaters.
}

const Async: any = <T extends any>({ data: rawData, pending, success, fail }: Props<T>) => {

    const isSingle = !Array.isArray(rawData) || (('payload' in rawData[0]) && typeof rawData[1] === 'function')
    const data = ((isSingle ? [rawData] : rawData) as any).map((item: any) => Array.isArray(item) ? item : [item])
    const dispatch = useDispatch()

    const findError = (items: AsyncDataAction<T>[]) => {
        const itemError = items.find(item => item[0].error)
        return itemError ? itemError[0].error : null
    }

    const getState = () => ({
        isPending: !!data.find((item: any) => item[0].pending),
        error: findError(data),
        hasPayloads: !data.find((item: any) => !item[0].payload)
    })

    const [deps, setDeps] = React.useState(data.map(() => []))

    React.useEffect(() => {
        for (const item of data) {
            if (!item[2] && item[1]) {
                console.log(444)
                dispatch(item[1]())
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        let isChanged = false

        for (const i in data) {
            if (!data[i][2]) {
                continue
            }

            for (const j in data[i][2]) {
                if (data[i][2][j] !== deps[i][j]) {
                    if (data[i][1]) {
                        isChanged = true
                        dispatch(data[i][1]())
                    }
                }
            }
        }

        if (isChanged) {
            setDeps(data.map((item: AsyncDataAction<any>) => item[2]))
        }
    }, [data, deps, dispatch]) // TODO: Effect is called on each render because of data.

    const { isPending, error, hasPayloads } = getState()

    if (error) {
        return fail ? fail() : error.toString()
    } else if (hasPayloads) {
        return success ? success() : null
    } else if (isPending) {
        return pending ? pending() : <Loader />
    }

    return null
}

export default Async