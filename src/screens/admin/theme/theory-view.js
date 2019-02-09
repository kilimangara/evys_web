import React from 'react'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import withProviders from '../../../utils/withProviders'
import AssetManagerRepository, {AssetManagerProvider} from '../../../mixins/admin/AssetManagerRepository'
import SaveButton from '../../../components/common/SaveButton'
import { Card } from './index'
import ImageResize  from 'quill-image-resize-module'
// TODO: здесь надо разобраться как лучше импортить это добро
Quill.register('modules/imageResize', ImageResize)

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'formula'
]

class TheoryView extends AssetManagerRepository(React.Component){

  modules = {
    imageResize: {
      displaySize: true
    },
      toolbar: {
          container: [
              [{ header: '1' }, { header: '2' }, { font: [] }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
              ['clean'],
              ['image'],
              ['formula']
          ],
          handlers: {
              image: value => {
                  this.props.switchManager()
              }
          }
      },
      clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false
      }
  }

  componentDidUpdate(prevProps) {
    this.passImageFromManager()
  }

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
        <ReactQuill
            ref={ref => (this.quill = ref)}
            value={theory.text}
            modules={this.modules}
            formats={formats}
            onChange={this.changeTheoryText}
            theme={'snow'}
        />
        <SaveButton ref={(ref) => this.saveButton = ref} onClick={this.saveSubject}/>
      </Card>
    )
  }
}

export default withProviders(AssetManagerProvider)(TheoryView)
