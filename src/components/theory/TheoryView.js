import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import 'react-quill/dist/quill.snow.css'
import ReactQuill, { Toolbar } from 'react-quill'
import { connect } from 'react-redux'
import bind from 'memoize-bind'
import { getTheory, getVideos, createTheory, createVideo } from '../../actions/admin/ThemesActions'
import Snackbar from 'material-ui/Snackbar'
import { blue500, grey200, grey500, green500, red500, grey900 } from 'material-ui/styles/colors'
import HoverPaper from '../common/HoverPaper'
import { pickAsset, switchManager } from '../../actions/admin/TemplateAssetsActions'
import Paper from 'material-ui/Paper'
import PickYoutubeVideo from '../youtube/PickYoutubeVideo'
import pt from 'prop-types'

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

class TheoryView extends Component {
    static contextTypes = {
        router: pt.object
    }

    constructor(props) {
        super(props)
        this.state = {
            theory: {},
            videos: [],
            videoName: '',
            videoURL: ''
        }
    }

    componentDidMount = () => {
        console.log(this.context)
        this.props.getTheory(this.props.themeId).then(res => {
            this.setState({ theory: { ...res.data.data } }, this.loadVideos)
        })
    }

    loadVideos = () => {
        const { theory } = this.state
        if (!theory.id) return
        this.props.getVideos(theory.id).then(res => this.setState({ videos: [...res.data.data] }))
    }

    changeTheoryText(newText) {
        const newTheoryObj = { ...this.state.theory, text: newText }
        this.setState({ theory: newTheoryObj })
    }

    saveTheory = () => {
        this.props.createTheory(this.props.themeId, this.state.theory).then(res => {
            this.setState({ theory: { ...res.data.data } }, this.loadVideos)
        })
    }

    saveVideo = () => {
        const { videoName, videoURL, theory } = this.state
        if (theory && theory.id) {
            const data = {
                youtube_video: videoURL,
                name: videoName,
                attachment_type: 'youtube'
            }
            this.props.createVideo(theory.id, data).then(res => {
                console.log(res)
                this.setState({ videoName: '', videoURL: '' })
                this.loadVideos()
            })
        }
    }

    goToVideo = index => {
        const { theory } = this.state
        if (!theory.id) return
        this.context.router.history.push(`/admin/theory/${theory.id}/watch?v=${index}`)
    }

    renderVideo = (video, index) => {
        const url = video.video ? video.video.file : video.youtube_video
        let videoKey = new URL(url).searchParams.get('v')
        return (
            <div key={index} onClick={this.goToVideo.bind(this, index)} style={{ width: '80%' }}>
                <HoverPaper initialZDepth={1} style={styles.videoItem}>
                    <img src={`http://img.youtube.com/vi/${videoKey}/sddefault.jpg`} width={96} height={96} />
                    <div style={{ marginLeft: 12 }}>
                        <p>
                            {index + 1}. {video.name}
                        </p>
                    </div>
                </HoverPaper>
            </div>
        )
    }

    modules = {
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
        const { asset } = this.props
        if (asset && this.quill != null) {
            const editor = this.quill.getEditor()
            const range = editor.getSelection()
            editor.insertEmbed(range.index, 'image', asset.file, 'user')
            this.props.pickAsset(null, null)
        }
    }

    goToYoutubeVideoAdd = () => {
        const { themeId } = this.props
        const { theory } = this.state
        if (!theory.id) return
        this.context.router.history.push(`/admin/themes/${themeId}/add_video?theory_id=${theory.id}`)
    }

    creationItem = () => {
        const { videoName, videoURL } = this.state
        const { themeId, youtubeSigned } = this.props
        if (youtubeSigned)
            return (
                <RaisedButton
                    backgroundColor={grey900}
                    label="Добавить видео"
                    style={{ marginTop: 12 }}
                    labelStyle={{ color: 'white' }}
                    onClick={this.goToYoutubeVideoAdd}
                />
            )
        return (
            <Paper>
                <div
                    style={{
                        padding: 18,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        display: 'flex',
                        width: 350
                    }}
                >
                    <TextField
                        value={videoName}
                        onChange={(event, videoName) => this.setState({ videoName })}
                        floatingLabelText="Название"
                        underlineFocusStyle={{ borderColor: grey900 }}
                    />
                    <TextField
                        floatingLabelText="Ссылка"
                        value={videoURL}
                        onChange={(event, videoURL) => this.setState({ videoURL })}
                        underlineFocusStyle={{ borderColor: grey900 }}
                    />
                    <RaisedButton
                        backgroundColor={grey900}
                        label="Добавить"
                        style={{ marginTop: 12 }}
                        labelStyle={{ color: 'white' }}
                        onClick={this.saveVideo}
                    />
                </div>
            </Paper>
        )
    }

    render() {
        const { theory, videos } = this.state
        return (
            <div style={styles.container}>
                <div style={styles.theoryContainer}>
                    <ReactQuill
                        ref={ref => (this.quill = ref)}
                        value={theory.text}
                        modules={this.modules}
                        formats={formats}
                        onChange={bind(this.changeTheoryText, this)}
                        theme={'snow'}
                    />
                    <RaisedButton
                        backgroundColor={grey900}
                        label="Сохранить"
                        style={{ marginTop: 12 }}
                        labelStyle={{ color: 'white' }}
                        onClick={this.saveTheory}
                    />
                </div>
                <div style={styles.videosContainer}>
                    <h2>Видео</h2>
                    {videos.map(this.renderVideo)}
                    <div style={{ height: 12 }} />
                    {this.creationItem()}
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    theoryContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    videosContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 16
    },
    videoItem: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 12,
        padding: 18
    }
}

const mapStateToProps = state => ({
    asset: state.asset_manager.asset,
    meta: state.asset_manager.meta,
    youtubeSigned: state.youtube.signedIn
})

export default connect(
    mapStateToProps,
    { getTheory, getVideos, createTheory, pickAsset, switchManager, createVideo }
)(TheoryView)
