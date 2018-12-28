import React, { Component } from 'react'
import {CenteredContent, CustomisedIcon, H2, Paper} from "../styled/common";
import {ThemeStudyTheoryItemContainer} from "../styled/themes";
import {studentTheme} from "../../utils/global_theme";


export const ThemeStudyTheoryItem = ({iconComponent, alias, onClick}) => (
<ThemeStudyTheoryItemContainer onClick={onClick}>

    <CustomisedIcon color={studentTheme.ACCENT} fontSize={'40px'}>
        <div>{iconComponent}</div>
    </CustomisedIcon>
    <H2 style={{marginLeft: '15px'}}>{alias}</H2>
</ThemeStudyTheoryItemContainer>
)
