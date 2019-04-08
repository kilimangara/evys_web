import React, { Component } from 'react'
import withProviders from '../../../utils/withProviders'
import StudentTestBlockRepository, { TestBlockProvider } from '../../../mixins/admin/StudentTestBlockRepository'
import withNav, { NavigationProvider } from '../../../mixins/admin/NavigatableComponent'
import LinearProgress from '@material-ui/core/LinearProgress'
import styled from 'styled-components'
import { Card } from './index'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ReactPaginate from 'react-paginate'
import moment from 'moment'
import { compose } from 'recompose'
import { ToolbarTitle, TableToolbar } from '../../../components/styled/student-admin'
import { WithHorizontalMargin } from '../../../components/styled/common'
import ThemePicker from './theme-picker'
import Dialog from '@material-ui/core/Dialog'
import CreateEvent from './create-event'
import { searchSubjectThemes } from '../../../api'
import { debounce } from 'lodash'
import { withSnackbar } from 'notistack'
import TextField from '@material-ui/core/TextField'
import { InlineDatePicker } from 'material-ui-pickers'
import produce from 'immer'
import startOfWeek from 'date-fns/startOfWeek'
import startOfDay from 'date-fns/startOfDay'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`

const NoTestsWrapper = styled.div`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const NoTestsText = styled(Typography)`
    font-weight: 300;
    font-size: 22px;
    text-align: center;
    color: black;
`

class StudentTestBlocks extends StudentTestBlockRepository(Component) {
    constructor(props) {
        super(props)
        this.state = {
            tests: [],
            fetching: false,
            currentPage: 0,
            totalPages: 0,
            searchOpened: false,
            filters: {
                theme: null,
                dateFrom: startOfWeek(new Date(), { weekStartsOn: 1 }),
                dateTo: new Date()
            },
            themes: [],
            query: ''
        }
        this.filterThemeField = React.createRef()
        this.findThemesDebounce = debounce(this.findThemes, 500, { leading: true })
    }

    findThemes = query => {
        if (!query) query = this.state.query
        if (!query) return this.setState({ themes: [], query: '' })
        searchSubjectThemes(this.subjectId(), { q: query }).then(({ data }) => this.setState({ themes: data }))
    }

    handleSearchChange = event => {
        const query = event.target.value
        this.setState({ query })
        this.findThemesDebounce(query)
    }

    themePicked = theme => {
        this.setState(
            produce(draft => {
                draft.filters.theme = theme
            })
        )
        this.getStudentTests(1, theme.id)
        this.modalClose()
    }

    componentDidMount() {
        this.getStudentTests(1)
    }

    onPageChanged = page => {
        const { theme } = this.state.filters
        const themeId = theme ? theme.id : undefined
        this.getStudentTests(page.selected + 1, themeId)
    }

    modalClose = () => {
        this.setState({ searchOpened: false })
    }

    modalOpen = () => {
        this.filterThemeField.current.blur()
        this.setState({ searchOpened: true })
    }

    openEventCreation = () => {
        if (!this.state.filters.theme)
            return this.props.enqueueSnackbar(`Для начала выберите тему`, { variant: 'error' })

        this.refs.eventCreate.show({
            studentId: this.studentId(),
            subjectId: this.subjectId(),
            themeId: this.state.filters.theme.id
        })
    }

    filterChanged = name => event => {
        let value = null
        value = startOfDay(event)
        this.setState(
            produce(draft => {
                draft.filters[name] = value
            })
        )
    }

    renderTest = (test, index) => {
        const startedAt = test.startedAt ? moment(test.startedAt).fromNow() : 'Не начато'
        return (
            <TableRow key={test.id}>
                <TableCell>{test.theme.name}</TableCell>
                <TableCell>{test.passed ? 'Пройдено' : 'Не пройдено'}</TableCell>
                <TableCell>{startedAt}</TableCell>
                <TableCell>
                    <Button variant="outlined" color="primary" onClick={this.goToTestBlock(test.id)}>
                        Проверить
                    </Button>
                </TableCell>
            </TableRow>
        )
    }

