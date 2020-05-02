import React from 'react'
import Styled from 'styled-components'

import { useQuestion, sendAnswer, generateQuestion, useGenerator, GeneratedQuestion, useAnswer } from '..'
import { useActions, useStrings } from '../../Data'
import { Async } from '../../Async'
import { Field, FieldType, Form, FormContainer } from '../../Form'
import { Color, opacityHover, size } from '../../Style'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'div'> {

}

interface AnswerFormValues {
    answer: string
}

const Root = Styled.div`
    margin-bottom: 2rem;
    width: 100%;
    min-height: 20rem;
`

const Title = Styled.h2`

`

const Answer = Styled.div`
    ${size()}
    align-items: center;
    display: flex;
    justify-content: center;
`

const Header = Styled.header`
    
`

const Buttons = Styled.div`
    display: flex;
    margin-top: 2rem;
    
    button {
        height: 3rem;
        margin-top: 0;
    }
`

const DontKnow = Styled.button`
    ${opacityHover()}
    background-color: ${Color.DARK_RED};
    font-weight: bold;
    margin-left: 0.5rem;
    width: 10rem;
`

const Question: React.FC<Props> & Static = ({ ...props }) => {

    const question = useQuestion()
    const generator = useGenerator()
    const answer = useAnswer()
    const strings = useStrings().question
    const actions = useActions({ sendAnswer, generateQuestion })

    React.useEffect(() => {
        if (generator) {
            actions.generateQuestion(generator.topics)
        }
    }, [generator])

    React.useEffect(() => {

    })

    const handleAnswer = (values: AnswerFormValues) => {
        actions.sendAnswer({ token: question.payload.token, value: values.answer })
    }

    const handleNext = () => {
        actions.generateQuestion(generator.topics)
    }

    const renderAnswer = () => (
        <Answer>
            <button onClick={handleNext}>
                Další
            </button>
        </Answer>
    )

    const renderAnswerForm = () => (
        <FormContainer<AnswerFormValues>
            initialValues={{ answer: '' }}
            onSubmit={handleAnswer}>
            {({ renderSubmit, globalError }) => (
                <Form>
                    <Field
                        type={FieldType.TEXT}
                        name='answer'
                        label={strings.answer}
                        required={strings.missingAnswer} />
                        <Buttons>
                            {renderSubmit(strings.submit)}
                            <DontKnow type='button' onClick={() => handleAnswer({ answer: '' })}>
                                {strings.dontKnow}
                            </DontKnow>
                        </Buttons>
                    {globalError}
                </Form>
            )}
        </FormContainer>
    )

    const renderHeader = () => (
        <Header>

        </Header>
    )

    return (
        <Root {...props}>
            <Async
                data={[[question]]}
                success={() => (
                    <>
                        {renderHeader()}
                        <Title>
                            {question.payload.name}
                        </Title>
                        {answer.payload ? renderAnswer() : renderAnswerForm()}
                    </>
                )}
            />
        </Root>
    )

}

export default Question