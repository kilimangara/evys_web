import React from 'react'
import HoverPaper from '../common/HoverPaper'
import IconButton from '@material-ui/core/IconButton'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import GridListTile from '@material-ui/core/GridListTile'
import styled from 'styled-components'

const DEFAULT_IMG_SRC = 'http://golos-vremeni.ru/media/cache/ad/f6/93/0b/e0/55/adf6930be0555d915298b4f92934095f.jpg'

const Wrapper = styled(HoverPaper)`
    height: 300px;
    width: 350px;
    cursor: pointer;
    background: ${({ image }) => `url(${image}) no-repeat center center`};
    background-size: cover;
`

Wrapper.defaultProps = {
    image: DEFAULT_IMG_SRC
}

export const Subject = ({ subject, index, onClickSubjectInfo, onClickSubject }) => (
    <GridListTile key={subject.id} cols={1} component="div">
        <Wrapper onClick={() => onClickSubjectInfo(subject)} image={subject.mainImage || subject.category.image}>
            <GridListTileBar
                title={subject.subject}
                subtitle={<p />}
                actionIcon={<IconButton onClick={() => onClickSubject(subject.id)} />}
            />
        </Wrapper>
    </GridListTile>
)
