import React from 'react'
import { ColumnFlexed, H2, H3, H4, WithVerticalMargin } from '../styled/common'

export const CourseRequirements = ({ requirements }) => (
    <WithVerticalMargin margin={'15px'} align={'flex-start'}>
        <ColumnFlexed>
            <H2>Требования</H2>
            <H4>
                <ul>
                    {requirements && requirements.length > 0 && requirements.map(requirement => <li>{requirement}</li>)}
                </ul>
            </H4>
        </ColumnFlexed>
    </WithVerticalMargin>
)
