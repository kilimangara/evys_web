import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { LeftPanelContainer, LeftPanelNavigation, LeftPanelNavigationItem } from '../styled/layout'
import { BorderedImage, StudentTypography } from '../styled/common'

class LeftPanel extends Component {
    activeButton(index) {
        switch (index) {
            case 0:
                return { chart: true }
            case 1:
                return { graduation: true }
            case 2:
                return { accounts: true }
            case 3:
                return { user: true }
            default:
                return { graduation: true }
        }
    }

    render() {
        const { classes, buttonIndexActive } = this.props
        const active = this.activeButton(buttonIndexActive)
        return (
          <LeftPanelContainer>
            <div style={{padding:'50px 0px 0px 50px'}}>
              <BorderedImage image={'https://pp.userapi.com/c824604/v824604757/123b72/kQXTMsBo7Lc.jpg'}/>
              <StudentTypography fontSize={20} mainColor>
                Злаин Н.А.
              </StudentTypography>
            </div>
            <LeftPanelNavigation>
              <LeftPanelNavigationItem active>
                <StudentTypography>
                   Мои курсы
                </StudentTypography>
              </LeftPanelNavigationItem>
              <LeftPanelNavigationItem>
                <StudentTypography>
                   Все курсы
                </StudentTypography>
              </LeftPanelNavigationItem>
              <LeftPanelNavigationItem>
                <StudentTypography>
                   Статистика
                </StudentTypography>
              </LeftPanelNavigationItem>
            </LeftPanelNavigation>
          </LeftPanelContainer>
        )
    }
}

const styles = theme => ({
})

//#cecece

export default withStyles(styles)(LeftPanel)
