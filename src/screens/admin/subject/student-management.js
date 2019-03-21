import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ReactPaginate from 'react-paginate'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components'
import withProviders from '../../utils/withProviders'
import Checkbox from '@material-ui/core/Checkbox'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import produce from 'immer'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import { theme } from '../../../utils/global_theme'
import Tooltip from '@material-ui/core/Tooltip'
import SaveButton from '../../components/common/SaveButton'
import accountBlockedHOC from '../../mixins/admin/AccountBlockedHOC'
import { compose } from 'recompose'
import { getSubjectStudents } from '../../../api'

class StudentManagement extends Component {
    state = {
        students: [],
        totalPages: 1,
        currentPage: 0
    }

    loadStudent = (page = 1, query = '') => {}

    render() {}
}

class StudentManagementProvider {
    static mapStateToProps = null

    static mapDispatchToProps = {
        loadStudents: getSubjectStudents
    }
}

const enhance = compose(withProviders(StudentManagementProvider))
