import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import React from 'react'
import Modal from 'reboron/ScaleModal'
import { Button } from '@material-ui/core'
import { studentTheme } from '../../utils/global_theme'
import ReactCodeInput from 'react-code-input'

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
    border: ${({ border }) => border || ''};
    overflow: hidden;
    cursor: ${({ clickable }) => (clickable ? 'pointer' : 'auto')};
    transition: box-shadow 0.25s ease-in-out, border 0.25s ease-in-out;
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
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
    flex-grow: 1;
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
    font-family: ${studentTheme.FONT};
    margin: 0;
    padding: 15px 15px 15px 0;
    color: ${props => (props.mainColor ? 'white' : 'inherit')};
    font-weight: ${props => (props.bold ? 'bold' : props.fontWeight || '300')};
`

export const StudentInput = styled.input`
    font-size: 14px;
    font-family: ${studentTheme.FONT}, serif;
    padding: 8px 16px;
    box-sizing: border-box;
    background-color: ${studentTheme.INPUT_COLOR};
    color: white;
    border: 0;
    border-radius: 8px;
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '30px'};
    outline: none;
    ::placeholder {
        text-align: center;
    }
`

export const StudentTextarea = styled.textarea`
    font-size: 14px;
    font-family: ${studentTheme.FONT}, serif;
    padding: 8px 16px;
    box-sizing: border-box;
    background-color: ${studentTheme.INPUT_COLOR};
    color: white;
    border: 0;
    border-radius: 8px;
    width: ${({ width }) => width || '100%'};
    height: ${({ height }) => height || '150px'};
    outline: none;
`

export const Loader = styled.div`
    width: 100px;
    height: 100px;
    background-image: url(/frontend/images/Ripple-1s-200px.svg);
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
    width: ${({ width }) => width || 'auto'};
    height: ${({ height }) => height || 'auto'};
    display: flex;
    flex-direction: ${({ direction }) => direction || 'column'};
    justify-content: center;
    align-items: center;
`

export const WithVerticalMargin = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: ${({ align }) => align || 'center'};
    & > * {
        margin: ${({ margin }) => `${margin} 0`};
    }
`

export const WithHorizontalMargin = styled.div`
    margin: ${({ margin }) => `0 ${margin}px`};
`

export const WithCustomMargin = styled.div`
    margin: ${({ margin }) => margin};
`

export const ColoredButton = styled(({ color, textColor, textHover, ...props }) => <Button {...props} />)`
    background-color: ${({ color, disabled }) =>
        disabled ? studentTheme.PRIMARY_LIGHT : color || studentTheme.ACCENT};
    color: ${({ textColor }) => textColor || studentTheme.PRIMARY};
    &:hover {
        background-color: ${studentTheme.ACCENT_HOVER};
        color: ${({ textHover }) => textHover || studentTheme.BACKGROUND};
    }
`

export const Error = styled.div`
    color: ${studentTheme.ERROR};
    font: ${studentTheme.H3} ${studentTheme.FONT};
`
export const H5 = styled.div`
    color: ${({ color }) => color || studentTheme.TEXT_COLOR};
    font: ${studentTheme.H5} ${studentTheme.FONT};
`

export const H4 = styled.div`
    color: ${({ color }) => color || studentTheme.TEXT_COLOR};
    font: ${studentTheme.H4} ${studentTheme.FONT};
`

export const H3 = styled.div`
    color: ${({ color }) => color || studentTheme.TEXT_COLOR};
    font: ${studentTheme.H3} ${studentTheme.FONT};
`

export const H2 = styled.div`
    color: ${({ color }) => color || studentTheme.TEXT_COLOR};
    font: ${studentTheme.H2} ${studentTheme.FONT};
`

export const H1 = styled.div`
    color: ${({ color }) => color || studentTheme.TEXT_COLOR};
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

export const VerticalCentered = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: ${({ direction }) => direction || 'column'};
`

export const FullsizeCentered = styled(CenteredContent)`
    width: 100%;
    height: 100%;
`

export const SizedIconButton = styled(IconButton)`
    width: ${({ width }) => `${width}px`};
    margin: ${({ margin }) => `${margin}`};
    padding: 0;
`
export const RowFlexed = styled.div`
    display: flex;
    flex-direction: row;
`

export const ColumnFlexed = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${({ align }) => align || 'flex-start'};
`

export const RowForm = styled.form`
    display: flex;
    flex-direction: row;
    position: relative;
`

export const FullPageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${studentTheme.BACKGROUND};
    display: flex;
    justify-content: center;
`

export const CodeInput = styled(ReactCodeInput)`
    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type='number'] {
        -moz-appearance: textfield;
    }
`

export const ColoredText = styled.div`
    color: ${({ color }) => color};
`

export const ColoredIcon = styled.div`
  & > svg {
  color: ${({ color }) => color};
`

export const FilledImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    max-width: 100%;
    max-height: 100%;
    width: ${({ type }) => (type === 'wide' ? '' : 'auto')};
    height: ${({ type }) => (type === 'tall' ? '' : 'auto')};
`

export const NotificationsCircle = styled.div`
    background-color: yellow;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    position: absolute;
    top: 0;
    right: -3px;
`

export const RelativeBorderedImage = styled(BorderedImage)`
    position: relative;
`
