import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

import * as Languages from '../Utils/Languages'

const selectStrings = (state: any) => state.data.strings
const selectLanguage = (state: any) => state.data.language

const selectLocalizedStrings = createSelector(
    [selectStrings, selectLanguage],
    (strings, language) => Languages.localize(strings, language)
)

export const useStrings = () => useSelector(selectLocalizedStrings)
export const useLanguage = () => useSelector(selectLanguage)