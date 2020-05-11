import React from 'react'
import Styled from 'styled-components'
import { Color, Duration, size } from '../../Style'

interface Static {
    Root: string
}

interface Props extends React.ComponentPropsWithoutRef<'div'> {
    correct: number
    wrong: number
}

const Root = Styled.div`
    filter: grayscale(20%);
    overflow: hidden;
    width: 11rem;
    max-width: 100%;
`

const Outer = Styled.div`
    ${size('100%', '1rem')}
    background-color: ${Color.DARK_RED};
    border-radius: 0.5rem;
`

const Inner = Styled.div`
    ${size()}
    border-radius: 0.5rem;
    background-color: ${Color.DARK_GREEN};
    transition: width ${Duration.MEDIUM};
`

const Info = Styled.div`
    display: flex;
    font-size: 90%;
    justify-content: space-between;
    margin-top: 0.5rem;
    width: 100%;
    
    & > p {
        font-weight: bold;
        transition: color ${Duration.MEDIUM};
    }
`

const Correct = Styled.p`
    color: ${Color.GREEN};
`

const Wrong = Styled.p`
    color: ${Color.RED};
`

const Bar: React.FC<Props> & Static = ({ correct, wrong, ...props }) => {

    const total = correct + wrong
    const percentage = total === 0 ? 100 : Math.floor(10000 * correct / total) / 100

    return (
        <Root {...props}>
            <Outer>
                <Inner style={{ width: percentage + '%' }} />
            </Outer>
            <Info>
                <Correct>
                    {correct}
                </Correct>
                <p style={{ color: `rgb(${(100 - percentage) * 2}, ${percentage * 2}, 0)` }}>
                    {percentage} %
                </p>
                <Wrong>
                    {wrong}
                </Wrong>
            </Info>
        </Root>
    )

}

Bar.Root = Root

export default Bar