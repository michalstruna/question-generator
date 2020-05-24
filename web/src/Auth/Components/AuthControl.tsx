import React from 'react'

import { Window, IconText } from '../../Layout'
import { LoginForm, logout, useIdentity } from '../'
import { useActions } from '../../Data'

const AuthControl = () => {

    const actions = useActions({ logout })
    const identity = useIdentity()

    return identity.payload ? (
        <IconText
            icon='Auth/Logout.svg'
            text='Odhlásit se'
            onClick={() => actions.logout()}
            size={IconText.SMALL} />
    ) : (
        <Window renderButton={() => <IconText icon='Auth/User.svg' text='Přihlášení' onClick={() => null} size={IconText.SMALL} />}>
            <LoginForm />
        </Window>
    )

}

export default AuthControl