import React from 'react'
import Styled from 'styled-components'

import { Dimension, size } from '../../Style'
import { useStrings } from '../../Data'
import { IconText } from '../../Layout'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'nav'> {

}

const Root = Styled.nav`
    ${size('25rem', Dimension.NAV_HEIGHT, true)}
    display: flex;
    justify-content: space-around;
    user-select: none;
    text-align: center;
    max-width: 100%;
`

const Nav: React.FC<Props> & Static = ({ ...props }) => {

    const strings = useStrings().nav

    const renderedLinks = React.useMemo(() => (
        strings.links.map(({ text, icon, ...link }: any, i: number) => (
            <IconText key={i} icon={`Core/Nav/${icon}.svg`} text={text}{...link} />
        ))
    ), [strings])

    return (
        <Root {...props}>
            {renderedLinks}
        </Root>
    )

}

export default Nav