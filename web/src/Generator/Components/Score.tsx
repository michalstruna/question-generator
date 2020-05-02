import React from 'react'
import Styled from 'styled-components'
import { useGenerator } from '..'
import { Color, Duration, size } from '../../Style'
import { IconText } from '../../Layout'
import { Time } from '../../Native'
import Tag from './Tag'

interface Static {

}

interface Props extends React.ComponentPropsWithoutRef<'div'> {

}

const Root = Styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`

const Success = Styled.div`
    width: 10rem;
`

const Bar = Styled.div`
    ${size('100%', '0.75rem')}
    background-color: ${Color.RED};
    margin-bottom: 0.5rem;
`

const BarInfo = Styled.div`
    display: flex;
    font-weight: bold;
    justify-content: space-between;
`

const InnerBar = Styled.div`
    ${size()}
    background-color: ${Color.GREEN};
    transition: width ${Duration.MEDIUM};
`

const Correct = Styled.div`
    color: ${Color.GREEN};
    float: left;
`

const Wrong = Styled.div`
    color: ${Color.RED};
    float: right;
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
    const total = generator.correct + generator.wrong
    const successRatio = total === 0 ? 100 : 100 * (generator.correct / total)
    const [time, setTime] = React.useState(0)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().getTime() - generator.time)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

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
            <Success>
                <Bar>
                    <InnerBar style={{ width: successRatio + '%' }} />
                </Bar>
                <BarInfo>
                    <Correct>
                        {generator.correct}
                    </Correct>
                    <div>
                        {Math.floor(100 * successRatio) / 100} %
                    </div>
                    <Wrong>
                        {generator.wrong}
                    </Wrong>
                </BarInfo>
            </Success>
        </Root>
    )

}

export default Score