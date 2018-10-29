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
            <div className={classes.toolbar}>
                <SearchBar
                    styles={this.getStylesObject()}
                    placeholder="Поиск"
                    suggestions={[]}
                    onSearch={this.handleOnSearch}
                    onClear={this.handleOnClear}
                    onChange={this.handleChange}
                />
                <div id="additional-toolbar" />
            </div>
        )
    }
}

const styles = theme => ({
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        flex: 1
    }
})

const mapStateToProps = state => ({
    isLogged: state.auth.authenticated,
    profile: state.account.profileData
})

export default connect(mapStateToProps)(withStyles(styles)(HeaderAppBar))
