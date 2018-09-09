import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from "material-ui/RaisedButton"
import 'react-quill/dist/quill.snow.css'
import ReactQuill, {Toolbar} from 'react-quill'
import {connect} from 'react-redux'
import bind from 'memoize-bind'
import {getTheory, getVideos, createTheory} from '../../actions/admin/ThemesActions'
import Snackbar from 'material-ui/Snackbar'
import {blue500, grey200, grey500, green500, red500, grey900} from 'material-ui/styles/colors'
import HoverPaper from '../common/HoverPaper'
import {pickAsset, switchManager} from '../../actions/admin/TemplateAssetsActions'
import Paper from 'material-ui/Paper'

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

class TheoryView extends Component {

  constructor(props){
    super(props)
    this.state = {
      theory: {},
      videos: []
    }
  }

  componentDidMount = () => {
    this.props.getTheory(this.props.themeId).then((res) => {
      this.setState({theory: {...res.data.data}}, this.loadVideos)
    })
  }

  loadVideos = () => {
    const {theory} = this.state
    if(!theory.id) return
    this.props.getVideos(theory.id).then((res) => this.setState({videos: [...res.data.data]}))
  }

  changeTheoryText(newText){
    const newTheoryObj = {...this.state.theory, text: newText}
    this.setState({theory: newTheoryObj})
  }

  saveTheory = () => {
    this.props.createTheory(this.props.themeId, this.state.theory).then((res) =>{
      this.setState({theory: {...res.data.data}}, this.loadVideos)
    })
  }

  renderVideo = (video, index) => {
    const url = video.video ? video.video.file : video.youtube_video
    return(
      <div key={index} style={styles.videoItem}>
        <HoverPaper initialZDepth={1}>
          <p>{video.name}</p>
          <span style={{color: grey500, fontSize: 12}}>{url}</span>
        </HoverPaper>
      </div>
    )
  }

  modules = {
      toolbar: {
        container:[
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                    [{size: []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'},
                     {'indent': '-1'}, {'indent': '+1'}],
                    ['clean'],
                    ['image']
                ],
        handlers:{
          'image': (value) => {
            this.props.switchManager()
          }
        }
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
  }

  componentDidUpdate(prevProps){
    const {asset} = this.props
    if(asset && this.quill != null){
      const editor = this.quill.getEditor()
      const range = editor.getSelection()
      editor.insertEmbed(range.index, 'image', asset.file, "user")
      this.props.pickAsset(null, null)
    }
  }

  creationItem = () => {
    return (
      <Paper>
        <div style={{padding: 18, flexDirection:'column', justifyContent:'center', alignItems:'stretch'}}>
          <TextField
            floatingLabelText="Название"
            underlineFocusStyle={{borderColor: grey900}}/>
          <TextField
            floatingLabelText="Ссылка"
            underlineFocusStyle={{borderColor: grey900}}/>
          <RaisedButton backgroundColor={grey900} label='Добавить' style={{marginTop:12}}  labelStyle={{color: 'white'}}/>
        </div>
      </Paper>
    )
  }

  render(){
    const {theory, videos} = this.state
    return(
      <div style={styles.container}>
        <div style={styles.theoryContainer}>
          <ReactQuill ref={ref => this.quill = ref}
                      value={theory.text}
                      modules={this.modules}
                      formats={formats}
                      onChange={bind(this.changeTheoryText, this)}
                      theme={'snow'}/>
          <RaisedButton backgroundColor={grey900} label='Сохранить' style={{marginTop: 12}} labelStyle={{color: 'white'}} onClick={this.saveTheory}/>
        </div>
        <div style={styles.videosContainer}>
          <h2>Видео</h2>
          {videos.map(this.renderVideo)}
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
    padding: 16
  },
  videoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12
  }

}

const mapStateToProps = state => ({
  asset: state.asset_manager.asset,
  meta: state.asset_manager.meta
})

export default connect(mapStateToProps, {getTheory, getVideos, createTheory, pickAsset, switchManager})(TheoryView)
