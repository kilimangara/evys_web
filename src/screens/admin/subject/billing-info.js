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
import fe from '../../../utils/get-errors'

const CURRENCIES = [{ code: 'RUB', label: '₽' }, { code: 'USD', label: '$' }]

class BillingInfo extends React.Component {
    state = {
        targetAudience: '',
        results: '',
        requirements: ''
    }

    saveSubject = () => {
        this.props.saveSubject().then(() => this.saveButton.success())
    }

    fieldChanged = field => event => {
        let value = event.target.value
        this.props.subjectUpdated(
            produce(this.props.subject, draft => {
                draft.tariff[field] = value
            })
        )
    }

    handleAddTag = field => e => {
        e.preventDefault()
        const tag = this.state[field]
        if (!tag) return
        this.props.subjectUpdated(
            produce(this.props.subject, draft => {
                if (!draft.tariff[field]) draft.tariff[field] = []
                draft.tariff[field].push(tag)
            })
        )
        this.setState({ [field]: '' })
    }

    handleValue = field => event => {
        this.setState({ [field]: event.target.value })
    }

    deleteTag = (field, index) => () => {
        this.props.subjectUpdated(
            produce(this.props.subject, draft => {
                draft.tariff[field].splice(index, 1)
            })
        )
    }

    translateField = field => {
        switch (field) {
            case 'targetAudience':
                return 'Какова ваша целевая аудитория?'
            case 'results':
                return 'Что студенты будут изучать на вашем курсе?'
            case 'requirements':
                return 'Существуют ли у курса какие-либо (предварительные) требования?'
            default:
                return ''
        }
    }

    renderTagForm = field => {
        const { tariff } = this.props.subject
        return (
            <React.Fragment>
                <form onSubmit={this.handleAddTag(field)} style={{ position: 'relative' }}>
                    <TextField
                        onChange={this.handleValue(field)}
                        label={this.translateField(field)}
                        variant="outlined"
                        fullWidth
                        value={this.state[field]}
                        margin={'normal'}
                    />
                    <div style={{ position: 'absolute', right: 12, top: 20 }}>
                        <IconButton type="submit">
                            <Add />
                        </IconButton>
                    </div>
                </form>
                <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                    {tariff[field] &&
                        tariff[field].map((t, index) => (
                            <TagChip
                                key={index}
                                variant="outlined"
                                label={`${t}`}
                                onDelete={this.deleteTag(field, index)}
                            />
                        ))}
                </div>
            </React.Fragment>
        )
    }

    render() {
        const { tariff } = this.props.subject
        const { errors } = this.props
        return (
            <Card marginTop={12}>
                <TextField
                    onChange={this.fieldChanged('name')}
                    label={'Название для поиска'}
                    variant="outlined"
                    error={!!fe(errors, 'name')}
                    helperText={fe(errors, 'name')}
                    value={tariff.name}
                    fullWidth
                    margin={'normal'}
                />
                <TextField
                    onChange={this.fieldChanged('description')}
                    label={'Описание для поиска'}
                    variant="outlined"
                    multiline
                    error={!!fe(errors, 'description')}
                    helperText={fe(errors, 'description')}
                    value={tariff.description}
                    fullWidth
                    rows={5}
                    rowsMax={20}
                    margin={'normal'}
                />
                {this.renderTagForm('targetAudience')}
                {this.renderTagForm('requirements')}
                {this.renderTagForm('results')}
                <TextField
                    onChange={this.fieldChanged('amount')}
                    label={'Цена курса'}
                    variant="outlined"
                    value={tariff.amount}
                    fullWidth
                    type="number"
                    min="0"
                    step=".01"
                    margin={'normal'}
                />
                <TextField
                    select
                    onChange={this.fieldChanged('currency')}
                    variant="outlined"
                    margin="normal"
                    label="Валюта"
                    value={tariff.currency}
                >
                    {CURRENCIES.map(currency => (
                        <MenuItem key={currency.code} value={currency.code}>
                            {currency.label}
                        </MenuItem>
                    ))}
                </TextField>
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

export default withProviders()(BillingInfo)
