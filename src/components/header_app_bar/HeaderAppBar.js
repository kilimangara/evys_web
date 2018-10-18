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
import '../../screencss/SearchBar.css'

class HeaderAppBar extends Component {
    handleChange = input => {}

    handleOnSearch = search => {}

    handleOnClear = () => {}

    getStylesObject() {
        return {
            field: 'field',
            focusedField: 'field--focused',
            hasSuggestions: 'field--has-suggestions',
            input: 'input',
            clearButton: 'clear-button',
            submitButton: 'submit-button',
            suggestions: 'suggestions',
            suggestion: 'suggestion'
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <AppBar position="sticky" color="default" classes={{ colorDefault: classes.appBar }}>
                    <Toolbar className={classes.toolbar}>
                        <div />
                        <SearchBar
                            styles={this.getStylesObject()}
                            renderClearButton
                            renderSearchButton
                            placeholder="Поиск"
                            suggestions={[]}
                            onSearch={this.handleOnSearch}
                            onClear={this.handleOnClear}
                            onChange={this.handleChange}
                        />
                        <Badge classes={{ badge: classes.badge }} color="primary" badgeContent="">
                            <Icon className={classNames('fa fa-bell', classes.icon)} />
                        </Badge>
                    </Toolbar>
                    <div id="additional-toolbar" />
                </AppBar>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    appBar: {
        backgroundColor: 'white'
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        color: '#cecece'
    },
    badge: {
        width: 12,
        height: 12,
        top: -4,
        right: 0
    }
})

const mapStateToProps = state => ({
    isLogged: state.auth.authenticated,
    profile: state.account.profileData
})

export default connect(mapStateToProps)(withStyles(styles)(HeaderAppBar))
