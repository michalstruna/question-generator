import React from 'react'
import Styled from 'styled-components'
import { Form as FormikForm } from 'formik'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'form'> {

}

const Root = Styled(FormikForm)`
    position: relative
`

const Form: React.FC<Props> & Static = ({ children, ...props }) => {

    return (
        <Root {...props}>
            {children}
        </Root>
    )

}

export default Form