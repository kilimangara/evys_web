import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from "material-ui/RaisedButton"
import 'react-quill/dist/quill.snow.css'
import ReactQuill, {Toolbar} from 'react-quill'
import {connect} from 'react-redux'
import bind from 'memoize-bind'
import {getTheory, getVideos, createTheory} from '../../actions/admin/ThemesActions'
import Snackbar from 'material-ui/Snackbar'
import {grey900, grey500} from 'material-ui/styles/colors'
import HoverPaper from '../common/HoverPaper'

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
      this.setState({theory: {...res.data.data}})
      return res.data.data.id
    }).then((id) => this.props.getVideos(id))
    .then((res) => this.setState({videos: [...res.data.data]}))
  }

  changeTheoryText(newText){
    const newTheoryObj = {...this.state.theory, text: newText}
    this.setState({theory: newTheoryObj})
  }

  saveTheory(){

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

  render(){
    const {theory, videos} = this.state
    return(
      <div style={styles.container}>
        <div style={styles.theoryContainer}>
          <ReactQuill value={theory.text}
                    onChange={bind(this.changeTheoryText, this)}
                    theme={'snow'}/>
          <RaisedButton backgroundColor={grey900} label='Сохранить' style={{marginTop: 12}} labelStyle={{color: 'white'}}/>
        </div>
        <div style={styles.videosContainer}>
          <h2>Видео</h2>
          {videos.map(this.renderVideo)}
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

export default connect(null, {getTheory, getVideos, createTheory})(TheoryView)
