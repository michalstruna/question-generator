import React from 'react'
import Styled from 'styled-components'

import { Link, LinkData } from '../../Routing'
import { Color, Duration, size, opacityHover, image } from '../../Style'
import MinorSectionTitle from './MinorSectionTitle'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'div'> {
    items: LineData[]
}

interface LineData {
    header: React.ReactNode
    content: React.ReactNode
    link?: LinkData
}

interface ItemProps {
    isActive: boolean
}

const Root = Styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const Item = Styled.div<ItemProps>`
    box-sizing: border-box;
    cursor: pointer;
    height: 4rem;
    overflow: hidden;
    position: relative;
    transition: height ${Duration.MEDIUM}, background-color ${Duration.MEDIUM};
    
    &:hover {
        background-color: #3C3C3C;
    }
    
    ${props => props.isActive && `
        background-color: #3C3C3C;
        cursor: auto;
        height: 100%;
        flex-grow: 1;
        
        ${Arrow} {
            transform: scale(2.5, 3.5);
        }
        
        ${ItemContent} {
            opacity: 1;
        }
    `}
`

const ItemHeader = Styled(MinorSectionTitle)`

`

const ItemContent = Styled.div`
    opacity: 0;
    pointer-events: none;
    transition: opacity ${Duration.MEDIUM};
`

const OuterArrow = Styled.div`
    background-image: linear-gradient(to right, transparent, ${Color.MEDIUM_DARK} 40%);
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 6rem;
`

const Arrow = Styled(Link)`
    ${size('1rem', '2rem')}
    ${opacityHover()}
    ${image('Controls/ArrowRight.svg')}
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    transform-origin: right center;
    transition: transform ${Duration.MEDIUM};
`

const ToggleLine: React.FC<Props> & Static = ({ items, ...props }) => {

    const [active, setActive] = React.useState(0)

    const renderedItems = React.useMemo(() => (
        items.map((item, i) => (
            <Item isActive={i === active} key={i} onClick={() => setActive(i)}>
                <ItemHeader>
                    {item.header}
                </ItemHeader>
                <ItemContent>
                    {item.content}
                </ItemContent>
                {item.link && (
                    <OuterArrow>
                        <Arrow {...item.link} />
                    </OuterArrow>
                )}
            </Item>
        ))
    ), [items, active])

    return (
        <Root {...props}>
            {renderedItems}
        </Root>
    )

}

export default ToggleLine