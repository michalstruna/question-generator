import { css } from 'styled-components'

import Duration from '../Constants/Duration'

export const fontFace = (name: string, path: string, fontWeight: string = 'normal') => css`
        @font-face {
            font-family: ${name};
            font-weight: ${fontWeight};
            src: url(/fonts/${path});
        }
    `

export const image = (name?: string, size: string = '100% 100%', position: string = 'center center') => css`
        ${name && `background-image: url(/img/${name});`}
        background-position: ${position};
        background-repeat: no-repeat;
        background-size: ${size};
    `

export const flexCenter = () => css`
        align-items: center;
        display: flex;
        justify-content: center;
    `

export const size = (width: string | 0 = '100%', height: string | 0 = width, oneLine: boolean = false) => css`
        height: ${height};
        line-height: ${oneLine ? height : undefined};
        width: ${width};
    `

export const opacityHover = (opacity: number = 0.5, duration: string = Duration.FAST) => css`
        opacity: ${opacity};
        transition: opacity ${duration};
        
        &:hover {
            opacity: 1;
        }
    `

export const threeDots = () => css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    `