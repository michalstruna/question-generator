import React from 'react'
import Styled from 'styled-components'

import { Async } from '../../Async'
import { useTopics, getTopics, useGenerator } from '..'
import InitForm from '../Components/InitForm'
import Generator from '../Components/Generator'
import { size } from '../../Style'
import { View } from '../../Layout'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'div'> {

}

const Root = Styled(View)`
    ${size()}
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
`

const GeneratorView: React.FC<Props> & Static = ({ ...props }) => {

    const topics = useTopics()
    const generator = useGenerator()

    return (
        <Root {...props}>
            <Async
                data={[[topics, getTopics]]}
                success={() => generator && generator.topics ? <Generator /> : <InitForm />}/>
        </Root>
    )

}

export default GeneratorView