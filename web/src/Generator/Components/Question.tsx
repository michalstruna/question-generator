import React from 'react'
import Styled from 'styled-components'

import { useQuestion, sendAnswer, generateQuestion, useGenerator, useAnswer, setGenerator } from '..'
import { useActions, useStrings } from '../../Data'
import { Async } from '../../Async'
import { Field, FieldType, Form, FormContainer } from '../../Form'
import { Color, image, medium, opacityHover, size } from '../../Style'
import Tag from './Tag'
import { Time, useEvent } from '../../Native'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'div'> {

}

interface AnswerFormValues {
    answer: string
}

interface AnswerProps {
    isCorrect: boolean
}

const Root = Styled.div`
    margin-bottom: 2rem;
    width: 100%;
    min-height: 20rem;
    
    ${medium} {
        margin-bottom: 0;
        min-height: 15rem;
    }
`

const QuestionTitle = Styled.h2`

    ${medium} {
        font-size: 130%;
    }
`

const Answer = Styled.div<AnswerProps>`
    ${size('100%', '8rem')}
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 1rem;
    padding-left: 8rem;
    position: relative;
    
    ${medium} {
        margin-top: 0;
    }
    
    &:before {
        ${size()}
        ${props => image(props.isCorrect ? 'Generator/Correct.svg' : 'Generator/Wrong.svg', '6rem auto', '1rem center')}
        background-color: ${props => props.isCorrect ? Color.GREEN : Color.RED};
        content: "";
        left: 0;
        opacity: 0.2;
        pointer-events: none;
        position: absolute;
        top: 0;
        z-index: 0;
    }
    
    & > * {
        z-index: 1;
    }
    
    p {
        line-height: 1.5rem;
    }
    
    button {
        ${image('Generator/Next.svg', '3rem auto', 'calc(100% - 1rem) center')}
        ${opacityHover()}
        background-color: transparent !important;
        height: calc(100% + 2rem);
        margin-right: -1rem;
        padding-right: 5rem;
    }
`

const Header = Styled.header`
    font-size: 90%;
    font-weight: bold;
    margin-bottom: 1rem;
    
    div {
        margin-left: 1rem;
    }
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
    background-color: ${Color.DARK_RED} !important;
    font-weight: bold;
    margin-left: 0.5rem;
    width: 10rem;
`

const Exit = Styled(DontKnow)`
    background-color: ${Color.DARK} !important;
`

const AnswerTitle = Styled.h3`
    font-size: 140%;
    font-weight: bold;
    margin-bottom: 0.5rem;
`

const Question: React.FC<Props> & Static = ({ ...props }) => {

    const question = useQuestion()
    const generator = useGenerator()
    const answer = useAnswer()
    const strings = useStrings().question
    const actions = useActions({ sendAnswer, generateQuestion, setGenerator })

    const questionIndex = React.useMemo(() => generator.correct + generator.wrong, [generator])
    const topicIds = React.useMemo(() => generator.topics.map(topic => topic.id), [generator])

    useEvent(document, 'keydown', () => {
        handleNext()
    }, { active: !!answer.payload })

    const handleAnswer = (values: AnswerFormValues) => {
        actions.sendAnswer({ id: question.payload!.id, value: values.answer })
    }

    const handleNext = () => {
        actions.generateQuestion(topicIds)
    }

    const handleExit = () => {
        actions.setGenerator(undefined)
    }

    const renderAnswer = () => (
        <Async
            data={[answer]}
            success={() => (
                <Answer isCorrect={answer.payload!.isCorrect}>
                    <div>
                        <AnswerTitle>
                            {answer.payload!.isCorrect ? strings.correct : strings.wrong}
                        </AnswerTitle>
                        <p>
                            {strings.correctAnswer}: {answer.payload!.correctAnswer.replace(/\\/g, '')}
                        </p>
                        <p>
                            {strings.time}: {Time.format(answer.payload!.totalTime)}
                        </p>
                    </div>
                    <button onClick={handleNext}>
                        {strings.next}
                    </button>
                </Answer>
            )} />
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
                        <Exit type='button' onClick={handleExit}>
                            {strings.exit}
                        </Exit>
                    </Buttons>
                    {globalError}
                </Form>
            )}
        </FormContainer>
    )

    const renderHeader = () => (
        <Header>
            Otázka č. {questionIndex + 1}
            <Tag>
                {question.payload!.question.topic.name}
            </Tag>
        </Header>
    )

    return (
        <Root {...props}>
            <Async
                data={[[question]]}
                success={() => (
                    <>
                        {renderHeader()}
                        <QuestionTitle>
                            {question.payload!.question.name}
                        </QuestionTitle>
                        {answer.payload || answer.pending ? renderAnswer() : renderAnswerForm()}
                    </>
                )}
            />
        </Root>
    )

}

export default Question