import { useElement, useEvent } from '../../Native'

export default (element: React.RefObject<HTMLElement>) => {
    const { app } = useElement()

    useEvent(app.current, 'scroll', () => {
        if (element.current) {
            element.current.style.transform = app.current ? `translateX(${app.current.scrollLeft}px)` : ''
        }
    })
}