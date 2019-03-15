import styled from 'styled-components'
import React from 'react'
import { studentTheme } from '../../utils/global_theme'
import Tabs from '@material-ui/core/Tabs/Tabs'
import Tab from '@material-ui/core/Tab/Tab'
import {
    BorderedImage,
    CenteredContent,
    ColoredButton,
    ColumnFlexed,
    H1,
    H3,
    Paper,
    RowFlexed,
    WithVerticalMargin
} from './common'

export const CourseImage = styled.img`
    height: 50%;
    width: 100%;
`

export const CourseInfo = styled.div`
    width: 100%;
    display: flex;
    height: 135px;
    flex-direction: row;
    padding-top: 15px;
`

export const TextInfo = styled.div`
    width: 250px;
    height: 100%;
    margin-left: 24px;
    position: relative;
`
export const ProgressRingContainer = styled.div`
    width: 60px;
    height: 60px;
    margin-left: 12px;
`

export const SubjectPriceContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100px;
    margin: 0 15px 20px 0;
`

export const CourseName = styled.p`
    overflow: hidden;
    margin: 0;
    text-overflow: ellipsis;
    font-size: ${studentTheme.H1};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`

export const CourseExpireDate = styled.div`
    position: absolute;
    bottom: 18px;
`

export const CoursesScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`

export const CourseWrapper = styled.div`
    position: relative;
    width: 350px;
    height: 300px;
    margin: 36px 12px;
    font-family: ${studentTheme.FONT};
    color: ${studentTheme.TEXT_COLOR};
`

export const CoursesTab = styled(Tab)`
    color: ${studentTheme.TEXT_COLOR};
`

export const CoursesTabs = styled(Tabs)`
    width: 100%;
    & > div > div > span {
        background-color: ${studentTheme.ACCENT};
    }
`

export const CoursesWrapper = styled.div`
    @media screen and (min-width: 0px) and (max-width: 1090px) {
        max-width: 374px;
    }
    @media screen and (min-width: 1090px) and (max-width: 1422px) {
        max-width: 748px;
    }
    @media screen and (min-width: 1422px) and (max-width: 1796px) {
        max-width: 1122px;
    }
    @media screen and (min-width: 1796px) {
        max-width: 1496px;
    }
    width: 5000px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
`

export const OutdatedWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 5;
    left: 0;
    top: 0;
    background-color: rgba(50, 50, 50, 0.5);
`

export const OutdatedText = styled.div`
    position: inherit;
    bottom: 16px;
    left: 24px;
    color: ${studentTheme.ACCENT_LIGHT};
`

export const GrayscaleContent = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    filter: ${({ isOn }) => (isOn ? 'grayscale(100%)' : '')};
`

export const CourseHeader = styled.div`
    width: 100%;
    min-height: 400px;
    background-color: ${studentTheme.ACCENT_DARK};
`

export const CourseHeaderTextBlock = styled.div`
    width: 40%;
    min-width: 560px;
    max-width: 700px;
`

export const CourseContentInfo = styled.div`
    width: 100%;
    margin: 20px;
`

export const CorsesHeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const CourseHeaderBlock = styled(Paper)`
    padding: 18px;
    min-width: 880px;
    max-width: 2000px;
    position: relative;
    overflow: inherit;
`

export const CourseInfoCardBlock = styled(Paper)`
    position: absolute;
    bottom: -150px;
    right: 50px;
    min-width: 200px;
    max-width: 400px;
    padding: 0 15px;
    //margin-right: 5%;
`

export const CardInfoPrice = styled(H1)`
    margin-top: 15px;
    padding-left: 20px;
`

export const BuyCourseButton = styled(ColoredButton)`
    width: calc(100% - 50px);
    margin: 20px;
`

export const CourseResultsBlock = styled(Paper)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 63%;
    min-width: 570px;
    max-width: 1000px;
    margin-top: 50px;
    padding: 15px;
`

export const CourseResultsTitle = styled.div`
    width: 100%;
    margin-bottom: 10px;
`

export const ResultBlock = styled(RowFlexed)`
    width: 40%;
    margin: 15px 0;
    word-break: break-all;
`

export const ThemesTreeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 63%;
    min-width: 570px;
    max-width: 1000px;
`

export const ThemeTreeBranch = styled.div`
    //margin-top: 10px;
    margin-bottom: ${({ single }) => (single ? '0' : '20px')};
    ${ThemeName} > * {
        padding-left: 25px;
    }
    min-height: 30px;
    width: 100%;
`

export const ThemeName = styled(H3)`
    //margin-left: 10px;
    //margin-right: 100px;
    width: 33%;
    min-width: 200px;
    max-width: 350px;
`

export const ThemeTheory = styled(H3)`
    width: 33%;
    min-width: 150px;
    max-width: 250px;
    justify-content: center;
    text-align: center;
`

export const ThemeTest = styled(H3)`
    width: 33%;
    min-width: 150px;
    max-width: 250px;
    justify-content: center;
    text-align: center;
`

export const ThemeVideo = styled(H3)`
    width: 33%;
    min-width: 150px;
    max-width: 250px;
    justify-content: center;
    text-align: center;
`

export const ThemeContentSplit = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

export const FieldsTitle = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`

export const ThemeAlias = styled(H3)`
    margin-left: 15px;
`

export const CheckboxesBlock = styled(RowFlexed)`
    width: 66%;
`

export const TreeBranchContentWrapper = styled(RowFlexed)`
    margin-bottom: ${({ single }) => (single ? '20px' : '0')};
`

export const DescriptionWrapper = styled(WithVerticalMargin)`
    width: 63%;
    min-width: 570px;
    max-width: 1000px;
`

export const CommentsBlockWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const RatingBlock = styled.div`
    display: flex;
    flex-direction: column;
    //align-items: center;
    justify-content: center;
    margin-left: 30px;
`

export const RateBlock = styled.div`
    display: flex;
    flex-direction: row;
`

export const CourseRating = styled.div`
    font: 72px ${studentTheme.FONT};
    color: ${studentTheme.TEXT_COLOR};
`

export const RatingWrapper = styled.div`
    margin-bottom: 15px;
`

export const CommentsWrapper = styled.div`
    margin-top: 50px;
`

export const CourseRatingBlock = styled(CenteredContent)`
    width: 250px;
`

export const CommentatorInfoBlock = styled(RowFlexed)`
    width: 250px;
`

export const CommentAuthorInfo = styled(ColumnFlexed)`
    justify-content: center;
    margin-left: 10px;
`

export const CommentTextWrapper = styled(ColumnFlexed)`
    margin-left: 30px;
`

export const Commentator = styled.div``

export const CommentBlock = styled.div`
    margin-bottom: 30px;
`

export const CommentatorAvatar = styled(BorderedImage)`
    min-width: ${({ width }) => width};
`
