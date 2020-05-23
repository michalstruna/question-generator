import { Formik, FormikProps, FormikConfig, FormikHelpers } from 'formik'
import React from 'react'
import Styled from 'styled-components'

import { Color, Duration } from '../../Style'
import { Loader } from '../../Async'

interface Props<Values> extends FormikConfig<Values> {
    children?: ((props: RenderProps<Values>) => React.ReactNode)
    onChange?: (values: Values) => void
}

interface RenderProps<Values> extends FormikProps<Values> {
    renderSubmit: (label: string) => React.ReactNode
    globalError?: React.ReactNode
}

const GLOBAL_ERROR_NAME = '_global'

const Submit = Styled.button`
    background-color: ${Color.DARKEST};
    color: ${Color.LIGHT};
    display: block;
    font-weight: bold;
    margin: 1rem auto;
    margin-top: 2rem;
    padding: 0.8rem 0;
    position: relative;
    transition: background-color ${Duration.FAST}, color ${Duration.FAST};
    width: 100%;
    
    &[disabled] {
        opacity: 0.5;
        pointer-events: none;
    }
`

const FormLoader = Styled(Loader)`
    background-color: rgba(255, 255, 255, 0.1);
`

const ErrorContainer = Styled.p`
    color: ${Color.RED};
    font-size: 90%;
    margin: 0 auto;
    margin-bottom: 0.5rem;
    text-align: center;
`

function FormContainer<T>({ children, initialValues, onSubmit, onChange, ...props }: Props<T>) {  // TODO: Arrow function.

    const getRenderSubmit = (props: FormikProps<T>) => (
        (label: string, buttonProps: any = {}) => (
            <>
                <Submit
                    type='submit'
                    disabled={!props.isValid || props.isSubmitting}
                    {...buttonProps}>
                    {label}
                </Submit>
                {props.isSubmitting && <FormLoader />}
            </>
        )
    )

    const renderGlobalError = (props: any) => (
        props.errors[GLOBAL_ERROR_NAME] && (
            <ErrorContainer>
                {props.errors[GLOBAL_ERROR_NAME]}
            </ErrorContainer>
        )
    )

    const handleSubmit = async (values: T, actions: FormikHelpers<T>) => {
        try {
            await onSubmit(values, actions)
            actions.resetForm()
        } catch (error) {
            actions.setFieldError(GLOBAL_ERROR_NAME, error.toString())
        } finally {
            actions.setSubmitting(false)
        }
    }

    return (
        <Formik<T>
            initialValues={initialValues}
            validate={onChange}
            onSubmit={handleSubmit}
            {...props}>
            {props => children && children({
                ...props,
                renderSubmit: getRenderSubmit(props),
                globalError: renderGlobalError(props)
            })}
        </Formik>
    )
}

export default FormContainer