import React from 'react'
import Styled from 'styled-components'
import { Color, Duration, ZIndex } from '../../Style'

interface Static {
    Content: string
}

interface Props extends React.ComponentPropsWithoutRef<'div'> {
    renderButton: (isVisible: boolean) => React.ReactNode
    onToggle?: (isVisible: boolean) => void
}

const Root = Styled.div`
    height: 100%;
    position: relative;
`

const Content = Styled.div`
    background-color: #444;
    box-shadow: 0 0 0.5rem ${Color.DARK};
    pointer-events: none;
    position: absolute;
    right: 0;
    top: calc(100% + 0.5rem);
    transform: scale(0);
    transform-origin: top right;
    transition: transform ${Duration.MEDIUM};
    z-index: ${ZIndex.WINDOW};
    
    &[data-opened] {
        pointer-events: all;
        transform: scale(1);
    }
`

const Arrow = Styled.div`
    border: 0.5rem solid transparent;
    border-bottom-color: #444;
    top: 0;
    transform: translateY(-100%);
    position: absolute;
    left: 80%;
    width: 0;
`

const Window: React.FC<Props> & Static = ({ children, renderButton, onToggle, ...props }) => {

    const [isOpened, setOpened] = React.useState(false)

    const handleToggle = () => {
        onToggle && onToggle(!isOpened)
        setOpened(!isOpened)
    }

    return (
        <Root {...props} onClick={handleToggle} data-opened={isOpened || undefined}>
            {renderButton(isOpened)}
            <Content data-opened={isOpened || undefined} onClick={event => event.stopPropagation()}>
                <Arrow />
                {children}
            </Content>
        </Root>
    )

}

Window.Content = Content

Window.defaultProps = {
    onToggle: () => null
}

export default Window