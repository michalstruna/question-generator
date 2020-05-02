import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { Reducer as GeneratorReducer } from '../../Generator'
import { Reducer as DataReducer } from '../../Data'

const RootReducer = combineReducers({
    generator: GeneratorReducer,
    data: DataReducer
})

const store = configureStore<typeof RootReducer>({ reducer: RootReducer })

export default store