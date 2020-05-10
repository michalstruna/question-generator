import Styled from 'styled-components'

import { Duration, fadeIn } from '../../Style'

export default Styled.div`
    animation: ${fadeIn} ${Duration.SLOW} 1;
`