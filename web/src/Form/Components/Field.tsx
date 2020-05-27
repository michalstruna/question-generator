import { ErrorMessage, Field as FormikField } from 'formik'
import React from 'react'
import Styled  from 'styled-components'

import FieldType from '../Constants/FieldType'
import { Color, Duration, size } from '../../Style'

interface Type {
    name: string
    validator: (value: any) => boolean
}

interface Props extends React.ComponentPropsWithoutRef<'label'> {
    name: string
    type: Type
    label?: string
    placeholder?: string
    invalid?: string
    required?: string
    validator?: (value: any) => string
    options?: { text: string, value?: any }[]
}

type LabelProps = {
    error?: any
}

const Root = Styled.label`
    display: block;
    margin: 0.5rem 0;
    margin-top: 1rem;
    position: relative;
    text-align: left;
`

const Input = Styled(FormikField)`
    box-sizing: border-box;
    display: block;
    padding: 0.5rem 0;
    outline: none;
    width: 100%;
`

const Text = Styled.section`
    ${size('100%', '2rem', true)}
    box-sizing: border-box;
    display: block;
    font-size: 90%;
    overflow: hidden;
    pointer-events: none;
    position: absolute;
    top: 0;
    transition: transform ${Duration.MEDIUM}, color ${Duration.MEDIUM};
    transform-origin: left center;
    
    input:focus + &, input:not([data-empty="true"]) + &, select + &, textarea:focus + &, textarea:not([data-empty="true"]) + & {
        transform: translateY(-1.1rem) scale(0.8) translateZ(0);
    }
`

const Label = Styled.p<LabelProps>`
    color: ${props => props.error ? Color.RED : Color.LIGHTEST};
    margin: 0;
`

const Field: React.FC<Props> = ({ name, type, label, required, invalid, validator, placeholder, options, ...props }) => {

    const [value, setValue] = React.useState()

    const validate = (value: any) => {
        setValue(value)

        if (required && (value === null || value === undefined || value === '')) {
            return required
        }

        if (invalid && !type.validator(value)) {
            return invalid
        }

        if (validator) {
            return validator(value) ? undefined : invalid
        }
    }

    const renderOptions = () => (
        options && options.map((option, i) => (
            <option value={option.value} key={i}>
                {option.text}
            </option>
        ))
    )

    const renderControl = () => {
        if (type === FieldType.SELECT) {
            return (
                <Input
                    component='select'
                    name={name}
                    type={type.name}
                    validate={validate}>
                    {renderOptions()}
                </Input>
            )
        } else {
            return (
                <Input
                    data-empty={!value && value !== 0 ? true : undefined}
                    name={name}
                    type={type.name}
                    validate={validate}
                    autoComplete='off'
                    placeholder={placeholder} />
            )
        }
    }

    return (
        <Root {...props}>
            {renderControl()}
            <Text>
                <Label error={true} className='form__error'>
                    <ErrorMessage name={name} />
                </Label>
                <Label>
                    {label}
                </Label>
            </Text>
        </Root>
    )
}

Field.defaultProps = {
    type: FieldType.TEXT
}

export default Field

export { default as FieldType } from '../Constants/FieldType'