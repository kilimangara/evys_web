import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import grey from '@material-ui/core/colors/grey'
import {uploadAsset, assetPicked} from '../../reducers/admin/assetManager'

class ImageAssetPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dropzoneActive: false
        }
        this.meta = {}
    }

    setMeta = meta => {
        this.meta = meta
    }

    onDragEnter = () => {
        this.setState({
            dropzoneActive: true
        })
    }

    onDragLeave = () => {
        this.setState({
            dropzoneActive: false
        })
    }

    onDrop = (files) => {
        console.log(files)
        let file = files[0]
        this.props.uploadAsset({
          file,
          type: this.props.mediaType,
          name: file.name
        }).then(({data}) => {
          this.props.assetPicked({asset: data, meta: this.meta})
        })

        this.setState({
            dropzoneActive: false
        })
    }

    render() {
        const { assets, dropzoneActive } = this.state
        const overlayStyle = { ...styles.dropzoneStyle }
        if (dropzoneActive) {
            overlayStyle.backgroundColor = 'rgba(128,128,128, .5)'
        }
        return (
            <div style={styles.container}>
                <Dropzone
                    accept="image/*"
                    style={{ position: 'relative' }}
                    onDrop={this.onDrop}
                    onDragEnter={this.onDragEnter}
                    onDragLeave={this.onDragLeave}
                >
                    <div style={overlayStyle}>Перетащите сюда файлы или нажмите</div>
                </Dropzone>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 36
    },
    cardStyle: {
        margin: 8
    },
    searchBox: {
        display: 'inline-block'
    },
    dropzoneStyle: {
        marginVertical: 12,
        height: 150,
        borderRadius: 15,
        padding: 16,
        borderWidth: 2,
        borderColor: grey[900],
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }
}

ImageAssetPicker.defaultProps = {
    assetPicked: (assetObject, meta) => {},
    mediaType: 'image'
}

export default connect(
    null,
    { uploadAsset, assetPicked }
)(ImageAssetPicker)
