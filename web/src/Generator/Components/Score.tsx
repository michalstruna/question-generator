import React from 'react'
import Styled from 'styled-components'
import { useGenerator } from '..'
import { IconText } from '../../Layout'
import { Time } from '../../Native'
import Tag from './Tag'
import Bar from './Bar'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'div'> {

}

const Root = Styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`

const SpentTime = Styled(IconText)`
    font-weight: bold;
    width: auto;
`

const Topics = Styled.div`
    max-width: 25rem;
`

const Score: React.FC<Props> & Static = ({ ...props }) => {

    const generator = useGenerator()
    const [time, setTime] = React.useState(0)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().getTime() - generator.totalTime)
        }, 1000)

        return () => clearInterval(interval)
    }, [generator.totalTime])

    return (
        <Root {...props}>
            <SpentTime text={Time.format(time)} icon='Generator/Time.svg' />
            <Topics>
                {generator.topics.map((topic, i) => (
                    <Tag key={i}>
                        {topic.name}
                    </Tag>
                ))}
            </Topics>
            <Bar correct={generator.correct} wrong={generator.wrong} />
        </Root>
    )

}

export default Score