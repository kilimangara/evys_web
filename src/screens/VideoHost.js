import React, {Component} from 'react'
import ReactPlayer from 'react-player'
import { PlayButton, PauseButton, ProgressBar } from 'react-player-controls'
import '../screencss/VideHost.scss'

export default class VideHost extends Component {

  constructor(props){
    super(props)
    this.state = {
      duration: 0,
      currentTime: 0,
      loaded: 0,
      playing: false,
    }
  }

  onDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  changePlaying = (playing) => {
    this.setState({playing})
  }

  onSeek = (currentTime) => {
    this.setState({currentTime})
    console.log(currentTime, parseFloat(currentTime))
    this.player.seekTo(parseFloat(currentTime))
  }

  onProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
     this.setState({currentTime: state.played, loaded: state.loaded})
  }


  render(){
    console.log(this.state)
    return (
      <div className='wrapper'>
        <ReactPlayer
          ref={(c) => this.player = c}
          url='https://evysapi.s3.eu-central-1.amazonaws.com/evys/videos/Test/%D0%A2%D0%B5%D1%81%D1%82/Ddddd.mp4'
          playing={this.state.playing}
          onDuration={this.onDuration}
          onProgress={this.onProgress}
          width='100%'
          height='100%'
          className='player'/>
        <div className='overlay'>
          {!this.state.playing ?
                      <PlayButton isEnabled onClick={this.changePlaying.bind(this, true)}/>
          : <PauseButton isEnabled onClick={this.changePlaying.bind(this, false)}/> }
          <ProgressBar totalTime={this.state.duration}
            currentTime={this.state.currentTime}
            onSeekEnd={this.onSeek}
            isSeekable/>
        </div>
      </div>
    )
  }
}

const styles = {
  wrapper: {
    position: 'relative',
    paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }

}
