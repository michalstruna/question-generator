import React from 'react'
import Styled from 'styled-components'

import { Duration, viewFadeIn } from '../../Style'

export default Styled.div`
    animation: ${viewFadeIn} ${Duration.SLOW} 1;
`