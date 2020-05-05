import React from 'react'
import Styled from 'styled-components'

import { useFixedX } from '../../Style'
import { Paginator, useActions, useStrings } from '../../Data'
import { setSegment, setFilter } from '../Redux/Slice'
import { useSegment, useFilter, useTopics, useTable, setTable } from '..'

interface Static {

}

interface Props extends React.ComponentPropsWithRef<'div'> {

}

const Root = Styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    height: 7rem;
    margin: 0 auto;
    max-width: calc(100% - 2rem);
    
    & > * {
        width: 33%;
    }
`

const Selector = Styled.div`
    white-space: nowrap;

    & > * {
        display: inline-block;
        margin-right: 1.5rem;
    }
`

const DatabaseSelector: React.FC<Props> & Static = ({ ...props }) => {

    const strings = useStrings().database
    const actions = useActions({ setSegment, setFilter, setTable })
    const table = useTable()

    const root = React.useRef()
    useFixedX(root as any)
    const segment = useSegment()
    const filter = useFilter()
    const topics = useTopics()

    return (
        <Root {...props} ref={root as any}>
            <Selector>
                <p>
                    {strings.select}
                </p>
                <select value={table} onChange={e => actions.setTable(e.target.value)}>
                    <option value='topics'>{strings.topics}</option>
                    <option value='questions'>{strings.questions}</option>
                </select>
                <p>
                    {strings.contains}
                </p>
                <input type='text'
                       onChange={e => actions.setFilter(e.target.value)}
                       value={filter}
                       placeholder={strings.anything} />
            </Selector>

            {topics.payload && topics.payload.totalPages > 0 ? (
                <Paginator
                    page={segment}
                    itemsCount={topics.payload.totalElements}
                    onChange={actions.setSegment}
                    freeze={topics.pending} />
            ) : <div />}
        </Root>
    )

}

export default DatabaseSelector