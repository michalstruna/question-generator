import React from 'react'
import Styled from 'styled-components'

import { useActions, useStrings } from '../../Data'
import {
    useTopics, getTopics, setSort, useSort, Topic, useTable, setTable, Question, useQuestions, getQuestions,
    removeTopic, resetQuestion, resetTopic, removeQuestion, useSegment, useFilter, useTopicId
} from '..'

import { Table, View, Window } from '../../Layout'
import { Async } from '../../Async'
import Bar from '../Components/Bar'
import { Time } from '../../Native'
import { Color, size, ZIndex } from '../../Style'
import TopicForm from '../Components/TopicForm'
import QuestionForm from '../Components/QuestionForm'
import DatabaseSelector from '../Components/DatabaseSelector'

interface Static {

}

interface Props {

}

const Root = Styled(View)`
    ${Table.Root} {
        min-width: 70rem;
    }

    ${Table.HeaderRow} {
        position: sticky;
        top: 0;
        z-index: ${ZIndex.TABLE_HEADER};
    }
    
    ${Table.HeaderCell} {
        line-height: 2rem;
        
        &:first-of-type {
            padding-left: 1rem;
            pointer-events: none;
        }
    }
    
    button {
        margin-right: 0.5rem;
    }
`

const Fixed = Styled.div`
    bottom: 2rem;
    position: fixed;
    right: 2rem;
`

const Add = Styled.button`
    ${size('2.5rem')}
    box-shadow: 0 0 0.3rem ${Color.DARKEST};
`

const DatabaseView: React.FC<Props> & Static = () => {

    const strings = useStrings().database
    const topics = useTopics()
    const questions = useQuestions()
    const actions = useActions({
        setSort,
        setTable,
        getTopics,
        removeTopic,
        removeQuestion,
        resetTopic,
        resetQuestion,
        getQuestions
    })
    const sort = useSort()
    const filter = useFilter()
    const segment = useSegment()
    const table = useTable()
    const topicId = useTopicId()

    const renderTopicsTable = () => (
        <Table<Topic>
            items={topics.payload?.content.filter(t => t.name.includes(filter)) || []}
            onSort={actions.setSort}
            defaultSort={sort}
            segment={segment}
            columns={[
                { accessor: (item, i) => (i + 1) + '.', title: '#', width: 0.25 },
                { accessor: item => item.name, title: strings.topic, width: 1.5 },
                {
                    accessor: item => item.correct / item.wrong,
                    title: strings.success,
                    render: (value, item) => <Bar correct={item.correct} wrong={item.wrong} />
                },
                { accessor: item => item.questionsCount, title: strings.questions },
                { accessor: item => item.correct + item.wrong, title: strings.answers },
                { accessor: item => item.totalTime, title: strings.totalTime, render: Time.format },
                {
                    accessor: item => (item.totalTime / (item.correct + item.wrong)) || 0,
                    title: strings.timePerQuestion,
                    render: Time.format
                },
                {
                    accessor: item => item, title: '', render: item => (
                        <>
                            <button onClick={() => actions.resetTopic(item.id)}>
                                {strings.reset}
                            </button>
                            <button onClick={() => actions.removeTopic(item.id)}>
                                {strings.delete}
                            </button>
                        </>
                    )
                }
            ]}
            renderBody={items => (<Async data={[topics, getTopics]} success={() => items} />)} />
    )

    const renderQuestionsTable = () => (
        <Table<Question>
            items={questions.payload?.content || []}
            onSort={actions.setSort}
            defaultSort={sort}
            columns={[
                { accessor: (item, i) => (i + 1) + '.', title: '#', width: 0.25 },
                { accessor: item => item.name, title: strings.question, width: 3 },
                { accessor: item => item.answer, title: strings.answer },
                { accessor: item => item.topic.name, title: strings.topic, width: 1.5 },
                {
                    accessor: item => item.correct / item.wrong,
                    title: strings.success,
                    render: (value, item) => <Bar correct={item.correct} wrong={item.wrong} />
                },
                { accessor: item => item.correct + item.wrong, title: strings.answers },
                { accessor: item => item.totalTime, title: strings.totalTime, render: Time.format },
                {
                    accessor: item => (item.totalTime / (item.correct + item.wrong)) || 0,
                    title: strings.timePerQuestion,
                    render: Time.format
                },
                {
                    accessor: item => item, title: '', render: item => (
                        <>
                            <button onClick={() => actions.resetQuestion(item.id)}>
                                {strings.reset}
                            </button>
                            <button onClick={() => actions.removeQuestion(item.id)}>
                                {strings.delete}
                            </button>
                        </>
                    )
                }
            ]}
            renderBody={items => (
                <Async
                    data={[[questions, () => getQuestions([{ sort, filter, segment }, topicId]), [topicId, filter, sort, segment]], [topics, getTopics]]}
                    success={() => items} />)} />
    )

    return (
        <Root>
            <DatabaseSelector />
            {table === 'topics' ? renderTopicsTable() : renderQuestionsTable()}
            <Fixed>
                <Window renderButton={() => <Add>+</Add>}>
                    {table === 'topics' ? <TopicForm /> : <QuestionForm />}
                </Window>
            </Fixed>
        </Root>
    )

}

export default DatabaseView