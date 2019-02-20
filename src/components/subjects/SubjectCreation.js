import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey'
import { connect } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'
import { fetchSubjectCategories } from '../../reducers/admin/subjects'

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

    changeCategory = event => {
        const category = this.state.categories.find(category => category.categorySecret === event.target.value)
        this.setState({ selectedCategory: category })
    }

    componentDidMount() {
        this.props.fetchCategories().then(({ data }) => this.setState({ categories: data || [] }))
    }

    componentDidUpdate(prevProps) {
        if (this.props.initialState !== prevProps.initialState) this.setState(this.props.initialState)
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
                <TextField
                    select
                    margin="normal"
                    label={'Категория'}
                    fullWidth
                    value={selectedCategory.categorySecret}
                    onChange={this.changeCategory}
                >
                    {(categories.length &&
                        categories.map(category => (
                            <MenuItem key={category.categorySecret} value={category.categorySecret}>
                                {category.verboseName}
                            </MenuItem>
                        ))) ||
                        []}
                </TextField>
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
