import React from 'react'
import Styled from 'styled-components'

import Nav from './Nav'
import { Dimension } from '../../Style'
import { AuthControl } from '../../Auth'
import { IconText } from '../../Layout'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'div'> {

}

const Root = Styled.div`
    height: ${Dimension.NAV_HEIGHT};
`

const Left = Styled.div`
    height: 100%;
    float: left;
    max-width: 100%;
`

const Right = Styled(Left)`
    float: right;
    padding-right: 1.5rem; 
    
    ${IconText.Root} {
        background: transparent !important;
        font-weight: normal;
    }
`

const Header: React.FC<Props> & Static = ({ ...props }) => {

    return (
        <Root {...props}>
            <Left>
                <Nav />
            </Left>
            <Right>
                <AuthControl />
            </Right>
        </Root>
    )

}

export default Header