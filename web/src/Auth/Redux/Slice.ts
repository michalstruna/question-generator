import Cookies from 'js-cookie'

import { Cookie } from '../../Native'
import { Redux } from '../../Data'
import { Credentials, Identity } from '../types'
import { Requests } from '../../Async'

const identity = Cookies.getJSON(Cookie.IDENTITY.name)
Requests.authorization = identity?.token


const Slice = Redux.slice(
    'auth',
    {
        identity: Redux.async<Identity>(identity)
    },
    ({ async, plain }) => ({
        login: async<Credentials, Identity>('identity', credentials => Requests.post(`auth`, credentials), {
            onSuccess: ((state, action) => {
                Requests.authorization = action.payload.token
                Cookies.set(Cookie.IDENTITY.name, action.payload, { expires: Cookie.IDENTITY.expiration })
                state.identity.payload = action.payload
            })
        }),
        logout: plain<void>(state => {
            Requests.authorization = undefined
            state.identity.payload = null
            Cookies.remove(Cookie.IDENTITY.name)
        })
    })
)

export default Slice.reducer
export const { login, logout } = Slice.actions