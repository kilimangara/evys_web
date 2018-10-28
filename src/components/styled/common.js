import styled from 'styled-components'

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
  background-color: ${({backgroundColor}) => backgroundColor || '#ffffff'};
`

export const BorderedImage = styled.div`
  width: ${({width}) => width || '80px'};
  height: ${({height}) => height || '80px'};
  border-radius: 5px;
  background-image: ${({image}) => `url(${image})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

export const StudentTypography = styled.p`
  font-size: ${props => props.fontSize ? `${props.fontSize}px` : '18px'};
  font-family: Montserrat;
  margin:0;
  padding: 12px 0;
  color: ${props => props.mainColor ? 'white' : 'inherit'};
  font-weight: ${props => props.bold ? 'bold' : props.fontWeight || '300'}
`
