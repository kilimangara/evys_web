import React, {Component} from 'react'
import 'codemirror/lib/codemirror.css'
import CodeMirror from 'react-codemirror'
import "codemirror/mode/htmlmixed/htmlmixed"
import "codemirror/mode/css/css"
import "codemirror/theme/dracula.css"

class HTMLBuilderScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      code: '',
      cssCode: ''
    }
  }

  codeUpdate = (field, value) => {
    this.setState({[field]: value})
  }

  render() {
    const options = {
  			lineNumbers: true,
        mode: 'htmlmixed',
        theme: 'dracula'
  		}
    const optionsCss = {
      lineNumbers: true,
      mode: 'css'
    }
    return (
      <div>
        <h2>HTML</h2>
        <CodeMirror value={this.state.code} codeUpdate={this.codeUpdate.bind(this, 'code')} options={options}/>
        <h2>CSS</h2>
        <CodeMirror value={this.state.cssCode} codeUpdate={this.codeUpdate.bind(this, 'cssCode')} options={optionsCss}/>
      </div>
    );
  }
}

export default HTMLBuilderScreen;
