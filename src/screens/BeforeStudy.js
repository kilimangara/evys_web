import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CurrentCourseItem } from '../components/themes/CurrentCourseItem'
import { DataCard, TheoryCard } from '../components/BeforeStudy/TheoryCard'
import { BeforeStudyWrapper, CardsBlock, IconsBlock } from '../components/styled/BeforeStudy'
import VideoIcon from '@material-ui/icons/videocam'
import DescriptionIcon from '@material-ui/icons/description'
import { CustomisedIcon } from '../components/styled/common'

class BeforeStudy extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { name, teacherName, subscribeTo, percent, hasVideo = true } = this.props
        return (
            <BeforeStudyWrapper>
                <CurrentCourseItem name={name} teacherName={teacherName} subscribeTo={subscribeTo} percent={percent} />
                <CardsBlock>
                    <DataCard
                        hasVideo={true}
                        name={'Теория'}
                        iconsBlock={
                            <div>
                                {hasVideo && <VideoIcon />}
                                <DescriptionIcon />
                            </div>
                        }
                    />
                </CardsBlock>
            </BeforeStudyWrapper>
        )
    }
}

BeforeStudy.defaultProps = {
    name: 'testName',
    testName: 'T.I. Pidor',
    subscribeTo: new Date('01.01.2020'),
    percent: 90
}

export default BeforeStudy
