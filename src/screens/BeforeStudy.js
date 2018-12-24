import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CurrentCourseItem } from '../components/themes/CurrentCourseItem'
import {TheoryCard} from "../components/BeforeStudy/TheoryCard";
import {BeforeStudyWrapper} from "../components/styled/BeforeStudy";

class BeforeStudy extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { name, teacherName, subscribeTo, percent } = this.props
        return (
            <BeforeStudyWrapper>
                <CurrentCourseItem name={name} teacherName={teacherName} subscribeTo={subscribeTo} percent={percent} />
                <TheoryCard hasVideo={true} />
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

export default BeforeStudy;