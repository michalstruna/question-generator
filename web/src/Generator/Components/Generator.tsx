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

`

const Generator: React.FC<Props> & Static = ({ ...props }) => {

    const generator = useGenerator()
    const question = useQuestion()
    const actions = useActions({ generateQuestion })

    React.useEffect(() => {
        if (!question.payload) {
            actions.generateQuestion(generator.topics)
        }
    }, [])

    return (
        <Root {...props}>
            <Score />
            <Question />
        </Root>
    )

}

export default Generator