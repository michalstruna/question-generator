import React from 'react'

export default (defaultIndex: number = 0, defaultIsAsc: boolean = true) => {

    const [sortedColumn, setColumn] = React.useState(defaultIndex)
    const [isAsc, setAsc] = React.useState(defaultIsAsc)

    const sort = React.useCallback((index: number) => {
        const isSameSort = index === sortedColumn
        const newIsAsc = isSameSort ? !isAsc : true

        setColumn(index)
        setAsc(newIsAsc)
    }, [sortedColumn, isAsc])

    return { sortedColumn, isAsc, sort }

}