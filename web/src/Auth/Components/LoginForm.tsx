import * as React from 'react'
import Styled from 'styled-components'

import { Field, FieldType, Form, FormContainer } from '../../Form'
import { Credentials, login } from '..'
import { useActions, useStrings } from '../../Data'

interface Props extends React.ComponentPropsWithoutRef<'form'> {

}

const Root = Styled(Form)`
    box-sizing: border-box;
    padding: 1rem;
    text-align: center;
    width: 16rem;
`

const LoginForm: React.FC<Props> = ({ ...props }) => {

    const actions = useActions({ login })
    const strings = useStrings().login

    const handleSubmit = async (values: Credentials) => {
        const action = await actions.login(values)

        if (action.error) {
            throw strings.error
        }
    }

    const initialValues = { name: '', password: '' }

    return (
        <FormContainer<Credentials>
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            {({ renderSubmit, globalError }) => (
                <Root {...props} id='login-form'>
                    <h2>
                        {strings.title}
                    </h2>
                    <Field
                        type={FieldType.TEXT}
                        name='name'
                        label={strings.name}
                        required={strings.missingName} />
                    <Field
                        type={FieldType.PASSWORD}
                        label={strings.password}
                        required={strings.missingPassword}
                        name='password' />
                    {renderSubmit(strings.submit)}
                    {globalError}
                </Root>
            )}
        </FormContainer>
    )
}

export default LoginForm