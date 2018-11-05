import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'
import SearchBar from 'react-search-bar'
import Badge from '@material-ui/core/Badge'
import classNames from 'classnames'
import { StudentInput } from '../styled/common'

class HeaderAppBar extends Component {
    handleChange = input => {}

    handleOnSearch = search => {}

    handleOnClear = () => {}

    render() {
        const { classes } = this.props
        return (
            <div className={classes.toolbar}>
                <div style={{flex:1}}>
                  <StudentInput placeholder='Поиск'/>
                </div>
                <div id="additional-toolbar" style={{height:100}} />
            </div>
        )
    }
}

const styles = theme => ({
    toolbar: {
        display: 'flex',
        backgroundColor: 'transparent',
    },
})

const mapStateToProps = state => ({
    isLogged: state.auth.authenticated,
    profile: state.account.profileData
})

export default connect(mapStateToProps)(withStyles(styles)(HeaderAppBar))
