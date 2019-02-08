import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import React from 'react'
import Modal from 'reboron/ScaleModal'
import { Button } from '@material-ui/core'
import { studentTheme } from '../../utils/global_theme'

export const Paper = styled.div`
    box-shadow: ${({ boxShadow, hovered }) =>
        boxShadow
            ? boxShadow
            : hovered
                ? 'rgba(0,0,0,0.19) 0px 10px 30px, rgba(0,0,0,0.23) 0px 6px 10px'
                : '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),' +
                  '0px 2px 1px -1px rgba(0, 0, 0, 0.12)'};
    z-index: ${({ zIndex }) => zIndex || '0'};
    height: ${({ height }) => height || 'auto'};
    width: ${({ width }) => width || 'auto'};
    background: ${({ background }) => background || ''};
    border-radius: ${({ borderRadius }) => borderRadius || '0'};
    border: ${({border}) => border || ''};
    overflow: hidden;
    cursor: pointer;
    transition: box-shadow 0.25s ease-in-out, border 0.25s ease-in-out;
`

export const ColoredContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: ${({ backgroundColor }) => backgroundColor || '#ffffff'};
`

export const ColoredIconButton = styled(({ color, rippleColor, ...props }) => <IconButton {...props} />)`
    color: ${({ color }) => color};

    &:hover {
        background-color: ${({ rippleColor }) => rippleColor};
    }
`

export const Colored = styled.div`
    background-color: ${({ color }) => color};
`

export const ModalZ = styled(({ ...props }) => (
    <Modal modalStyle={{ zIndex: 2001 }} backdropStyle={{ zIndex: 2000 }} {...props} />
))`
    z-index: 500;
`

export const CommonWrapper = styled.div`
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    overflow: scroll;
    height: 100%;
    ::-webkit-scrollbar {
        width: 0;
    }
`

export const BorderedImage = styled.div`
    width: ${({ width }) => width || '80px'};
    height: ${({ height }) => height || '80px'};
    border-radius: 5px;
    background-image: ${({ image }) => `url(${image})`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`

export const StudentTypography = styled.p`
    font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '18px')};
    font-family: Montserrat;
    margin: 0;
    padding: 12px 0;
    color: ${props => (props.mainColor ? 'white' : 'inherit')};
    font-weight: ${props => (props.bold ? 'bold' : props.fontWeight || '300')};
`

export const StudentInput = styled.input`
    font-size: 14px;
    font-family: Montserrat;
    padding: 8px 16px;
    box-sizing: border-box;
    background-color: #333333;
    color: white;
    border: 0;
    border-radius: 8px;
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '30px'};
    outline: none;
    text-align: center;
    &:focus {
        text-align: left;
    }
`

export const Loader = styled.div`
    width: 100px;
    height: 100px;
    background-image: url(/images/Ripple-1s-200px.svg);
    background-size: 100px 100px;
`

export const LoaderWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const CenteredContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const WithVerticalMargin = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > * {
        margin: ${({ margin }) => `${margin} 0`};
    }
`

export const ColoredButton = styled(({ color, textColor, textHover, ...props }) => <Button {...props} />)`
    background-color: ${({ color }) => color || studentTheme.ACCENT};
    color: ${({ textColor }) => textColor || studentTheme.PRIMARY};
    :hover {
        background-color: ${studentTheme.ACCENT_HOVER};
        color: ${({ textHover }) => textHover || studentTheme.BACKGROUND};
    }
`

export const Error = styled.div`
    color: ${studentTheme.ERROR};
    font: ${studentTheme.H3} ${studentTheme.FONT}
`

export const H3 = styled.div`
    color: ${({color}) => color || studentTheme.TEXT_COLOR};
    font: ${studentTheme.H3} ${studentTheme.FONT};
`

export const H2 = styled.div`
    color: ${({color}) => color || studentTheme.TEXT_COLOR};
    font: ${studentTheme.H2} ${studentTheme.FONT};
`

export const H1 = styled.div`
    color: ${({color}) => color || studentTheme.TEXT_COLOR};
    font: ${studentTheme.H1} ${studentTheme.FONT};
`

export const CustomisedIcon = styled.div`
    & > div > * {
        font-size: ${({ fontSize }) => fontSize};
        color: ${({ color }) => color};
    }
`

export const HorizontalCentered = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: ${({ direction }) => direction || 'row'};
`

export const SizedIconButton = styled(IconButton)`
  width: ${({width}) => `${width}px`};
  margin: ${({margin}) => `${margin}px`};
  padding: 0;
`
