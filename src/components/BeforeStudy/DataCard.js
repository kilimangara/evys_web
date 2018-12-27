import React, { Component } from 'react'
import HoverPaper from '../common/HoverPaper'
import {CardName, IconsBlock} from '../styled/BeforeStudy'
import { CenteredContent, CustomisedIcon } from '../styled/common'
import VideoIcon from '@material-ui/icons/videocam'

import DescriptionIcon from '@material-ui/icons/description'
import { studentTheme } from '../../utils/global_theme'

export const DataCard = ({ hasVideo, name, iconsBlock }) => (
    <HoverPaper width={'250px'} height={'150px'} borderRadius={'15px'} background={studentTheme.PRIMARY_LIGHT} style={{margin: '0 12px', cursor: 'pointer'}}>
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
