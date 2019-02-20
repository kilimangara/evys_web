import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import HoverPaper from '../common/HoverPaper'
import moment from 'moment'
import { studentTheme } from '../../utils/global_theme'
import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {
    CourseImage,
    CourseInfo,
    CourseName,
    TextInfo,
    CourseExpireDate,
    CourseWrapper,
    ProgressRingContainer,
    OutdatedWrapper,
    OutdatedText,
    GrayscaleContent,
    SubjectPriceContainer
} from '../styled/courses'

class SubjectItem extends Component {
    state = {
        hover: false
    }

    changeHovered = hover => {
        this.setState({ hover })
    }

    getPrice = () => {
        const { amount, currency, duration, locale } = this.props
        const currencyNumber = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            maximumFractionDigits: 2,
            minimumFractionDigits: 0
        }).format(amount)

        if (amount === 0) {
            return 'бесплатно'
        }
        const period = moment(duration).days()
        if (!period) {
            return currencyNumber
        }
        let textPeriod = ''
        if (period === 1) {
            textPeriod = 'день'
        } else if (period === 7) {
            textPeriod = 'нед'
        } else if (period === 28 || period === 29 || period === 30 || period === 31) {
            textPeriod = 'мес'
        } else if (period === 365 || period === 366) {
            textPeriod = 'год'
        } else {
            textPeriod = `${period} дней`
        }
        return `${currencyNumber}/${textPeriod}`
    }

    render() {
        const { courseImage, name, teacherName, onClick } = this.props
        return (
            <CourseWrapper onClick={() => onClick()}>
                <HoverPaper
                    width={'100%'}
                    height={'100%'}
                    background={studentTheme.PRIMARY_LIGHT}
                    borderRadius={'15px'}
                >
                    <CourseImage src={courseImage} />
                    <CourseInfo>
                        <TextInfo>
                            <CourseName>{name}</CourseName>
                            <div>{teacherName}</div>
                        </TextInfo>
                        <SubjectPriceContainer>{this.getPrice()}</SubjectPriceContainer>
                    </CourseInfo>
                </HoverPaper>
            </CourseWrapper>
        )
    }
}

export default SubjectItem
