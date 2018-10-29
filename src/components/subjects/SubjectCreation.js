import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey'
import { fetchCategories } from '../../actions/admin/SubjectActions'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import { withStyles } from '@material-ui/core/styles'

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
        const category = this.state.categories.find(category => category.category_secret === event.target.value)
        this.setState({ selectedCategory: category })
    }

    componentDidMount() {
        this.props
            .fetchCategories()
            .then(response =>
                this.setState({ ...this.state, categories: (response && response.data && response.data.data) || [] })
            )
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.initialState)
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
                    value={
                        (selectedCategory && selectedCategory.category_secret) ||
                        (categories.length && categories[0].category_secret)
                    }
                    className={this.props.classes.menu}
                    onChange={this.changeCategory}
                >
                    {(categories.length &&
                        categories.map(category => (
                            <MenuItem key={category.category_secret} value={category.category_secret}>
                                {category.verbose_name}
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
                            category_secret: selectedCategory.category_secret
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
    fetchCategories
}

export default connect(
    null,
    mapActionsToProps
)(withStyles(styles)(SubjectCreation))
