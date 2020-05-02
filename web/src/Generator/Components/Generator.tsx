import React from 'react'
import Styled from 'styled-components'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'div'> {

}

const Root = Styled.div`

`

const Generator: React.FC<Props> & Static = ({ ...props }) => {

    return (
        <Root {...props}>
            TODO
        </Root>
    )

}

export default Generator