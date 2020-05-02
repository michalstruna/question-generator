import React from 'react'
import Styled from 'styled-components'

import { Async } from '../../Async'
import { useTopics, getTopics, useGenerator } from '..'
import InitForm from '../Components/InitForm'
import Generator from '../Components/Generator'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'div'> {

}

const Root = Styled.div`

`

const GeneratorView: React.FC<Props> & Static = ({ ...props }) => {

    const topics = useTopics()
    const generator = useGenerator()

    return (
        <Root {...props}>
            <Async
                data={[[topics, getTopics]]}
                success={() => generator.topics ? <Generator /> : <InitForm />}/>
        </Root>
    )

}

export default GeneratorView