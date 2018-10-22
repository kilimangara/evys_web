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
