import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StudentInput } from '../styled/common'
import { Toolbar } from '../styled/header'
import { SearchBar } from '../common/SearchBar'
import { searchSubjects } from '../../api'
import withProviders from '../../utils/withProviders'
import { CoursesProvider } from '../../mixins/student/CoursesRepository'
import { SearchProvider } from '../../mixins/student/SearchRepository'
import { withRouter } from 'react-router'

class HeaderAppBar extends Component {
    state = {
        searchValue: this.props.searchValue
    }
    handleChange = e => this.setState({ searchValue: e.target.value })

    handleOnSearch = e => {
        e.preventDefault()
        this.props.history.push(`/app/student/courses/search?search=${this.state.searchValue}`)
    }

    render() {
        const { searchValue } = this.state
        return (
            <Toolbar>
                <div style={{ flex: 1 }}>
                    <SearchBar value={searchValue} onChange={this.handleChange} onSubmit={this.handleOnSearch} />
                </div>
                <div id="additional-toolbar" />
            </Toolbar>
        )
    }
}

export default withRouter(withProviders(SearchProvider)(HeaderAppBar))
