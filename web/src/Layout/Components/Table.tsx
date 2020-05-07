import React from 'react'
import Styled from 'styled-components'

import { Color, Duration, size, threeDots } from '../../Style'
import { Sort, useSort } from '../../Data'

interface Props<Item> extends React.ComponentPropsWithoutRef<'div'> {
    items: Item[]
    columns: Column<Item>[]
    withHeader?: boolean
    onSort?: (sort: Sort) => void
    defaultSort?: Sort
    renderBody?: (items: React.ReactNode) => React.ReactNode
}

interface Column<Item> {
    accessor: (item: Item, index: number) => any
    render?: (value: any, item: Item, index: number) => React.ReactNode
    title?: React.ReactNode
    width?: number
}

const Root = Styled.div`
    ${size()}
`

const Row = Styled.div`
    align-items: stretch;
    display: flex;
    
    &:nth-of-type(2n + 1) {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

const Cell = Styled.div`
    align-items: center;
    display: flex;
    flex: 1 1 0;
    padding: 0.5rem;
    vertical-align: middle;
    width: 100%;
    
    &:nth-of-type(2n + 1) {
        background-color: rgba(0, 0, 0, 0.1);
    }
    
    &:first-of-type {
        padding-left: 1rem;
    }
    
    &:last-of-type {
        padding-right: 1rem;
    }
`

const HeaderRow = Styled(Row)`
    font-weight: bold;
`

const HeaderCell = Styled(Cell)`
    background-color: ${Color.DARKEST} !important;
    cursor: pointer;
    user-select: none;
    transition: bakcground-color ${Duration.MEDIUM};
    white-space: nowrap;

    &:hover {
        background-color: ${Color.DARKEST_HOVER} !important;
    }
    
    &:after {
        border: 5px solid transparent;
        content: "";
        display: inline-block;
        margin-left: 0.5rem;
    }
    
    &[data-sorted="asc"] {
        &:after {
            border-top-color: ${Color.LIGHT};
            transform: translateY(25%);
        }
    }
    
    &[data-sorted="desc"] {
        &:after {
            border-bottom-color: ${Color.LIGHT};
            transform: translateY(-25%);
        }
    }

`

function Table<Item>({ columns, items, withHeader, onSort, defaultSort, renderBody, ...props }: Props<Item>) {

    const { sort, sortedColumn, isAsc } = useSort(defaultSort ? defaultSort.column : 1, defaultSort ? defaultSort.isAsc : true)

    React.useEffect(() => {
        onSort?.({ column: sortedColumn, isAsc })
    }, [sortedColumn, isAsc])

    const renderedHeader = React.useMemo(() => withHeader && (
        <HeaderRow>
            {columns.map((column, i) => (
                <HeaderCell key={i} style={{ flex: `${column.width ?? 1}` }} onClick={() => sort(i)}
                            data-sorted={sortedColumn === i ? (isAsc ? 'asc' : 'desc') : undefined}>
                    {column.title || ''}
                </HeaderCell>
            ))}
        </HeaderRow>
    ), [columns, withHeader, sort])

    const renderedItems = React.useMemo(() => (
        items.map((item, i) => (
            <Row key={i}>
                {columns.map((column, j) => (
                    <Cell key={j} style={{ flex: `${column.width ?? 1}` }}>
                        {column.render ? column.render(column.accessor(item, i), item, i) : column.accessor(item, i)}
                    </Cell>
                ))}
            </Row>
        ))
    ), [items, columns])

    return (
        <Root {...props}>
            {renderedHeader}
            {renderBody ? renderBody(renderedItems) : renderedItems}
        </Root>
    )
}

Table.Root = Root
Table.Row = Row
Table.Cell = Cell
Table.HeaderRow = HeaderRow
Table.HeaderCell = HeaderCell
Table.Root = Root

Table.defaultProps = {
    withHeader: true
}

export default Table