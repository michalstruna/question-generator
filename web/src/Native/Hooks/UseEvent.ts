import React, { useRef } from 'react'
import { throttle } from 'throttle-debounce'

type Target = Element | Window | Document
type Handler = () => void

type Options = {
    immediate?: boolean
    active?: boolean
    throttle?: number
    passive?: boolean
}

const defaultOptions = {
    immediate: false,
    active: true,
    passive: true
}

export default (element: Target, event: string, handler: Handler, options: Options = defaultOptions) => {
    const handlerRef = useRef(handler)

    React.useEffect(() => {
        handlerRef.current = options.throttle ? throttle(options.throttle, handler) : handler

        return () => {
            if (element) {
                element.removeEventListener(event, handlerRef.current)
            }
        }
    }, [handler, options.throttle, element, event])

    React.useEffect(() => {
        function current() {
            handlerRef.current()
        }

        if (options.immediate) {
            current()
        }

        if (element) {
            if (options.active === false) {
                element.removeEventListener(event, current)
            } else {
                element.addEventListener(event, current, { passive: options.passive !== false })
            }
        }

        return () => {
            if (element) {
                element.removeEventListener(event, current)
            }
        }
    }, [element, event, handlerRef, options.active, options.immediate, options.passive])

}