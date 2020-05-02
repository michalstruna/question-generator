import React from 'react'
import Styled from 'styled-components'

import { useQuestion, sendAnswer, generateQuestion, useGenerator, GeneratedQuestion, useAnswer } from '..'
import { useActions } from '../../Data'
import { Async } from '../../Async'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'div'> {

}

const Root = Styled.div`

`

const Title = Styled.h2`

`

const Question: React.FC<Props> & Static = ({ ...props }) => {

    const question = useQuestion()
    const generator = useGenerator()
    const answer = useAnswer()
    const actions = useActions({ sendAnswer, generateQuestion })

    React.useEffect(() => {
        if (generator.payload) {
            actions.generateQuestion(generator.payload.topics)
        }
    }, [generator])

    React.useEffect(() => {

    })

    const handleAnswer = () => {
        actions.sendAnswer({ token: question.payload.token, value: Math.random() < 0.5 ? 'hook' : 'props' })
    }

    const handleNext = () => {
        actions.generateQuestion(generator.topics)
    }

    const renderAnswer = () => (
        <div>
            <button onClick={handleNext}>
                Další
            </button>
        </div>
    )

    const renderQuestion = () => (
        <div>
            <Title>
                {question.payload.name}
            </Title>
            <button onClick={handleAnswer}>
                Odpovědět
            </button>
        </div>
    )

    return (
        <Root {...props}>
            <Async
                data={[[question]]}
                success={() => answer.payload ? renderAnswer() : renderQuestion()}
            />
        </Root>
    )

}

export default Question