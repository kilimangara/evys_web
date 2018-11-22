import React, { Component } from 'react'
import { ImageCoverContainer, ImageLoaderContainer } from '../styled/ImageLoader'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Dropzone from 'react-dropzone'

export class ImageLoader extends Component {
    state = {
        hovered: false,
        uploadedImage: null
    }
    counter = 0

    handleHover = hover => {
        this.setState({ hovered: hover })
    }

    uploadFile = e => {
        e.preventDefault()
        this.fileUploader.click()
    }

    onImageUpload = e => {
        this.handleImageUpload(e.target.files[0])
    }

    handleImageUpload = image => {
        const reader = new FileReader()
        reader.onloadend = () => this.setState({ uploadedImage: reader.result })
        if (image) {
            reader.readAsDataURL(image)
        }
    }

    dragEnter = e => {
        e.stopPropagation()
        this.handleHover(true)
        this.counter++
    }

    dragOver = e => {
        e.stopPropagation()
        e.preventDefault()
    }

    dragLeave = () => {
        this.counter--
        if (this.counter === 0) {
            this.handleHover(false)
        }
    }

    onDrop = e => {
        e.stopPropagation()
        e.preventDefault()
        this.handleImageUpload(e.dataTransfer.files && e.dataTransfer.files[0])
    }

    createInputRef = element => (this.fileUploader = element)

    render() {
        const { src, width, paddingTop } = this.props
        const { hovered, uploadedImage } = this.state
        return (
            <ImageLoaderContainer
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
                width={width}
                onDrop={this.onDrop}
                onDragEnter={this.dragEnter}
                onDragLeave={this.dragLeave}
                onDragOver={this.dragOver}
            >
                <img src={uploadedImage || src} style={{ objectFit: 'cover', maxWidth: '100%', maxHeight: '100%' }} />
                <ImageCoverContainer hovered={hovered} onClick={this.uploadFile}>
                    <CloudUploadIcon style={{ color: 'white' }} />
                </ImageCoverContainer>
                <input
                    type="file"
                    accept="image"
                    ref={this.createInputRef}
                    style={{ display: 'none' }}
                    onChange={this.onImageUpload}
                />
            </ImageLoaderContainer>
        )
    }
}

ImageLoader.defaultProps = {
    src: 'http://www.esek.org.gr/images/ESET/eset_user.png'
}
