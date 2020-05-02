import UrlValidator from 'is-absolute-url'

type FunctionPredicate<T> = (value: T) => boolean
type BiFunctionPredicate<T1, T2> = (value1: T1, value2: T2) => boolean
type ValuePredicate<T> = T
type ArrayPredicate<T> = T[]
type RegExpPredicate = RegExp
export type Predicate<T> = FunctionPredicate<T> | ValuePredicate<T> | ArrayPredicate<T> | RegExpPredicate
export type BiPredicate<T1, T2> = BiFunctionPredicate<T1, T2>

export enum Relation {
    EQUALS,
    CONTAINS,
    LESS_THAN,
    MORE_THAN,
    STARTS_WITH,
    ENDS_WITH
}

/**
 * Check value against predicate.
 */
export const is = <T>(value: T, predicate: Predicate<T>) => {
    if (predicate instanceof RegExp) {
        return predicate.test((value as any).toString())
    } else if (Array.isArray(predicate)) {
        return predicate.includes(value)
    } else if (typeof predicate === 'function') {
        return (predicate as Function)(value)
    } else {
        return value === predicate
    }
}

/**
 * Check pair of values against predicate.
 */
export const is2 = <T1, T2>(value1: T1, value2: T2, predicate: BiPredicate<T1, T2>) => {
    if (predicate instanceof RegExp) {
        return predicate.test((value1 as any).toString()) && predicate.test((value2 as any).toString())
    } else if (typeof predicate === 'function') {
        return (predicate as Function)(value1, value2)
    } else {
        return value1 === predicate && value2 === predicate
    }
}

/**
 * Compare two values depends on relation.
 */
export const compare = <T extends string | number>(value1: T, relation: Relation, value2: T) => {
    switch (relation) {
        case Relation.EQUALS:
            return value1 === value2
        case Relation.CONTAINS:
            return value1.toString().includes(value2.toString())
        case Relation.STARTS_WITH:
            return value1.toString().startsWith(value2.toString())
        case Relation.ENDS_WITH:
            return value1.toString().endsWith(value2.toString())
        case Relation.LESS_THAN:
            return value1 < value2
        case Relation.MORE_THAN:
            return value1 > value2
    }
}

/**
 * If value not match predicate, replace it by default value.
 */
export const safe = <T>(value: T, predicate: Predicate<T>, defaultValue: T) => {
    return is(value, predicate) ? value : defaultValue
}

/**
 * Common patterns.
 */
export const isUrl = UrlValidator