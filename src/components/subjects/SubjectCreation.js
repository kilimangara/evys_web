import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey'
import { connect } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import { fetchSubjectCategories } from '../../reducers/admin/subjects'

import Paper from '@material-ui/core/Paper'
import { deburr } from 'lodash'
import { FullWidthDownshift } from '../styled/common'

class SubjectCreation extends Component {
    constructor(props) {
        super(props)
        this.state = props.initialState
    }

    textFieldChanged = event => {
        this.setState({
            subject: event.target.value
        })
    }

    changeCategory = name => {
        const category = this.state.categories.find(category => category.verboseName === name)
        this.setState({ selectedCategory: category })
    }

    componentDidMount() {
        this.props.fetchCategories().then(({ data }) => this.setState({ categories: data || [] }))
    }

    componentDidUpdate(prevProps) {
        if (this.props.initialState !== prevProps.initialState) this.setState(this.props.initialState)
    }

    getSuggestions = value => {
        const inputValue = deburr(value.trim()).toLowerCase()
        const inputLength = inputValue.length
        let count = 0

        return inputLength === 0
            ? []
            : this.state.categories.filter(suggestion => {
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

    render() {
        const { selectedCategory = {}, categories = [] } = this.state
        const { classes } = this.props
        return (
            <div className={classes.container}>
                <TextField
                    onChange={this.textFieldChanged.bind(this)}
                    label={'Название'}
                    value={this.state.subject}
                    fullWidth
                    margin={'normal'}
                />
                <FullWidthDownshift id="downshift-simple" onSelect={this.changeCategory}>
                    {({
                        getInputProps,
                        getItemProps,
                        getMenuProps,
                        highlightedIndex,
                        inputValue,
                        isOpen,
                        selectedItem
                    }) => (
                        <div style={{ width: '100%' }}>
                            <TextField
                                margin="normal"
                                label={'Категория'}
                                fullWidth
                                value={selectedCategory.categorySecret}
                                onChange={this.changeCategory}
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
                <div className={classes.buttonsContainer}>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={this.props.onSubjectSave.bind(this, {
                            subject: this.state.subject,
                            categorySecret: selectedCategory.categorySecret
                        })}
                    >
                        Сохранить
                    </Button>
                    {this.props.updateMode && (
                        <Button
                            label="Удалить"
                            variant="contained"
                            className={classes.button}
                            onClick={this.props.onSubjectDelete.bind(this, this.state.id)}
                        >
                            Удалить
                        </Button>
                    )}
                </div>
            </div>
        )
    }
}

SubjectCreation.defaultProps = {
    onSubjectSave: data => {},
    onSubjectDelete: id => {},
    updateMode: false,
    initialState: { subject: '', categories: [], selectedCategory: '' }
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 36
    },
    menu: {
        width: 200,
        margin: '10px 0'
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    button: {
        margin: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 4}px 0px`,
        color: theme.palette.getContrastText(grey[900]),
        backgroundColor: grey[900],
        '&:hover': {
            backgroundColor: grey[800]
        }
    }
})

const mapActionsToProps = {
    fetchCategories: fetchSubjectCategories
}

export default connect(
    null,
    mapActionsToProps
)(withStyles(styles)(SubjectCreation))
