import React, { Component } from 'react'
import {
    Commentator,
    CommentatorAvatar,
    CommentatorInfoBlock,
    CommentAuthorInfo,
    CommentBlock,
    CommentsBlockWrapper,
    CommentsWraper,
    CommentsWrapper,
    CommentTextWrapper,
    CourseRating,
    CourseRatingBlock,
    RateBlock,
    RatingBlock,
    RatingWrapper
} from '../styled/courses'
import {
    BorderedImage,
    CenteredContent,
    ColoredButton,
    ColoredIconButton,
    ColoredText,
    ColumnFlexed,
    H1,
    H2,
    H3,
    H4,
    RowFlexed,
    StudentTextarea,
    WithCustomMargin,
    WithVerticalMargin
} from '../styled/common'
import Rating from 'react-rating'
import StarBorderComponent from '@material-ui/icons/StarBorder'
import StarComponent from '@material-ui/icons/Star'
import { studentTheme } from '../../utils/global_theme'
import { distanceInWords } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import { sendComment } from '../../api'
import { DEFAULT_AVATAR_IMAGE_URL } from '../../screens/ProfileScreen'

export class CommentsBlock extends Component {
    state = {
        page: 1,
        chosenRating: null,
        commentText: null
    }

    handleRatingClick = rating => this.setState({ chosenRating: rating })

    handleTextChange = e => this.setState({ commentText: e.target.value })

    sendPostComment = () => {
        sendComment(this.props.courseId, { comment: this.state.commentText, rate: this.state.chosenRating }).then(
            () => {
                this.setState({ chosenRating: null, commentText: null })
                this.props.onCommentSended()
            }
        )
    }

    render() {
        const { comments, hasCourse = true, userComment = false, rating } = this.props
        const { chosenRating } = this.state
        return (
            <CommentsBlockWrapper>
                <RateBlock>
                    <CourseRatingBlock>
                        {rating ? <CourseRating>{rating}</CourseRating> : <H1>Мало оценок</H1>}
                        <H4>Рейтинг курса</H4>
                    </CourseRatingBlock>
                    {hasCourse ? (
                        <RatingBlock>
                            <WithVerticalMargin margin={'15px'} align={'flex-start'}>
                                {userComment ? <H3>Исправить рейтинг</H3> : <H3>Оценить курс</H3>}
                            </WithVerticalMargin>
                            <RatingWrapper>
                                <Rating
                                    stop={10}
                                    initialRating={userComment ? userComment.rate : chosenRating ? chosenRating : 0}
                                    emptySymbol={
                                        <ColoredIconButton color={'gold'} style={{ padding: 0 }}>
                                            <StarBorderComponent />
                                        </ColoredIconButton>
                                    }
                                    fullSymbol={
                                        <ColoredIconButton color={'gold'} style={{ padding: 0 }}>
                                            <StarComponent />
                                        </ColoredIconButton>
                                    }
                                    onClick={this.handleRatingClick}
                                />
                            </RatingWrapper>
                            {chosenRating && (
                                <CenteredContent direction={'row'}>
                                    <StudentTextarea
                                        onChange={this.handleTextChange}
                                        placeholder={'Введите отзыв'}
                                        width={'400px'}
                                    />
                                    <WithCustomMargin margin={'0 0 0 15px'}>
                                        <ColoredButton
                                            color={studentTheme.ACCENT}
                                            textColor={studentTheme.PRIMARY_LIGHT}
                                            onClick={this.sendPostComment}
                                        >
                                            отправить
                                        </ColoredButton>
                                    </WithCustomMargin>
                                </CenteredContent>
                            )}
                        </RatingBlock>
                    ) : (
                        <H2>Только люди, имеющие доступ к курсу, могут оценить его</H2>
                    )}
                </RateBlock>
                <CommentsWrapper>
                    {comments &&
                        comments.length > 0 &&
                        comments.map(({ comment, createdAt, rate, id, author }) => (
                            <CommentBlock key={id}>
                                <Commentator>
                                    <RowFlexed>
                                        <CommentatorInfoBlock>
                                            <CommentatorAvatar
                                                width={'60px'}
                                                height={'60px'}
                                                image={
                                                    (author && author.avatar && author.avatar.medium.url) ||
                                                    DEFAULT_AVATAR_IMAGE_URL
                                                }
                                            />
                                            <CommentAuthorInfo>
                                                <H4>
                                                    <ColoredText color={studentTheme.SECONDARY_TEXT_COLOR}>
                                                        {distanceInWords(new Date(createdAt), new Date(), {
                                                            locale: ruLocale
                                                        })}{' '}
                                                        назад
                                                    </ColoredText>
                                                </H4>
                                                <H3>{author && author.fullName}</H3>
                                            </CommentAuthorInfo>
                                        </CommentatorInfoBlock>
                                        <CommentTextWrapper>
                                            <Rating
                                                stop={10}
                                                initialRating={rate}
                                                emptySymbol={
                                                    <ColoredIconButton color={'gold'} style={{ padding: 0 }}>
                                                        <StarBorderComponent />
                                                    </ColoredIconButton>
                                                }
                                                fullSymbol={
                                                    <ColoredIconButton color={'gold'} style={{ padding: 0 }}>
                                                        <StarComponent />
                                                    </ColoredIconButton>
                                                }
                                                readonly
                                            />
                                            <H3>{comment}</H3>
                                        </CommentTextWrapper>
                                    </RowFlexed>
                                </Commentator>
                            </CommentBlock>
                        ))}
                </CommentsWrapper>
            </CommentsBlockWrapper>
        )
    }
}
