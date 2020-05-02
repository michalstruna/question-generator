import React from 'react'
import ReactDOM from 'react-dom'

import GlobalStyle from './GlobalStyle'
import { useElement } from '../../Native'
import Header from './Header'
import { useGenerator } from '../../Generator'
import { useStrings } from '../../Data'

interface Static {

}

interface Props {

}

const App: React.FC<Props> & Static = ({ children }) => {

    const { nav } = useElement()
    const generator = useGenerator()

    React.useEffect(() => {
        const handleUnload = (event: Event) => {
            if (generator && !window.confirm()) {
                event.preventDefault()
                event.returnValue = false
            }
        }

        //window.addEventListener('beforeunload', handleUnload) // TODO: Uncomment.

        return () => window.removeEventListener('beforeunload', handleUnload)
    }, [generator])

    return (
        <>
            <GlobalStyle />
            {ReactDOM.createPortal(<Header />, nav.current as any)}
            {children}
        </>
    )
}

export default App