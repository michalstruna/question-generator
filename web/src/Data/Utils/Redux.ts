import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import Query from '../../Routing/Constants/Query'
import { Validator } from '../../Native'
import { Urls } from '../../Routing'

export const async = <T>(payload: T | null = null) => ({ pending: false, payload, error: null })
export const empty = <T>(value: any = undefined) => value as T

type PlainOptions<State, Payload> = {
    syncObject?: (state: State) => ({
        [K in keyof Payload]?: [Query, Validator.Predicate<Payload[K]>, Payload[K]]
    })
    sync?: (state: State) => ([Query, Validator.Predicate<Payload>, Payload])
}

type AsyncOptions<State, Payload> = {
    onPending?: (state: State, action: Action<Payload>) => any
    onSuccess?: (state: State, action: Action<Payload>) => any
    onError?: (state: State, action: Action<Payload>) => any
}

export type Action<Payload = void, Error = { message: string }> = {
    payload: Payload
    type: string
    error?: Error
}

enum ActionType {PLAIN, ASYNC, SET}

type AsyncAction<Payload, ResultPayload = Payload> = (payload: Payload) => Promise<ResultPayload>
type PlainAction<State, Payload> = (state: State, payload: Action<Payload>) => any

type PlainActionCreator<State> = <Payload>(action: PlainAction<State, Payload>, options?: PlainOptions<State, Payload>) => PlainActionWrapper<State, Payload>
type AsyncActionCreator<State> = <Payload, ResultPayload>(property: keyof State, action: AsyncAction<Payload, ResultPayload>, options?: AsyncOptions<State, Payload>) => AsyncActionWrapper<State, Payload, ResultPayload>
type SetActionCreator<State> = <Payload>(property: keyof State, options?: PlainOptions<State, Payload>) => SetActionWrapper<State, Payload>

type ActionWrapper<State, Payload = any> = PlainActionWrapper<State, Payload> | AsyncActionWrapper<State, Payload, any> | SetActionWrapper<State, Payload>
type PlainActionWrapper<State, Payload> = { type: ActionType.PLAIN, action: PlainAction<State, Payload>, options?: PlainOptions<State, Payload> }
type AsyncActionWrapper<State, Payload, ResultPayload> = { type: ActionType.ASYNC, action: AsyncAction<Payload, ResultPayload>, property: keyof State, options?: AsyncOptions<State, Payload> }
type SetActionWrapper<State, Payload> = { type: ActionType.SET, action: PlainAction<State, Payload>, property: keyof State, options?: PlainOptions<State, Payload> }

type ActionsSet<State> = {
    plain: PlainActionCreator<State>
    async: AsyncActionCreator<State>
    set: SetActionCreator<State>
}

export const slice = <State extends Record<any, any>, Actions extends Record<string, ActionWrapper<State>>>(name: string, initialState: State, actionsAccessor: (actions: ActionsSet<State>) => Actions) => {
    const reducers = {} as any
    const extraReducers = {} as any
    const extraActions = {} as any

    const actions = actionsAccessor({
        plain: action => ({ type: ActionType.PLAIN, action }),
        async: (property, action, options) => ({
            type: ActionType.ASYNC, property, action, options
        }),
        set: (property, options) => ({
            type: ActionType.SET, property, action: (state, action) => state[property] = action.payload as any, options
        })
    })

    for (const [key, value] of Object.entries(actions)) {
        if (value.type === ActionType.PLAIN) {
            reducers[key] = <T>(state: State, action: Action<T>) => {
                value.action(state, action)
            }
        } else if (value.type === ActionType.SET) {
            if (value.options) {
                if (value.options.syncObject) {
                    const syncObject = value.options.syncObject(initialState)

                    for (const i in syncObject) {
                        const [queryName, validator, defaultValue] = syncObject[i]!
                        initialState[value.property][i] = Urls.safeQuery(queryName, validator, defaultValue)
                    }
                }

                if (value.options.sync) {
                    const [queryName, validator, defaultValue] = value.options.sync(initialState)
                    initialState[value.property] = Urls.safeQuery(queryName, validator, defaultValue)
                }
            }

            reducers[key] = <T>(state: State, action: Action<T>) => {
                if (value.options) {
                    if (value.options.syncObject) {
                        const syncObject = value.options.syncObject(state)

                        for (const i in syncObject) {
                            const [queryName, validator, defaultValue] = syncObject[i]!
                            const queryValue = Validator.safe((action.payload as any)[i], validator, defaultValue)
                            state[value.property][i] = queryValue
                            Urls.replace({ query: { [queryName]: queryValue } })
                        }
                    }

                    if (value.options.sync) {
                        const [queryName, validator, defaultValue] = value.options.sync(initialState)
                        const queryValue = Validator.safe((action.payload as any), validator, defaultValue)
                        state[value.property] = queryValue
                        Urls.replace({ query: { [queryName]: queryValue } })
                    }
                }

                value.action(state, action)
            }
        } else if (value.type === ActionType.ASYNC) {
            const thunk = createAsyncThunk(name + '/' + key, value.action)

            extraActions[key] = thunk

            extraReducers[thunk.pending.type] = (state: State, action: PayloadAction) => {
                state[value.property].pending = true

                if (value.options && value.options.onPending) {
                    value.options.onPending(state, action)
                } else {
                    state[value.property].payload = null
                    state[value.property].error = null
                }
            }

            extraReducers[thunk.fulfilled.type] = (state: State, action: PayloadAction) => {
                state[value.property].pending = false
                state[value.property].error = null

                if (value.options && value.options.onSuccess) {
                    value.options.onSuccess(state, action)
                } else {
                    state[value.property].payload = action.payload
                }
            }

            extraReducers[thunk.rejected.type] = (state: State, action: PayloadAction<any, string, any, Error>) => {
                state[value.property].pending = false
                state[value.property].error = action.error.message

                if (value.options && value.options.onError) {
                    value.options.onError(state, action)
                }
            }

        }
    }

    const slice = createSlice({ name, initialState, reducers, extraReducers })

    type OutputActions = {
        [T in keyof Actions]: Actions[T] extends AsyncActionWrapper<State, infer Payload, any> ?
            (payload: Payload) => any :
            Actions[T] extends { type: any, action: (state: State, action: Action<infer Payload>) => void, property?: any, options?: any } ?
                (payload: Payload) => any :
                never
    }

    return {
        actions: { ...slice.actions, ...extraActions } as OutputActions,
        reducer: slice.reducer
    }
}