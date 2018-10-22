import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { grey900 } from 'material-ui/styles/colors'
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
        return (
            <div style={styles.container}>
                <TextField onChange={this.textFieldChanged.bind(this)} label={'Название'} value={this.state.subject} />
                <TextField
                    select
                    label={'Категория'}
                    value={
                        (this.state.selectedCategory && this.state.selectedCategory.category_secret) ||
                        (this.state.categories.length && this.state.categories[0].category_secret)
                    }
                    className={this.props.classes.menu}
                    onChange={this.changeCategory}
                >
                    {(this.state.categories.length &&
                        this.state.categories.map(category => (
                            <MenuItem key={category.category_secret} value={category.category_secret}>
                                {category.verbose_name}
                            </MenuItem>
                        ))) ||
                        []}
                </TextField>
                <RaisedButton
                    label="Сохранить"
                    labelStyle={{ color: 'white' }}
                    backgroundColor={grey900}
                    onClick={this.props.onSubjectSave.bind(this, {
                        subject: this.state.subject,
                        category_secret: this.state.selectedCategory.category_secret
                    })}
                />
                {this.props.updateMode && (
                    <RaisedButton
                        label="Удалить"
                        style={{ marginTop: 20 }}
                        labelStyle={{ color: 'white' }}
                        backgroundColor={grey900}
                        onClick={this.props.onSubjectDelete.bind(this, this.state.id)}
                    />
                )}
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

const styles = {
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
    }
}

const mapActionsToProps = {
    fetchCategories
}

export default connect(
    null,
    mapActionsToProps
)(withStyles(styles)(SubjectCreation))
