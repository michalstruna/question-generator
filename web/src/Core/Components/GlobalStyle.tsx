import { createGlobalStyle } from 'styled-components'

import { Color, Dimension, Duration, fontFace } from '../../Style'

const GlobalStyle = createGlobalStyle`
     ${fontFace('Montserrat', 'Montserrat.woff2')}
     ${fontFace('Montserrat', 'MontserratThin.woff2', '100')}
     ${fontFace('Montserrat', 'MontserratBold.woff2', 'bold')}

    body {
        background-color: ${Color.BACKGROUND};
        color: ${Color.LIGHT};
        font-family: Montserrat, Arial;
        margin: 0;
    }
    
    a {
        color: inherit;
        cursor: pointer;
        text-decoration: inherit;
    }
    
    button, input, textarea, select {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid ${Color.MEDIUM_LIGHT};
        color: inherit;
        font-family: Montserrat, Arial;
        font-size: inherit;
        line-height: inherit;
        outline: inherit;
        padding: 0.75rem 0.5rem;
        -webkit-appearance: none;
    }
    
    option {
        background-color: ${Color.MEDIUM_DARK};
        border: none;
        padding: 0.5rem;
        outline: none;
        
        &:hover, &:focus, &:active, &:checked {
           background: ${Color.DARKEST};
        }
    }
    
     button {
          background-color: ${Color.DARKEST};
          border: none;
          cursor: pointer;
          font-weight: bold;
          outline: none;
          padding: 0.5rem;
          text-align: center;
          transition: background-color ${Duration.MEDIUM};
          user-select: none;
        
          &:hover {
               background-color: ${Color.DARKEST_HOVER};
          }
     }
      
    p, h1, h2, h3, h4, h5, h6 {
        font-weight: normal;
        margin: 0;
    }
    
    ::-webkit-scrollbar {
        width: 15px;
    }
    
    ::-webkit-scrollbar-track {
        background-color: ${Color.MEDIUM_DARK};
    }
    
    ::-webkit-scrollbar-corner {
        background: rgba(0, 0, 0, 0);
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: #666;
    
        &:hover {
            background-color: #888;
        }
    }
    
    #app {
         background-color: ${Color.MEDIUM_DARK};
         height: calc(100vh - ${Dimension.NAV_HEIGHT});
         overflow-x: auto;
         overflow-y: auto;
         position: relative;
         width: 100%;
    }
`
export default GlobalStyle