import React, { FormEvent } from 'react'
import Styled from 'styled-components'

import { useActions, useStrings } from '../../Data'
import { generateQuestion, sendAnswer, setGenerator, Topic, useTopics } from '..'
import { Duration, opacityHover } from '../../Style'
import Bar from './Bar'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'form'> {

}

const Root = Styled.form`
    user-select: none;
    margin-top: 1rem;
    width: 60rem;
    
    label {
        margin: 0;
    }
`

const Title = Styled.h1`
    font-size: 200%;
    text-align: center;
`

const Subtitle = Styled.h2`
    font-size: 80%;
    font-weight: bold;
    opacity: 0.6;
    text-align: center;
`

const TopicInfo = Styled.div`
    box-sizing: border-box;
    cursor: pointer;
    filter: grayscale(100%);
    padding: 0.5rem 1rem;
    text-align: left;
    transition: filter ${Duration.MEDIUM};
        
    h3 {
        ${opacityHover()}
        margin-bottom: 0.5rem;
    }
    
    &:hover {
        h3 {
            opacity: 1;
        }
    }
`

const Topics = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 2rem 0;
    overflow: hidden;
    overflow-y: auto;
    padding: 0.5rem;
    max-height: calc(100vh - 20rem);
`

const TopicContainer = Styled.div`
    flex-grow: 1;
    width: 12rem;

    input[type="checkbox"] {
        display: none;
    
        &:checked {
            & + ${TopicInfo} {
                filter: grayscale(0%);
                
                h3 {
                    opacity: 1;
                }
            }
        }
    }
`

const Empty = Styled(TopicContainer)`
    height: 1px;
    overflow: hidden;
    pointer-events: none;
    visibility: none;
`

const Start = Styled.button`
    display: block;
    margin: 1rem auto;
    padding: 1rem 2rem;
`

const InitForm: React.FC<Props> & Static = ({ ...props }) => {

    const actions = useActions({ generateQuestion, sendAnswer, setGenerator })
    const topics = useTopics()
    const strings = useStrings().generator
    const [selectedTopics, setSelectedTopics] = React.useState<Topic[]>([])

    const handleSubmit = (event: FormEvent) => {
        if (selectedTopics.length > 0) {
            actions.setGenerator({ time: new Date().getTime(), correct: 0, topics: selectedTopics, wrong: 0 })
        }
    }

    if (!topics.payload) {
        return null
    }

    return topics.payload && (
        <Root {...props} onSubmit={handleSubmit}>
            <Title>
                {strings.title}
            </Title>
            <Subtitle>
                {strings.selectTopics}
            </Subtitle>
            <Topics>
                {topics.payload.map((topic, i) => (
                        <TopicContainer key={i}>
                            <label>
                                <input
                                    type='checkbox'
                                    onChange={event => {
                                        if (event.target.checked) {
                                            setSelectedTopics([...selectedTopics, topics.payload![i]])
                                        } else {
                                            setSelectedTopics([...selectedTopics].filter(t => t != topics.payload![i]))
                                        }
                                    }}
                                />
                                <TopicInfo>
                                    <h3>
                                        {topics.payload![i].name}
                                    </h3>
                                    <Bar correct={topics.payload![i].stats.correct}
                                         wrong={topics.payload![i].stats.wrong} />
                                </TopicInfo>
                            </label>
                        </TopicContainer>
                    )
                )}
                <Empty /><Empty /><Empty />
            </Topics>
            <Start disabled={selectedTopics.length === 0 || undefined}>
                {strings.submit}
            </Start>
        </Root>
    )

}

export default InitForm