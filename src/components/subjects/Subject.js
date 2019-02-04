import React from 'react'
import HoverPaper from '../common/HoverPaper'
import IconButton from '@material-ui/core/IconButton'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import grey from '@material-ui/core/colors/grey'
import GridListTile from '@material-ui/core/GridListTile'

const DEFAULT_IMG_SRC = 'http://golos-vremeni.ru/media/cache/ad/f6/93/0b/e0/55/adf6930be0555d915298b4f92934095f.jpg'

export const Subject = ({ subject, index, onClickSubjectInfo, onClickSubject }) => (
    <GridListTile key={subject.id} cols={1} component='div'>
        <HoverPaper style={{ height: 300, width: 350}} onClick={() => onClickSubjectInfo(subject)}>
            <img src={subject.category.image || DEFAULT_IMG_SRC}  style={{height: 300}}/>
            <GridListTileBar
                key={subject.id}
                title={subject.subject}
                subtitle={<p></p>}
                actionIcon={
                    <IconButton
                        onClick={() => onClickSubject(subject.id)}
                    />
                }
            >
            </GridListTileBar>
        </HoverPaper>
    </GridListTile>
)
