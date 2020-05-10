import React, { ChangeEvent } from 'react'
import Styled from 'styled-components'

import { useFixedX } from '../../Style'
import { AsyncData, Pageable, Paginator, useActions, useStrings } from '../../Data'
import { setSegment, setFilter } from '../Redux/Slice'
import {
    useSegment, useFilter, useTopics, useTable, setTable, useTopicId, setTopicId, getTopics,
    getQuestions, useQuestions
} from '..'

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
    const actions = useActions({ setSegment, setFilter, setTable, setTopicId, getQuestions, getTopics })
    const table = useTable()
    const root = React.useRef()
    useFixedX(root as any)
    const segment = useSegment()
    const filter = useFilter()
    const topics = useTopics()
    const questions = useQuestions()
    const topicId = useTopicId()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        actions.setFilter(event.target.value)
    }

    const renderPaginator = (items: AsyncData<Pageable<any>>) => (
        items.payload && items.payload.totalElements > 0 ? (
            <Paginator
                page={segment}
                itemsCount={items.payload.totalElements}
                onChange={actions.setSegment}
                freeze={items.pending} />
        ) : <div />
    )

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
                       onChange={handleChange}
                       value={filter}
                       placeholder={strings.anything} />
                {table === 'questions' && topics.payload && (
                    <>
                        <p>
                            {strings.from}
                        </p>
                        <select value={topicId} onChange={e => actions.setTopicId(e.target.value)}>
                            <option value=''>{strings.allTopics}</option>
                            {topics.payload.content.map((topic, i) => (
                                <option value={topic.id} key={i}>{topic.name}</option>
                            ))}
                        </select>
                    </>
                )}
            </Selector>

            {renderPaginator(table === 'questions' ? questions : topics)}
        </Root>
    )

}

export default DatabaseSelector