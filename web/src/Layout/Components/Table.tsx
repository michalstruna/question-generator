import React from 'react'
import Styled from 'styled-components'

import { Color, Duration, size } from '../../Style'
import { Segment, Sort, useSort } from '../../Data'

interface Props<Item> extends React.ComponentPropsWithoutRef<'div'> {
    items: Item[]
    columns: Column<Item>[]
    withHeader?: boolean
    onSort?: (sort: Sort) => void
    defaultSort?: Sort
    renderBody?: (items: React.ReactNode) => React.ReactNode
    segment?: Segment
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
    overflow: hidden;
    flex: 1 1 0;
    padding: 0.5rem;
    vertical-align: middle;
    word-break: break-word;
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
    
    &:empty {
        pointer-events: none;
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

let last = { columns: null, sortedColumn: null, isAsc: null, items: null, segment: null } as any

function Table<Item>({ columns, items, withHeader, onSort, defaultSort, renderBody, segment, ...props }: Props<Item>) {

    const { sort, sortedColumn, isAsc } = useSort(defaultSort ? defaultSort.column : 1, defaultSort ? defaultSort.isAsc : true)

    last.columns = columns
    last.sortedColumn = sortedColumn
    last.isAsc = isAsc
    last.items = items
    last.segment = segment

    const sortedItems = React.useMemo(() => segment ? (
        [...items].sort((a, b) => {
            const valueA = columns[sortedColumn].accessor(a, 0)
            const valueB = columns[sortedColumn].accessor(b, 0)
            return (valueA > valueB ? 1 : (valueB > valueA ? -1 : 0)) * (isAsc ? 1 : -1)
        }).slice(segment.index * segment.size, (segment.index + 1) * segment.size)
    ) : items, [columns, sortedColumn, isAsc, items, segment])

    React.useEffect(() => {
        onSort?.({ column: sortedColumn, isAsc })
    }, [sortedColumn, isAsc, onSort])

    const renderedHeader = React.useMemo(() => withHeader && (
        <HeaderRow>
            {columns.map((column, i) => (
                <HeaderCell key={i} style={{ flex: `${column.width ?? 1}` }} onClick={() => sort(i)}
                            data-sorted={sortedColumn === i ? (isAsc ? 'asc' : 'desc') : undefined}>
                    {column.title || ''}
                </HeaderCell>
            ))}
        </HeaderRow>
    ), [columns, withHeader, sort, isAsc, sortedColumn])

    const renderedItems = React.useMemo(() => (
        sortedItems.map((item, i) => (
            <Row key={i}>
                {columns.map((column, j) => (
                    <Cell key={j} style={{ flex: `${column.width ?? 1}` }}>
                        {column.render ? column.render(column.accessor(item, i), item, i) : column.accessor(item, i)}
                    </Cell>
                ))}
            </Row>
        ))
    ), [sortedItems, columns])

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