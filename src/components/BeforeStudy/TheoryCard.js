import React, { Component } from 'react'
import HoverPaper from "../common/HoverPaper";
import {CardName} from "../styled/BeforeStudy";
import {CenteredContent} from "../styled/common";
import VideoIcon from '@material-ui/icons/videocam'
import CheckboxIcon from '@material-ui/icons/checkbox'

export const TheoryCard = ({hasVideo}) => (
    <HoverPaper
    width={'350px'}
    height={'250px'}
    >
        <CardName>
          Теория
        </CardName>
        <CenteredContent>
            {hasVideo && <VideoIcon/>}
            <CheckboxIcon/>
        </CenteredContent>
    </HoverPaper>
)
