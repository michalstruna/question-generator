import Cookies from 'js-cookie'

import { Cookie } from '../../Native'
import { Redux } from '../../Data'
import { Credentials, Identity } from '../types'

const demoIdentity: Identity = {
    id: 123,
    token: 'def',
    name: 'Michal Struna',
    email: 'michal@struna.cz'
}

const loginMock = (path: string, body?: any): Promise<Identity> => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (body.email === 'm@m.cz' && body.password === '123') {
            resolve(demoIdentity)
            Cookies.set(Cookie.IDENTITY.name, demoIdentity, { expires: Cookie.IDENTITY.expiration })
        } else {
            reject('Bad identity.')
        }
    }, 1000)
})

const Slice = Redux.slice(
    'auth',
    {
        identity: Redux.async<Identity>(Cookies.getJSON(Cookie.IDENTITY.name))
    },
    ({ async, plain }) => ({
        login: async<Credentials, Identity>('identity', credentials => loginMock('user/login', credentials)),
        logout: plain<void>(state => {
            state.identity.payload = null
            Cookies.remove(Cookie.IDENTITY.name)
        })
    })
)

export default Slice.reducer
export const { login, logout } = Slice.actions