    goToTestBlock = testBlockId => () => {
        this.props.history.push(`/admin/subjects/${this.subjectId()}/students/${this.studentId()}/tests/${testBlockId}`)
    }

    renderToolbar = () => {
        const { pickedTheme } = this.state
        return (
            <TableToolbar highlight={false}>
                <ToolbarTitle>
                    <Typography variant="h6" id="tableTitle">
                        Тестирования
                    </Typography>
                </ToolbarTitle>
            </TableToolbar>
        )
    }

    renderIntro = () => {
        if (!this.noTests()) return null
        return (
            <NoTestsWrapper>
                <img style={{ height: 250, width: 190 }} src={'/frontend/images/no-students.svg'} />
                <NoTestsText component={'p'}>
                    Этот ученик еще не проходил никаких заданий... Вы можете дождаться пока он что-то начнет делать или
                    сами назначьте ему задание
                </NoTestsText>
                <div style={{ height: 12 }} />
                <Button color="primary" variant={'contained'}>
                    Узнать подробнее
                </Button>
            </NoTestsWrapper>
        )
    }

    renderBody = () => {
        if (this.noTests()) return null
        return (
            <React.Fragment>
                <Card marginTop={12} noPadding>
                    {this.renderToolbar()}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Задание по теме</TableCell>
                                <TableCell>Статус</TableCell>
                                <TableCell>Начало</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>{this.tests().map(this.renderTest)}</TableBody>
                    </Table>
                </Card>
                <div style={{ alignSelf: 'center' }}>
                    <ReactPaginate
                        disableInitialCallback
                        style={{ marginTop: 12, alignSelf: 'center' }}
                        pageCount={this.state.totalPages}
                        initialPage={0}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={this.onPageChanged}
                        previousLabel="<<"
                        nextLabel=">>"
                        containerClassName={'pagination'}
                    />
                </div>
            </React.Fragment>
        )
    }

    render() {
        const { themes, query, searchOpened, filters } = this.state
        console.log(this.state)
        return (
            <Container>
                <Dialog open={searchOpened} onClose={this.modalClose}>
                    <ThemePicker
                        list={themes}
                        onSearch={this.findThemes}
                        onPicked={this.themePicked}
                        searchValue={query}
                        onSearchChange={this.handleSearchChange}
                    />
                </Dialog>
                <CreateEvent ref="eventCreate" onCreated={event => console.log(event, 'CREEEATED')} />
                <Card marginTop={12}>
                    <Typography variant={'h6'}>Фильтры</Typography>
                    <div style={{ display: 'flex' }}>
                        <TextField
                            inputRef={this.filterThemeField}
                            inputProps={{
                                onFocus: this.modalOpen
                            }}
                            label={'Выбор темы'}
                            variant="outlined"
                            value={filters.theme ? filters.theme.name : 'Нажмите, чтобы выбрать'}
                            margin={'normal'}
                        />

                        <WithHorizontalMargin margin={12}>
                            <InlineDatePicker
                                onlyCalendar
                                format={'MM.dd.yyyy'}
                                margin={'normal'}
                                variant="outlined"
                                label="C"
                                value={filters.dateFrom}
                                onChange={this.filterChanged('dateFrom')}
                            />
                        </WithHorizontalMargin>
                        <WithHorizontalMargin margin={12}>
                            <InlineDatePicker
                                onlyCalendar
                                format={'MM.dd.yyyy'}
                                margin={'normal'}
                                variant="outlined"
                                label="До"
                                value={filters.dateTo}
                                onChange={this.filterChanged('dateTo')}
                            />
                        </WithHorizontalMargin>
                    </div>
                    {Boolean(filters.theme) && (
                        <Button variant="contained" margin="normal" color="primary" onClick={this.openEventCreation}>
                            Назначить задание
                        </Button>
                    )}
                </Card>
                {this.renderIntro()}
                {this.renderBody()}
            </Container>
        )
    }
}

const enhance = compose(
    withProviders(TestBlockProvider),
    withSnackbar
)

export default enhance(StudentTestBlocks)
