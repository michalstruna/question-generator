import Path from 'path'
import QueryString from 'query-string'

import History from '../Redux/History'
import { Target, Location, QueryValue } from '../types'
import { Validator } from '../../Native'

/**
 * Push new URL to browser history.
 * @param location Target location.
 */
export const push = (location: Target): void => {
    History.push(merge(location))
}

/**
 * Replace last URL by new URL in browser history.
 * @param location Target location.
 */
export const replace = (location: Target): void => {
    History.replace(merge(location))
}

/**
 * Merge target location to source location.
 * @param target Target location.
 * @param source Source location. (optional, default current location)
 * @return Merged location.
 */
export const merge = (target: Target, source: Location = History.location): Location => {
    const result: Location = {} as any // TODO: Target?

    if (target.pathname || source.pathname) {
        const pathname = target.pathname || source.pathname
        result.pathname = Array.isArray(pathname) ? Path.join(...pathname) : pathname
    }

    if (target.query || source.search) {
        result.search = QueryString.stringify({ ...QueryString.parse(source.search), ...target.query! })
    }

    if (target.hash) {
        result.hash = target.hash
    }

    return result
}

/**
 * Check pathname from URL. If its current value is not allowed, set default value.
 */
export const safePathname = (pathParamName: string, predicate: Validator.Predicate<string>, defaultValue: string): void => {
    const value = History.location.pathname // TODO: Only parameter, not pathname.

    if (!Validator.is(value, predicate)) {
        replace({ pathname: defaultValue })
    }
}

/**
 * Check query parameter from URL. If its value is not allowed, set default value.
 */
export const safeQuery = <T extends QueryValue>(queryName: string, predicate: Validator.Predicate<QueryValue>, defaultValue: QueryValue = undefined): T => {
    let value = QueryString.parse(History.location.search, { parseNumbers: true, parseBooleans: true })[queryName]

    if (!Validator.is(value, predicate)) {
        replace({ query: { [queryName]: defaultValue } })
        return defaultValue as T
    }

    return value as T
}

/**
 * Check hash from URL. If its current value is not allowed, set default value.
 */
export const safeHash = (predicate: Validator.Predicate<string>, defaultValue: string): void => {
    const value = History.location.hash

    if (!Validator.is(value, predicate)) {
        replace({ hash: defaultValue })
    }
}

/**
 * Check if target refers to the same URL as source.
 */
export const isCurrent = (target: Target, source: Location = History.location): boolean => {
    if (target.pathname && source.pathname !== target.pathname) {
        return false
    }

    if (target.query) {
        const parsed = QueryString.parse(source.search)

        for (const i in target.query) {
            if (target.query[i] !== parsed[i]) {
                return false
            }
        }
    }

    if (target.hash && source.hash.replace('#', '') !== target.hash) {
        return false
    }

    return true
}

export { default as Url } from '../Constants/Url'
export { default as Query } from '../Constants/Query'
export { default as Hash } from '../Constants/Hash'