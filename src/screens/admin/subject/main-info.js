import React from 'react'
import withNav, { NavigationProvider } from '../../../mixins/admin/NavigatableComponent'
import withProviders from '../../../utils/withProviders'
import { Card, TagChip } from './index'
import SaveButton from '../../../components/common/SaveButton'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import produce from 'immer'
import Add from '@material-ui/icons/Add'

class MainInfo extends React.Component {
    state = {
        tag: ''
    }

    saveSubject = () => {
        this.props.saveSubject().then(() => this.saveButton.success())
    }

    changeLocalState = field => event => {
        this.setState({ [field]: event.target.value })
    }

    handleAddTag = e => {
        e.preventDefault()
        const { tag } = this.state
        if (!tag) return
        this.setState({ tag: '' })
        this.props.subjectUpdated(
            produce(this.props.subject, draft => {
                if (!draft.tags) draft.tags = []
                draft.tags.push(tag)
            })
        )
    }

    deleteTag = index => () => {
        this.props.subjectUpdated(
            produce(this.props.subject, draft => {
                draft.tags.splice(index, 1)
            })
        )
    }

    fieldChanged = field => event => {
        let value = event.target.value
        if (field === 'categorySecret') {
            const category = this.props.categories.find(category => category.categorySecret === event.target.value)
            value = category.categorySecret
        }
        this.props.subjectUpdated(
            produce(this.props.subject, draft => {
                draft[field] = value
            })
        )
    }

    render() {
        const { subject, categories } = this.props
        return (
            <Card marginTop={12}>
                <TextField
                    onChange={this.fieldChanged('subject')}
                    label={'Название'}
                    variant="outlined"
                    value={subject.subject}
                    fullWidth
                    margin={'normal'}
                />
                <TextField
                    select
                    variant="outlined"
                    margin="normal"
                    label={'Категория'}
                    fullWidth
                    value={subject.categorySecret || subject.category.categorySecret}
                    onChange={this.fieldChanged('categorySecret')}
                >
                    {(categories.length &&
                        categories.map(category => (
                            <MenuItem key={category.categorySecret} value={category.categorySecret}>
                                {category.verboseName}
                            </MenuItem>
                        ))) ||
                        []}
                </TextField>
                <form onSubmit={this.handleAddTag} style={{ position: 'relative' }}>
                    <TextField
                        onChange={this.changeLocalState('tag')}
                        label={'Тэг'}
                        variant="outlined"
                        fullWidth
                        value={this.state.tag}
                        margin={'normal'}
                    />
                    <div style={{ position: 'absolute', right: 12, top: 20 }}>
                        <IconButton type="submit">
                            <Add />
                        </IconButton>
                    </div>
                </form>
                <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                    {subject.tags &&
                        subject.tags.map((t, index) => (
                            <TagChip key={index} variant="outlined" label={`#${t}`} onDelete={this.deleteTag(index)} />
                        ))}
                </div>
                <div>
                    <SaveButton
                        ref={ref => (this.saveButton = ref)}
                        loading={this.props.fetching}
                        onClick={this.saveSubject}
                    />
                </div>
            </Card>
        )
    }
}

export default withProviders()(MainInfo)
