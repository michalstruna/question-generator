import * as React from 'react'
import Styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { Target } from '../types'
import { Validator } from '../../Native'
import * as Urls from '../Utils/Urls'

interface Static {
    ACTIVE: string
}

interface Props extends Target, React.ComponentPropsWithoutRef<'a'> {
    replace?: boolean
}

const Root = Styled(NavLink)`
    cursor: pointer;
    display: inline-block;
    
    &.active {
        cursor: default;
        pointer-events: none;
    }
`

const AbsoluteRoot = Styled.a`
    cursor: pointer;
    display: inline-block;
`

const Link: React.FC<Props> & Static = ({ hash, query, pathname, replace, ...props }) => {

    const target = { hash, search: query, pathname }

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()

        if (replace) {
            Urls.replace({ hash, query: query, pathname })
        } else {
            Urls.push({ hash, query: query, pathname })
        }
    }

    if (pathname && (Validator.isUrl(pathname) || /.pdf$/.test(pathname))) {
        return (
            <AbsoluteRoot {...props} href={pathname} target='_blank' />
        )
    }

    return (
        <Root
            {...props}
            activeClassName={Link.ACTIVE.replace('.', '')}
            onClick={handleClick}
            exact
            to={Urls.merge(target)} />
    )
}

Link.ACTIVE = '.active'

export default Link

export { default as Url } from '../Constants/Url'
export { default as Query } from '../Constants/Query'