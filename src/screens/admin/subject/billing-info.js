import React from 'react'
import {Card, TagChip} from './index'
import SaveButton from '../../../components/common/SaveButton'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import produce from "immer"
import Add from '@material-ui/icons/Add'
import fe from '../../../utils/get-errors'

const CURRENCIES = [{code: 'RUB', label: '₽'}, {code: 'USD', label: '$'}]

export default class BillingInfo extends React.Component {

  saveSubject = () => {
    this.props.saveSubject().then(()=>this.saveButton.success())
  }

  fieldChanged = (field) => (event) => {
    let value = event.target.value
    this.props.subjectUpdated(produce(this.props.subject, (draft) => {draft.tariff[field] = value}))
  }

  render(){
    const {tariff} = this.props.subject
    const {errors} = this.props
    console.log('rendeeeer')
    return(
      <Card marginTop={12}>
      <TextField
          onChange={this.fieldChanged('name')}
          label={'Название для поиска'}
          variant='outlined'
          error={!!fe(errors, 'name')}
          helperText={fe(errors,'name')}
          value={tariff.name}
          fullWidth
          margin={'normal'}
      />
      <TextField
          onChange={this.fieldChanged('description')}
          label={'Описание для поиска'}
          variant='outlined'
          multiline
          error={!!fe(errors, 'description')}
          helperText={fe(errors,'description')}
          value={tariff.description}
          fullWidth
          rows={5}
          rowsMax={20}
          margin={'normal'}
      />
        <TextField
          onChange={this.fieldChanged('amount')}
          label={'Цена курса'}
          variant='outlined'
          value={tariff.amount}
          fullWidth
          type='number'
          min='0'
          step='.01'
          margin={'normal'}
        />
        <TextField
          select
          onChange={this.fieldChanged('currency')}
          variant='outlined'
          margin='normal'
          label='Валюта'
          value={tariff.currency}
        >
          {
            CURRENCIES.map((currency) => (
              <MenuItem key={currency.code} value={currency.code}>
                {currency.label}
              </MenuItem>
            ))
          }
        </TextField>
      <div>
       <SaveButton ref={(ref) => this.saveButton = ref} loading={this.props.fetching} onClick={this.saveSubject}/>
      </div>
      </Card>
    )
  }
}
