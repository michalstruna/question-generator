import React from 'react'
import Styled from 'styled-components'

import { useEvent } from '../../Native'

interface Static {

}

interface Props extends React.ComponentPropsWithRef<'div'> {
    itemsCount: number
    itemRenderer: ({ index, style }: { index: number, style: object }) => React.ReactNode
    itemHeight: number | ((index: number) => number)
    scrollable?: React.RefObject<HTMLElement>
}

const Root = Styled.div`
    position: relative;
`

const VirtualizedList: React.FC<Props> & Static = ({ itemsCount, itemRenderer, itemHeight, scrollable, ...props }) => {

    const getItemHeight = React.useCallback(
        (index: number) => typeof itemHeight === 'number' ? itemHeight : itemHeight(index),
        [itemHeight])

    const { totalHeight, cumulatedHeights } = React.useMemo(() => {
        let totalHeight = typeof itemHeight === 'number' ? itemHeight : 0
        const cumulatedHeights = [0]

        for (let i = 0; i < itemsCount; i++) {
            const currentHeight = getItemHeight(i)
            totalHeight += currentHeight
            cumulatedHeights.push(cumulatedHeights[cumulatedHeights.length - 1] + currentHeight)
        }

        return { totalHeight, cumulatedHeights }
    }, [itemsCount, itemHeight, getItemHeight])

    const getIndexRange = React.useCallback((x: number) => {
        const getIndexByOffset = (offset: number) => {
            let height = 0
            let index = 0

            while (height < offset) {
                height += getItemHeight(index++)
            }

            return index
        }

        const offsetTop = root.current ? root.current.offsetTop : 0
        const scrollableHeight = scrollable && scrollable.current ? scrollable.current.getBoundingClientRect().height : window.innerHeight
        const start = Math.min(totalHeight, Math.max(0, x - offsetTop))
        const end = Math.min(totalHeight, Math.max(0, x - offsetTop + scrollableHeight))

        return { from: Math.max(0, getIndexByOffset(start) - 1), to: getIndexByOffset(end) }
    }, [scrollable, totalHeight, getItemHeight])

    const root = React.useRef<HTMLDivElement>()

    const [indexRange, setIndexRange] = React.useState(getIndexRange(0))

    const updateIndexRange = React.useCallback(() => scrollable?.current && setIndexRange(getIndexRange(scrollable.current.scrollTop)), [getIndexRange, scrollable])
    useEvent(scrollable?.current && scrollable.current as any, 'scroll', updateIndexRange)
    useEvent(window, 'resize', updateIndexRange)

    React.useEffect(() => {
        if (scrollable) {
            updateIndexRange()
        }
    }, [totalHeight, scrollable, updateIndexRange])

    const renderedItems = React.useMemo(() => {
        const renderedItems = []

        for (let i = indexRange.from; i < indexRange.to; i++) {
            renderedItems.push(itemRenderer({ index: i, style: { position: 'absolute', top: cumulatedHeights[i] } }))
        }

        return renderedItems
    }, [itemRenderer, cumulatedHeights, indexRange])

    return (
        <Root {...props} style={{ height: totalHeight }} ref={root as any}>
            {renderedItems}
        </Root>
    )

}

VirtualizedList.defaultProps = {
    scrollable: { current: document.body }
}

export default VirtualizedList