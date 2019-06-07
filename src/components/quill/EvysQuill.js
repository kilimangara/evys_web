import React from 'react'
import ReactQuill from 'react-quill'
import { connect } from 'react-redux'
import { switchManager, assetPicked } from '../../reducers/admin/assetManager'
import ImageResize from 'quill-image-resize-module'
// TODO: здесь надо разобраться как лучше импортить это добро
Quill.register('modules/imageResize', ImageResize)

import 'react-quill/dist/quill.snow.css'

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
    'formula',
    'imagewithstyle',
    'alt',
    'width',
    'height',
    'style',
    'code',
    'code-block'
]

class EvysQuill extends React.Component {
    modules = {
        imageResize: {
            displaySize: true
        },
        toolbar: {
            container: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                ['clean'],
                [{ image: { tooltip: 'Прикрепить фотографию' } }],
                [{ formula: { tooltip: 'Формула в KaTex формате' } }]
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

    changeText = newText => {
        this.props.onChangeText && this.props.onChangeText(newText)
    }

    componentDidUpdate(prevProps) {
        this.passImageFromManager()
    }

    passImageFromManager = () => {
        const { asset } = this.props
        if (asset && this.quill != null) {
            const editor = this.quill.getEditor()
            const range = editor.getSelection()
            const index = Boolean(range) ? range.index : 0
            editor.insertEmbed(index, 'image', asset.file, 'user')
            this.props.assetPicked({})
            this.props.switchManager()
        }
    }

    render() {
        const { value, readOnly } = this.props
        return (
            <ReactQuill
                ref={ref => (this.quill = ref)}
                value={value}
                readOnly={readOnly}
                modules={!readOnly ? this.modules : { toolbar: null }}
                formats={formats}
                onChange={this.changeText}
                theme={!readOnly ? 'snow' : 'bubble'}
            />
        )
    }
}

const mapStateToProps = state => ({
    asset: state.assetManager.asset,
    meta: state.assetManager.meta
})

export default connect(
    mapStateToProps,
    { switchManager, assetPicked }
)(EvysQuill)
