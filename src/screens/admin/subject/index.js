import React from 'react'
import SubjectRepository, { SubjectProvider } from '../../../mixins/admin/SubjectRepository'
import withProviders from '../../../utils/withProviders'
import styled from 'styled-components'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { theme } from '../../../utils/global_theme'
import produce from 'immer'
import LinearProgress from '@material-ui/core/LinearProgress'
import SaveButton from '../../../components/common/SaveButton'
import { Route } from 'react-router'
import MainInfo from './main-info'
import BillingInfo from './billing-info'
import Chip from '@material-ui/core/Chip'
import Warning from '@material-ui/icons/Warning'

const WarningIcon = styled(Warning)`
  color: red;
`

const Container = styled.div`
    display: flex;
    padding: 24px 12px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`

const ListHeader = styled(ListSubheader)`
    font-weight: 600;
    font-size: 18px;
    color: black;
`

const ListText = styled(ListItemText)`
    & > span {
        padding-left: 20px;
    }
`

export const Card = styled.div`
    margin-top: ${({ marginTop = 0 }) => `${marginTop}px`};
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: white;
    box-shadow: 0 0 1px #bdbfc1, 0 1px #ced2d3;
    padding: 12px;
`

const ColoredButton = styled(Button)`
    background-color: ${theme.ACCENT_COLOR};
    color: white;
`

export const TagChip = styled(Chip)`
    margin: 8px;
    background-color: ${theme.ACCENT_COLOR};
    color: white;
    border: 1px solid ${theme.ACCENT_COLOR};
`

class SubjectScreen extends SubjectRepository(React.Component) {
    state = {
        errors: {}
    }

    componentDidMount() {
        this.getSubject()
        this.syncCategories()
    }

    componentDidUpdate(prevProps) {
        if (this.props.subject !== prevProps.subject) this.setState({ subject: this.props.subject })
    }

    subjectUpdated = subject => {
        this.setState({ subject })
    }

    saveSubject = () => {
        return this.updateSubject().then(() => this.setState({errors: {}})).catch(err => {
            const { response } = err
            if (response.status === 400) this.setState({ errors: response.data })
            throw err
        })
    }

    renderMainInfo = () => {
        return (
            <MainInfo
                subject={this.state.subject}
                subjectUpdated={this.subjectUpdated}
                saveSubject={this.saveSubject}
                fetching={this.props.subjectsFetching}
                categories={this.state.categories}
            />
        )
    }

    renderBillingInfo = () => {
        return (
            <BillingInfo
                errors={this.state.errors.tariff}
                subject={this.state.subject}
                subjectUpdated={this.subjectUpdated}
                saveSubject={this.saveSubject}
                fetching={this.props.subjectsFetching}
            />
        )
    }

    goTo = type => () => {
        switch (type) {
            case 'root':
                return this.props.history.replace(`/admin/subjects/${this.subjectId()}`)
            case 'billing':
                return this.props.history.replace(`/admin/subjects/${this.subjectId()}/billing`)
        }
    }

    changeVisibility = () => {
      const {subject} = this.state
      this.state = produce(this.state, (draft) =>{
        draft.subject.tariff.hidden = !draft.subject.tariff.hidden
      })
      console.log('new state', this.state)
      this.saveSubject()
    }

    render() {
        const { subject, categories } = this.state
        console.log(this.state)
        if (!subject || !categories)
            return (
                <div>
                    <LinearProgress />
                </div>
            )
        return (
            <Container>
                <Card>
                    <List subheader={<ListHeader disableSticky>Настройки курса</ListHeader>} component="nav">
                        <ListItem button onClick={this.goTo('root')}>
                            <ListText primary="Основные настройки" />
                        </ListItem>
                        <ListItem button>
                            <ListText primary="Содержание курса" />
                        </ListItem>
                        <ListItem button onClick={this.goTo('billing')}>
                            <ListText primary="Информация для ученика" />
                            {!subject.tariff.canPublish ? <WarningIcon/> : null}
                        </ListItem>
                        <Divider />
                        <div style={{marginLeft: 16, marginTop: 8}}>
                          <ColoredButton type="contained" disabled={!subject.tariff.canPublish} margin='normal' onClick={this.changeVisibility}>
                              {this.isHidden() ? 'Опубликовать курс' : 'Скрыть курс'}
                          </ColoredButton>
                          {!subject.tariff.canPublish && <p style={{color: 'red'}}>Некоторых данных не хватает для публикации</p>}
                        </div>
                    </List>
                </Card>
                <Route exact path="/admin/subjects/:subjectId(\d+)" render={this.renderMainInfo} />
                <Route exact path="/admin/subjects/:subjectId(\d+)/billing" render={this.renderBillingInfo} />
            </Container>
        )
    }
}

export default withProviders(SubjectProvider)(SubjectScreen)
