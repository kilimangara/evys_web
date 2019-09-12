import React, { Component } from 'react'
import HoverPaper from '../common/HoverPaper'
import { CardName, IconsBlock } from '../styled/BeforeStudy'
import { CenteredContent, CustomisedIcon } from '../styled/common'
import { studentTheme } from '../../utils/global_theme'
import { OutdatedWrapper } from '../styled/courses'

export const DataCard = ({ hasVideo, name, iconsBlock, onClick, disabled }) => (
    <HoverPaper
        width={'250px'}
        height={'150px'}
        borderRadius={'15px'}
        background={studentTheme.PRIMARY_LIGHT}
        style={{ margin: '0 12px', cursor: 'pointer' }}
        onClick={onClick}
        disabled={disabled}
    >
        {disabled && <OutdatedWrapper />}
        <CardName>{name}</CardName>
        <IconsBlock>
            <CenteredContent>
                <CustomisedIcon color={studentTheme.ACCENT} fontSize={'72px'}>
                    {iconsBlock}
                </CustomisedIcon>
            </CenteredContent>
        </IconsBlock>
    </HoverPaper>
)
