import React from 'react'

import { useLanguage, useStrings, setLanguage, Language, useActions } from '../../Data'
import { Link, Url } from '../../Routing'

interface Static {

}

interface Props {

}

const DatabaseView: React.FC<Props> & Static = () => {

    const strings = useStrings().home
    const language = useLanguage()
    const actions = useActions({ setLanguage })

    return (
        <>
            Language: {language}
            <br />
            <button onClick={() => actions.setLanguage(language === Language.EN ? Language.CS : Language.EN)}>
                {strings.toggle}
            </button>
            <br />
            {strings.title}
        </>
    )

}

export default DatabaseView