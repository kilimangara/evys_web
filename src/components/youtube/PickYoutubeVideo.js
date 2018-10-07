import React from 'react'
import HoverPaper from '../common/HoverPaper'
import InfiniteScroll from 'react-infinite-scroller'
import { GridList } from 'material-ui/GridList'

export default class PickYoutubeVideo extends React.Component {

  state = {
    nextPageToken: null,
    items: []
  }

  renderItem = (item, index) => {
    return (
      <div key={index}>
        <HoverPaper style={{height:200}}>
          <img src={item.snippet.thumbnails.medium.url} width={'100%'} height={120}/>
          <p style={styles.titleStyle}>{item.snippet.title}</p>
        </HoverPaper>
      </div>
    )
  }

  loadPage = async (page) => {
    const {playlistId} = this.props
    const {nextPageToken} = this.state
    const response = (await window.gapi.client.youtube.playlistItems.list({part: 'snippet',
                                                                           playlistId,
                                                                           maxResults: 10,
                                                                           pageToken: nextPageToken
                                                                           
                                                                         })).result
    this.setState({
      items: this.state.items.concat(response.items),
      nextPageToken: response.nextPageToken
    })
  }

  render(){
    if(!this.props.playlistId) return null
    let hasMore = Boolean(this.state.nextPageToken) || !this.state.items.length
    return(
      <div style={styles.container}>
        <InfiniteScroll hasMore={hasMore} initialLoad pageStart={0} loadMore={this.loadPage}>
          <GridList padding={12} cellHeight={200} cols={5} style={styles.gridList}>
            {this.state.items.map(this.renderItem)}
          </GridList>
        </InfiniteScroll>
      </div>
    )
  }

}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    padding: 12
  },
  gridList: {
    overflowY: 'auto',
  },
  titleStyle: {
    color: 'black',
    fontSize: 16
  }
}
