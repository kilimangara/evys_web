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
import {
    FullWidthDownshift,
    H3,
    RowFlexed,
    WithHorizontalMargin,
    WithVerticalMargin
} from '../../../components/styled/common'
import { deburr } from 'lodash'
import Paper from '@material-ui/core/Paper'
import { ImageLoader } from '../../../components/common/ImageLoader'
import { CourseImageBlock, FieldsBlock } from '../../../components/styled/admin/Students'
import { SubjectProvider } from '../../../mixins/admin/SubjectRepository'

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

    onImageChanged = async image => {
        console.log(123312)
        // this.setState({ image })
        await this.props.subjectUpdated(
            produce(this.props.subject, draft => {
                draft.mainImage = image
            })
        )
        const fd = new FormData()
        fd['main_image'] = image
        this.props.updateSubject(this.props.subjectId, fd)
    }

    getSuggestions = value => {
        const inputValue = deburr(value.trim()).toLowerCase()
        const inputLength = inputValue.length
        let count = 0

        return inputLength === 0
            ? []
            : this.props.categories.filter(suggestion => {
                  const keep = count < 5 && suggestion.verboseName.slice(0, inputLength).toLowerCase() === inputValue

                  if (keep) {
                      count += 1
                  }

                  return keep
              })
    }

    renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
        const isHighlighted = highlightedIndex === index
        const isSelected = (selectedItem || '').indexOf(suggestion.verboseName) > -1

        return (
            <MenuItem
                {...itemProps}
                key={suggestion.label}
                selected={isHighlighted}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400
                }}
            >
                {suggestion.verboseName}
            </MenuItem>
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
        let value = event && event.target && event.target.value
        if (field === 'categorySecret') {
            const category = this.props.categories.find(category => category.verboseName === event) // actually it's value, nevermind
            value = category.categorySecret
        }
        this.props.subjectUpdated(
            produce(this.props.subject, draft => {
                draft[field] = value
            })
        )
    }

    render() {
        const { subject, categories, onPhotoChange } = this.props
        console.log(subject)
        return (
            <Card marginTop={12}>
                <RowFlexed>
                    <CourseImageBlock>
                        <ImageLoader
                            width={'400px'}
                            height={'200px'}
                            onChange={onPhotoChange}
                            src={subject.category.image}
                        />
                        <WithHorizontalMargin margin={10}>
                            {/*<H3 color={'#666'}>Выберите подходящее изображение для Вашего курса.</H3>*/}
                        </WithHorizontalMargin>
                    </CourseImageBlock>
                    <FieldsBlock>
                        <TextField
                            onChange={this.fieldChanged('subject')}
                            label={'Название'}
                            variant="outlined"
                            value={subject.subject}
                            fullWidth
                            margin={'normal'}
                        />
                        <FullWidthDownshift
                            id="different-complex-2"
                            initialInputValue={subject.categorySecret || subject.category.verboseName}
                            onSelect={this.fieldChanged('categorySecret')}
                        >
                            {({
                                getInputProps,
                                getItemProps,
                                getMenuProps,
                                highlightedIndex,
                                inputValue,
                                isOpen,
                                selectedItem
                            }) => (
                                <div style={{ width: '100%', marginTop: '20px' }}>
                                    <TextField
                                        margin="normal"
                                        label={'Категория'}
                                        fullWidth
                                        variant={'outlined'}
                                        InputProps={getInputProps()}
                                    />
                                    <div {...getMenuProps()}>
                                        {isOpen ? (
                                            <Paper square>
                                                {this.getSuggestions(inputValue).map((suggestion, index) =>
                                                    this.renderSuggestion({
                                                        suggestion,
                                                        index,
                                                        itemProps: getItemProps({ item: suggestion.verboseName }),
                                                        highlightedIndex,
                                                        selectedItem
                                                    })
                                                )}
                                            </Paper>
                                        ) : null}
                                    </div>
                                </div>
                            )}
                        </FullWidthDownshift>
                    </FieldsBlock>
                </RowFlexed>
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

export default withProviders(SubjectProvider)(MainInfo)
