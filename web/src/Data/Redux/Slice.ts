import { createSlice } from '@reduxjs/toolkit'

import String from '../Constants/String'
import * as Languages from '../Utils/Languages'

const defaultLanguage = Languages.getDefault()
const defaultStrings = Languages.localize(String, defaultLanguage)

const slice = createSlice({
    name: 'content',
    initialState: {
        strings: defaultStrings,
        language: defaultLanguage
    },
    reducers: {
        setLanguage(state, action) {
            state.language = action.payload
            state.strings = Languages.localize(String, action.payload)
        }
    }
})

export const { setLanguage } = slice.actions
export default slice.reducer