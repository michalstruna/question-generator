import React from 'react'
import Styled from 'styled-components'
import { useGenerator } from '..'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'div'> {

}

const Root = Styled.div`

`

const Score: React.FC<Props> & Static = ({ ...props }) => {

    const generator = useGenerator()

    return (
        <Root {...props}>
            {JSON.stringify(generator)}
        </Root>
    )

}

export default Score