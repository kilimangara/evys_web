import React from 'react'
import withProviders from '../../../utils/withProviders'
import SaveButton from '../../../components/common/SaveButton'
import { Card } from './index'
import EvysQuill from '../../../components/quill/EvysQuill'

class TheoryView extends React.Component{

  changeTheoryText = (newText) => {
      const newTheoryObj = { ...this.props.theory, text: newText }
      this.props.updateTheory(newTheoryObj)
  }

  saveTheory = () => {
    this.props.saveTheory()
  }

  render(){
    const {theory, videos} = this.props
    if (!theory) return null
    return(
      <Card marginTop={12}>
        <EvysQuill
            value={theory.text}
            onChangeText={this.changeTheoryText}
        />
        <SaveButton ref={(ref) => this.saveButton = ref} onClick={this.saveSubject}/>
      </Card>
    )
  }
}

export default TheoryView
