import React from 'react'
import HoverPaper from '../common/HoverPaper'
import IconButton from 'material-ui/IconButton'
import { GridList, GridTile } from 'material-ui/GridList'
import { grey200} from 'material-ui/styles/colors'

const DEFAULT_IMG_SRC = 'http://golos-vremeni.ru/media/cache/ad/f6/93/0b/e0/55/adf6930be0555d915298b4f92934095f.jpg'

export const Subject = ({subject, index, onClickSubjectInfo, onClickSubject}) => (
    <div key={subject.id} onClick={() =>onClickSubjectInfo(subject)}>
        <HoverPaper style={{ height: 200 }}>
            <GridTile
                title={subject.subject}
                subtitle={<b>{subject.grade_representation}</b>}
                actionIcon={
                    <IconButton
                        onClick={() => onClickSubject(subject.id)}
                        iconStyle={{ color: grey200 }}
                        iconClassName="far fa-play-circle"
                        tooltip={'Темы'}
                        tooltipPosition={'top-center'}
                    />
                }
            >
                <img src={subject.category_image || DEFAULT_IMG_SRC} />
            </GridTile>
        </HoverPaper>
    </div>
)
