import React from 'react'


export default class GoogleAuth extends React.Component {

  componentDidMount(){
    window.gapi.load('client:auth2', this.initClient)
  }

  initClient = () => {
    window.GoogleAuth = null
    gapi.client.init({
        'apiKey': 'AIzaSyD8qqvO9gccmAy7VKcm4Bwft6VAqCD_mHc',
        'clientId': '725287187728-3d92jf7im6s9hqegp9b3kh0i2c11jnj8.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtubepartner',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    }).then(() => {
        window.GoogleAuth = gapi.auth2.getAuthInstance()
        window.GoogleAuth.isSignedIn.listen(this.updateSigninStatus)
    })
  }

  updateSigninStatus = (isSignedIn) => {
    console.log('ISSIGNED UPDATE', isSignedIn)
  }

  render(){
    return null
  }
}
