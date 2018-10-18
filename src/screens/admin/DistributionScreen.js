import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import { createDistribution } from '../../actions/admin/MiscActions'
import { grey900 } from 'material-ui/styles/colors'

class DistributionScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            email: '',
            name: ''
        }
    }

    handleChange = (field, e, value) => {
        this.setState({ [field]: value })
    }

    handlePress = () => {
        this.props
            .createDistribution(this.state)
            .then(res => {
                this.setState({ phone: '', email: '', name: '' })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { email, phone, name } = this.state
        const style = {
            display: 'flex',
            margin: 'auto',
            flexDirection: 'column'
        }

        const fieldStyle = {
            display: 'block',
            margin: '20px'
        }

        const slideDown = {
            display: 'block',
            marginTop: '20px'
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Card style={style}>
                    <TextField
                        style={fieldStyle}
                        name="phone"
                        floatingLabelFocusStyle={{ color: grey900 }}
                        floatingLabelText="Телефон*"
                        value={phone}
                        underlineFocusStyle={{ borderColor: grey900 }}
                        onChange={this.handleChange.bind(this, 'phone')}
                    />
                    <TextField
                        style={fieldStyle}
                        name="email"
                        floatingLabelFocusStyle={{ color: grey900 }}
                        floatingLabelText="Почта*"
                        value={email}
                        underlineFocusStyle={{ borderColor: grey900 }}
                        onChange={this.handleChange.bind(this, 'email')}
                    />
                    <TextField
                        style={fieldStyle}
                        name="name"
                        floatingLabelFocusStyle={{ color: grey900 }}
                        floatingLabelText="Имя*"
                        value={name}
                        underlineFocusStyle={{ borderColor: grey900 }}
                        onChange={this.handleChange.bind(this, 'name')}
                    />
                    <RaisedButton
                        style={fieldStyle}
                        label="Отправить"
                        backgroundColor={grey900}
                        onClick={this.handlePress}
                    />
                </Card>
            </div>
        )
    }
}

export default connect(
    null,
    { createDistribution }
)(DistributionScreen)
