import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import SaveButton from '../common/SaveButton'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-сontent: center;
  align-items: flex-start;
  padding: 36px;
`

export default class CreateAccount extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.initialState
    }

    saveToState = (field) => (event, newValue) => {
        let value = event.target.value
        if( field === 'isHidden') value = newValue
        if( field === 'num' && value === '') value = null
        this.setState({
            [field]: value
        })
    }

    componentDidUpdate(prevProps) {
      if(this.props != prevProps) this.setState(this.props.initialState)
    }

    saveAccount = () => {
      this.props.onAccountSave(this.state)
    }

    render() {
      const { name } = this.state
        return (
            <Container>
              <TextField
                  onChange={this.saveToState('name')}
                  value={name}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Название"
              />
              <SaveButton onClick={this.saveAccount}/>
            </Container>
        )
    }
}
