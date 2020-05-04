import React from 'react'
import Styled from 'styled-components'

import { Field, FieldType, Form, FormContainer } from '../../Form'
import { useActions, useStrings } from '../../Data'
import { addQuestion, QuestionNew, TopicNew, useNewTopic, useTopics } from '..'
import { Async } from '../../Async'
import { Window } from '../../Layout'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'form'> {

}

const Root = Styled(Form)`
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    width: 15rem;
    max-width: 100%;
    
    h3 {
        margin-top: 0.5rem;
        text-align: center;
    }
`

const TopicForm: React.FC<Props> & Static = ({ ...props }) => {

    const strings = useStrings().database
    const actions = useActions({ addQuestion })
    const newTopic = useNewTopic()
    const topics = useTopics()

    const handleSubmit = async (values: QuestionNew) => {
        const action = await actions.addQuestion(values)

        if (!action.error) {
            Window.hideCurrent?.()
        }

        return action
    }

    return (
        <FormContainer<QuestionNew>
            initialValues={{ name: '', answer: '', topicId: topics.payload?.[0].id || '' }}
            onSubmit={handleSubmit}>
            {({ renderSubmit, globalError }) => (
                <Root {...props}>
                    <Async data={[topics]} success={() => (
                        <>
                            <h3>
                                {strings.addQuestion}
                            </h3>
                            <Field
                                type={FieldType.TEXT}
                                name='name'
                                label={strings.name}
                                required={strings.missingName} />
                            <Field
                                type={FieldType.TEXT}
                                name='answer'
                                label={strings.answer}
                                required={strings.missingAnswer} />
                            <Field name='topicId' type={FieldType.SELECT}
                                   options={topics.payload!.map(topic => ({ text: topic.name, value: topic.id }))} />
                            {renderSubmit(strings.add)}
                            {globalError}
                            <Async data={[newTopic]} fail={() => null} />
                        </>
                    )} />
                </Root>
            )}
        </FormContainer>
    )

}

export default TopicForm