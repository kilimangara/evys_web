import { CourseHeaderTextBlock } from '../styled/courses'
import {
    ColoredIconButton,
    ColumnFlexed,
    H1,
    H3,
    H4,
    Paper,
    RowFlexed,
    VerticalCentered,
    WithVerticalMargin
} from '../styled/common'
import Rating from 'react-rating'
import StarBorderComponent from '@material-ui/icons/starBorder'
import StarComponent from '@material-ui/icons/star'
import React from 'react'
import { declOfNum } from '../../utils/utilFunctions'

export const CourseHeaderContent = ({ title, subtitle, ratingCount, rating, buyersCount, author }) => (
    <CourseHeaderTextBlock>
        <ColumnFlexed>
            <WithVerticalMargin margin={'10px'} align={'flex-start'}>
                <H1>{title}</H1>
            </WithVerticalMargin>
            <WithVerticalMargin margin={'10px'} align={'flex-start'}>
                <H3>{subtitle}</H3>
            </WithVerticalMargin>
            <RowFlexed>
                <VerticalCentered direction={'row'}>
                    {ratingCount > 0 ? (
                        <div>
                            <Rating
                                initialRating={rating}
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
                            <H4 style={{ marginLeft: '5px' }}>
                                {rating} ({ratingCount} оценок){' '}
                            </H4>{' '}
                        </div>
                    ) : (
                        <H4>Нет оценок</H4>
                    )}
                    <H4 style={{ marginLeft: '20px' }}>
                        {buyersCount}{' '}
                        {declOfNum(buyersCount, [
                            'студент зарегистрирован',
                            'студента зарегистрировано',
                            'студентов зарегистрировано'
                        ])}
                    </H4>
                </VerticalCentered>
            </RowFlexed>
            <WithVerticalMargin margin={'15px 0 0'} align={'flex-start'}>
                <H4>Автор: {author}</H4>
            </WithVerticalMargin>
        </ColumnFlexed>
    </CourseHeaderTextBlock>
)
