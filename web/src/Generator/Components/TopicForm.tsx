import React from 'react'
import Styled from 'styled-components'

import { Field, FieldType, Form, FormContainer } from '../../Form'
import { useActions, useStrings } from '../../Data'
import { addTopic, TopicNew, useNewTopic } from '..'
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
    const actions = useActions({ addTopic })
    const newTopic = useNewTopic()

    const handleSubmit = async (values: TopicNew) => {
        const action = await actions.addTopic(values)

        if (!action.error) {
            Window.hideCurrent?.()
        }

        return action
    }

    return (
        <FormContainer<TopicNew>
            initialValues={{ name: '' }}
            onSubmit={handleSubmit}>
            {({ renderSubmit, globalError }) => (
                <Root {...props} id='add-topic-form'>
                    <h3>
                        {strings.addTopic}
                    </h3>
                    <Field
                        type={FieldType.TEXT}
                        name='name'
                        label={strings.name}
                        required={strings.missingName} />
                    {renderSubmit(strings.add)}
                    {globalError}
                    <Async data={[newTopic]} fail={() => null} />
                </Root>
            )}
        </FormContainer>
    )

}

export default TopicForm