import styled from 'styled-components'
import { IconButton } from '@material-ui/core'
import React from 'react'
import Modal from 'reboron/ScaleModal'

export const Paper = styled.div`
    box-shadow: ${({ hovered }) =>
        hovered
            ? 'rgba(0,0,0,0.19) 0px 10px 30px, rgba(0,0,0,0.23) 0px 6px 10px'
            : '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),' +
              '0px 2px 1px -1px rgba(0, 0, 0, 0.12)'};
    z-index: ${({ zIndex }) => zIndex || '0'};
    height: ${({ height }) => height || 'auto'};
    overflow: hidden;
    transition: box-shadow 0.25s ease-in-out;
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
