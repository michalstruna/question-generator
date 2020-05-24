import React from 'react'
import Styled from 'styled-components'
import { Color, Duration, ZIndex } from '../../Style'

interface Static {
    Content: string
    hideCurrent?: () => void
}

interface Props extends React.ComponentPropsWithoutRef<'div'> {
    renderButton: (isVisible: boolean) => React.ReactNode
    onToggle?: (isVisible: boolean) => void
}

const Root = Styled.div`
    height: 100%;
    position: relative;
`

const Arrow = Styled.div`
    border: 0.5rem solid transparent;
    position: absolute;
    left: 80%;
    width: 0;
`

const Content = Styled.div`
    background-color: #444;
    box-shadow: 0 0 0.5rem ${Color.DARK};
    pointer-events: none;
    position: absolute;
    right: 0;
    transform: scale(0);
    transition: transform ${Duration.MEDIUM};
    z-index: ${ZIndex.WINDOW};
    
    &[data-opened] {
        pointer-events: all;
        transform: scale(1);
    }
    
    &[data-top] {
        transform-origin: top right;
        top: calc(100% + 0.5rem);
        
        ${Arrow} {
            border-bottom-color: #444;
            bottom: 100%;
        }
    }
    
    &:not([data-top]) {
        transform-origin: bottom right;
        bottom: calc(100% + 0.5rem);
        
        ${Arrow} {
            border-top-color: #444;
            top: 100%;
        }
    }
`

const Window: React.FC<Props> & Static = ({ children, renderButton, onToggle, ...props }) => {

    const [isOpened, setOpened] = React.useState(false)
    const [isTop, setTop] = React.useState(false)
    const root = React.useRef<any>()

    React.useEffect(() => {
        Window.hideCurrent = () => setOpened(false)

        const boundingRect = root.current!.getBoundingClientRect()
        const isTop = boundingRect.y < window.innerHeight / 2
        setTop(isTop)
    }, [])

    const handleToggle = () => {
        onToggle && onToggle(!isOpened)
        setOpened(!isOpened)
    }

    return (
        <Root {...props} onClick={handleToggle} data-opened={isOpened || undefined} ref={root}>
            {renderButton(isOpened)}
            <Content data-opened={isOpened || undefined} data-top={isTop || undefined} onClick={event => event.stopPropagation()}>
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