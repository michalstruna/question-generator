import { keyframes } from 'styled-components'

export const fadeIn = keyframes`
        from {
            opacity: 0;
        }
        
        to {
            opacity: 1;
        }
    
    `


export const viewFadeIn = keyframes`
        0% {
            height: 0;
            overflow: hidden;
            opacity: 0;
        }
        
        90% {
            height: auto;
        }
        
        100% {
            opacity: 1;
        }
    
    `