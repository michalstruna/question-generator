import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { Reducer as AuthReducer } from '../../Auth'
import { Reducer as DataReducer } from '../../Data'
import { Reducer as GeneratorReducer } from '../../Generator'

const RootReducer = combineReducers({
    auth: AuthReducer,
    data: DataReducer,
    generator: GeneratorReducer,
})

const store = configureStore<any>({ reducer: RootReducer })

export default store