import React, { ChangeEvent } from 'react'
import Styled from 'styled-components'

import { useActions, useStrings } from '../../Data'
import {
    useTopics,
    getTopics,
    setSort,
    useSort,
    Topic,
    useTable,
    setTable,
    Question,
    useQuestions,
    getQuestions,
    removeTopic,
    resetQuestion,
    resetTopic,
    removeQuestion
} from '..'

import { Table, View, Window } from '../../Layout'
import { Async } from '../../Async'
import Bar from '../Components/Bar'
import { Time } from '../../Native'
import { ZIndex } from '../../Style'
import TopicForm from '../Components/TopicForm'
import QuestionForm from '../Components/QuestionForm'

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
        padding: 1rem 0.5rem;
        
        &:first-of-type {
            padding-left: 1rem;
            pointer-events: none;
        }
        
        &:nth-of-type(8n) {
            pointer-events: none;
        }
    }
    
    button {
        margin-right: 0.5rem;
    }
`

const Controls = Styled.div`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding: 1rem;
    width: 100%;
    
    & > * {
        margin: 1rem;
    }
`

const ControlRight = Styled.div`
    top: 1rem;
    position: absolute;
    right: 1rem;
`

const ALL_TOPICS = '__topics__'
const ALL_QUESTIONS = '__questions__'

const DatabaseView: React.FC<Props> & Static = () => {

    const strings = useStrings().database
    const topics = useTopics()
    const questions = useQuestions()
    const actions = useActions({ setSort, setTable, getTopics, removeTopic, removeQuestion, resetTopic, resetQuestion })
    const sort = useSort()
    const [filter, setFilter] = React.useState('')
    const table = useTable()

    React.useEffect(() => {
        actions.getTopics()
    }, [])

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        actions.setTable(event.target.value)
    }

    const renderControls = () => (
        <Controls>
            <p>
                {strings.select}
            </p>
            <select value={table} onChange={handleChange}>
                <optgroup label={strings.global}>
                    <option value={ALL_TOPICS}>{strings.allTopics}</option>
                    <option value={ALL_QUESTIONS}>{strings.allQuestions}</option>
                </optgroup>
                <optgroup label={strings.specified}>
                    {topics.payload && topics.payload.map((topic, i) => (
                        <option value={topic.id} key={i}>{strings.questionsFromTopics} {topic.name}</option>
                    ))}
                </optgroup>
            </select>
            <p>
                {strings.contains}
            </p>
            <input type='text' onChange={e => setFilter(e.target.value)} value={filter}
                   placeholder={strings.anything} />
            <ControlRight>
                <Window renderButton={() => <button>{strings.add}</button>}>
                    {table === ALL_TOPICS ? <TopicForm /> : <QuestionForm />}
                </Window>
            </ControlRight>
        </Controls>
    )

    const renderTopicsTable = () => (
        <Table<Topic>
            items={(topics.payload || []).filter(i => i.name.toLowerCase().includes(filter.toLowerCase()))}
            onSort={actions.setSort}
            defaultSort={sort}
            columns={[
                { accessor: (item, i) => (i + 1) + '.', title: '#', width: 0.25 },
                { accessor: item => item.name, title: strings.topic, width: 1.5 },
                {
                    accessor: item => item.stats.correct / item.stats.wrong,
                    title: strings.success,
                    render: (value, item) => <Bar correct={item.stats.correct} wrong={item.stats.wrong} />
                },
                { accessor: item => item.stats.questionsCount, title: strings.questions },
                { accessor: item => item.stats.correct + item.stats.wrong, title: strings.answers },
                { accessor: item => item.stats.time, title: strings.totalTime, render: Time.format },
                {
                    accessor: item => (item.stats.time / (item.stats.correct + item.stats.wrong)) || 0,
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
            items={(questions.payload || []).filter(i => i.name.toLowerCase().includes(filter.toLowerCase()))}
            onSort={actions.setSort}
            defaultSort={sort}
            columns={[
                { accessor: (item, i) => (i + 1) + '.', title: '#', width: 0.25 },
                { accessor: item => item.name, title: strings.topic, width: 3 },
                {
                    accessor: item => item.stats.correct / item.stats.wrong,
                    title: strings.success,
                    render: (value, item) => <Bar correct={item.stats.correct} wrong={item.stats.wrong} />
                },
                { accessor: item => item.stats.correct + item.stats.wrong, title: strings.answers },
                {
                    accessor: item => (item.stats.time / (item.stats.correct + item.stats.wrong)) || 0,
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
                <Async data={[questions, () => getQuestions(table), table]} success={() => items} />)} />
    )

    return (
        <Root>
            {renderControls()}
            {table === ALL_TOPICS ? renderTopicsTable() : renderQuestionsTable()}
        </Root>
    )

}

export default DatabaseView