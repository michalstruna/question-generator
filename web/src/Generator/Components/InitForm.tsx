import React from 'react'
import Styled from 'styled-components'
import { useActions } from '../../Data'
import { generateQuestion, sendAnswer, setGenerator, useTopics } from '..'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'div'> {

}

const Root = Styled.div`

`

const InitForm: React.FC<Props> & Static = ({ ...props }) => {

    const actions = useActions({ generateQuestion, sendAnswer, setGenerator })
    const topics = useTopics()

    const handleSubmit = () => {
        const selectedTopics = [topics.payload[0]]
        actions.setGenerator({ time: 0, correct: 0, topics: selectedTopics, wrong: 0 })
    }

    return (
        <Root {...props}>
            <button onClick={handleSubmit}>
                Začít
            </button>
        </Root>
    )

}

export default InitForm