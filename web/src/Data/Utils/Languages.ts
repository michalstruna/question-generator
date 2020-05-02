import Language from '../Constants/Language'

/**
 * Get default language depends on browser language.
 * @returns Default language.
 */
export const getDefault = (): Language => {
    const isCz = /^cs/.test(navigator.language)
    const isSk = /^sk/.test(navigator.language)
    return isCz || isSk ? Language.CS : Language.EN
}

/**
 * Recursively Localize string or object of strings.
 * @param source Source string or object of string.
 * @param language Language.
 * @returns Source translated to language.
 */
export const localize = (source: any, language: Language) => {
    source = typeof source === 'object' ? JSON.parse(JSON.stringify(source)) : source

    if (source instanceof Array) {
        for (const i in source) {
            source[i] = localize(source[i], language)
        }
    } else if (source instanceof Object) {
        if (source[Language.CS] || source[Language.EN]) {
            source = source[language] || source[Language.CS]
        } else {
            for (const i in source) {
                source[i] = localize(source[i], language)
            }
        }
    }

    return source
}