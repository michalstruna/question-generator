import * as React from 'react'
import Styled from 'styled-components'

import { Field, FieldType, Form, FormContainer } from '../../Form'
import { login } from '..'
import { useActions, useStrings } from '../../Data'

interface Props extends React.ComponentPropsWithoutRef<'form'> {

}

interface Values {
    email: string
    password: string
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

    const handleSubmit = async (values: Values) => {
        const action = await actions.login(values)

        if (action.error) {
            throw strings.error
        }
    }

    const initialValues = {
        email: '',
        password: ''
    }

    return (
        <FormContainer<Values>
            initialValues={initialValues}
            onSubmit={handleSubmit}>
            {({ renderSubmit, globalError }) => (
                <Root {...props}>
                    <h2>
                        {strings.title}
                    </h2>
                    <Field
                        type={FieldType.EMAIL}
                        name='email'
                        label={strings.email}
                        required={strings.missingEmail}
                        invalid={strings.invalidEmail} />
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