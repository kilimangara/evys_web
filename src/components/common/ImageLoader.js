import React, { Component } from 'react'
import { ImageCoverContainer, ImageLoaderContainer } from '../styled/ImageLoader'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Dropzone from 'react-dropzone'
import { BorderedImage, FilledImage, Loader, LoaderWrapper } from '../styled/common'

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
        this.props.onChange(image)
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

    getImageType = img => (img.width > img.height ? 'wide' : 'tall')

    onDrop = e => {
        e.stopPropagation()
        e.preventDefault()
        this.handleImageUpload(e.dataTransfer.files && e.dataTransfer.files[0])
    }

    createInputRef = element => (this.fileUploader = element)

    render() {
        const { src, width, paddingTop, loading, height } = this.props
        const { hovered, uploadedImage } = this.state
        return (
            <ImageLoaderContainer
                paddingTop={paddingTop || 0}
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
                width={width}
                height={height}
                onDrop={this.onDrop}
                onDragEnter={this.dragEnter}
                onDragLeave={this.dragLeave}
                onDragOver={this.dragOver}
            >
                {loading ? (
                    <LoaderWrapper style={{ position: 'absolute', top: '0', left: '0' }}>
                        <Loader />
                    </LoaderWrapper>
                ) : (
                    <BorderedImage
                        width={'100%'}
                        height={'100%'}
                        image={uploadedImage || src}
                        style={{ position: 'absolute', top: '0', left: '0' }}
                    />
                )}
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
