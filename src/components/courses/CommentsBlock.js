import React, { Component } from 'react'
import {
    Commentator,
    CommentatorAvatar,
    CommentBlock,
    CommentsBlockWrapper,
    CourseRating,
    RateBlock,
    RatingBlock
} from '../styled/courses'
import {
    CenteredContent,
    ColoredButton,
    ColoredIconButton,
    ColumnFlexed,
    H2,
    H3,
    H4,
    RowFlexed,
    StudentTextarea,
    WithCustomMargin,
    WithVerticalMargin
} from '../styled/common'
import Rating from 'react-rating'
import StarBorderComponent from '@material-ui/icons/starBorder'
import StarComponent from '@material-ui/icons/star'
import { studentTheme } from '../../utils/global_theme'

export class CommentsBlock extends Component {
    state = {
        page: 1,
        chosenRating: null,
        commentText: null
    }

    handleRatingClick = rating => this.setState({ chosenRating: rating })

    handleTextChange = e => this.setState({ commentText: e.target.value })

    sendComment = () => sendComment(this.state.chosenRating, this.state.commentText)

    render() {
        const { comments, hasCourse = true, userComment = false, rating = 4.4 } = this.props
        const { chosenRating } = this.state
        return (
            <CommentsBlockWrapper>
                <RateBlock>
                    <CenteredContent>
                        <CourseRating>{rating}</CourseRating>
                        <H4>Рейтинг курса</H4>
                    </CenteredContent>
                    {hasCourse ? (
                        <RatingBlock>
                            <WithVerticalMargin margin={'15px'} align={'flex-start'}>
                                {userComment ? <H3>Исправить рейтинг</H3> : <H3>Оценить курс</H3>}
                            </WithVerticalMargin>
                            {chosenRating ? (
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
                                            onClick={this.sendComment}
                                        >
                                            отправить
                                        </ColoredButton>
                                    </WithCustomMargin>
                                </CenteredContent>
                            ) : (
                                <Rating
                                    stop={10}
                                    initialRating={userComment ? userComment.rate : 0}
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
                            )}
                        </RatingBlock>
                    ) : (
                        <H2>Только люди, имеющие доступ к курсу, могут оценить его</H2>
                    )}
                </RateBlock>
                {comments &&
                    comments.length &&
                    comments.map(({ comment, createdAt, rate, id, author }) => (
                        <CommentBlock key={id}>
                            <Commentator>
                                <RowFlexed>
                                    <RowFlexed>
                                        <CommentatorAvatar />
                                        <ColumnFlexed>
                                            {/*timesended*/}
                                            <H3>{author && author.fullName}</H3>
                                        </ColumnFlexed>
                                    </RowFlexed>
                                    <ColumnFlexed>
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
                                            disabled
                                        />
                                        <H3>{comment}</H3>
                                    </ColumnFlexed>
                                </RowFlexed>
                            </Commentator>
                        </CommentBlock>
                    ))}
            </CommentsBlockWrapper>
        )
    }
}
