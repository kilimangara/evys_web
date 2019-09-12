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
import Icon from '@material-ui/core/Icon'
import React from 'react'
import { declOfNum } from '../../utils/utilFunctions'

export const CourseHeaderContent = ({ title, subtitle, ratingCount, rating, buyersCount, author }) => (
    <CourseHeaderTextBlock>
        <ColumnFlexed>
            <WithVerticalMargin margin={'10px'} align={'flex-start'}>
                <H1>{title}</H1>
            </WithVerticalMargin>
            <RowFlexed>
                <VerticalCentered direction={'row'}>
                    {ratingCount > 0 ? (
                        <div>
                            <Rating
                                stop={10}
                                initialRating={rating}
                                emptySymbol={
                                    <ColoredIconButton color={'gold'} style={{ padding: 0 }}>
                                        <Icon>star_border</Icon>
                                    </ColoredIconButton>
                                }
                                fullSymbol={
                                    <ColoredIconButton color={'gold'} style={{ padding: 0 }}>
                                        <Icon>star</Icon>
                                    </ColoredIconButton>
                                }
                                readonly
                            />
                            <H4 style={{ marginLeft: '5px' }}>
                                {rating} ({ratingCount} {declOfNum(ratingCount, ['оценка', 'оценки', 'оценок'])}){' '}
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
