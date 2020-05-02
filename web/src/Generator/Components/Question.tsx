import React from 'react'
import Styled from 'styled-components'

import { useQuestion, sendAnswer, generateQuestion, useGenerator } from '..'
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
    const actions = useActions({ sendAnswer, generateQuestion })

    React.useEffect(() => {
        if (generator.payload) {
            actions.generateQuestion(generator.payload.topics)
        }
    }, [generator])

    return (
        <Root {...props}>
            <Async
                data={[[question]]}
                success={() => (
                    <div>
                        <Title>
                            {question.payload.name}
                        </Title>
                    </div>
                )}
            />
        </Root>
    )

}

export default Question