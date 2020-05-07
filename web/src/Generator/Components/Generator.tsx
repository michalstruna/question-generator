import React from 'react'
import Styled from 'styled-components'

import { useGenerator, generateQuestion, useQuestion } from '..'
import { useActions } from '../../Data'
import Score from './Score'
import Question from './Question'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'div'> {

}

const Root = Styled.div`
    margin: 0 auto;
    width: calc(100% - 1rem);
    max-width: 50rem;
`

const Generator: React.FC<Props> & Static = ({ ...props }) => {

    const generator = useGenerator()
    const question = useQuestion()
    const actions = useActions({ generateQuestion })

    React.useEffect(() => {
        if (!question.payload) {
            actions.generateQuestion(generator.topics.map(topic => topic.id))
        }
    }, [])

    return (
        <Root {...props}>
            <Question />
            <Score />
        </Root>
    )

}

export default Generator