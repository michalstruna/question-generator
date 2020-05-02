import { Redux } from '../../Data'

const fakeGetTopics = () => (
    new Promise((resolve) => {
        setTimeout(() => {
            resolve([])
        }, 500)
    })
)

const Slice = Redux.slice(
    'generator',
    {
        topics: Redux.async()
    },
    ({ async }) => ({
        getTopics: async('topics', fakeGetTopics)
    })
)

export default Slice.reducer
export const { getTopics } = Slice.actions