import React from 'react'
import Styled from 'styled-components'

import { useActions, useStrings } from '../../Data'
import { useTopics, getTopics, setSort, useSort } from '..'
import { Table, View } from '../../Layout'
import { Async } from '../../Async'
import Bar from '../Components/Bar'
import { Time } from '../../Native'
import { Dimension, Duration, ZIndex } from '../../Style'

interface Static {

}

interface Props {

}

const Root = Styled(View)`
    min-height: calc(100vh - ${Dimension.NAV_HEIGHT} + 1px);

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

const DatabaseView: React.FC<Props> & Static = () => {

    const strings = useStrings().database
    const topics = useTopics()
    const actions = useActions({ setSort, getTopics })
    const sort = useSort()

    React.useEffect(() => {
        console.log(sort)
        actions.getTopics()
    }, [sort.column, sort.isAsc])

    return (
        <Root>
            <Table
                items={topics.payload || []}
                onSort={actions.setSort}
                defaultSort={sort}
                columns={[
                    { accessor: (item, i) => i, title: '#', width: 0.25 },
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
                        accessor: item => item.stats.time / (item.stats.correct + item.stats.wrong),
                        title: strings.timePerQuestion,
                        render: Time.format
                    },
                    {
                        accessor: item => item, title: '', render: item => (
                            <>
                                <button>
                                    {strings.reset}
                                </button>
                                <button>
                                    {strings.delete}
                                </button>
                            </>
                        )
                    }
                ]}
                renderBody={items => (
                    <Async
                        data={[topics, getTopics]}
                        success={() => items} />
                )} />
        </Root>
    )

}

export default DatabaseView