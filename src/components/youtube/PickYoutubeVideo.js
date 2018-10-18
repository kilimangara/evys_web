import React from 'react'
import HoverPaper from '../common/HoverPaper'
import InfiniteScroll from 'react-infinite-scroller'
import { GridList } from 'material-ui/GridList'

export default class PickYoutubeVideo extends React.Component {
    state = {
        nextPageToken: null,
        items: []
    }

    STATUS_MAP = {
        public: 'Доступно всем',
        private: 'Ограниченный доступ',
        unlisted: 'Доступ по ссылке'
    }

    videoClicked = item => {
        const url = `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`
        this.props.videoPicked(item.snippet.title, url)
    }

    renderItem = (item, index) => {
        return (
            <div key={index} onClick={this.videoClicked.bind(this, item)}>
                <HoverPaper style={{ height: 250 }}>
                    <img src={item.snippet.thumbnails.medium.url} width={'100%'} height={120} />
                    <div style={{ padding: 8 }}>
                        <p style={styles.titleStyle}>{item.snippet.title}</p>
                        <p style={styles.secTextStyle}>{this.STATUS_MAP[item.status.privacyStatus]}</p>
                    </div>
                </HoverPaper>
            </div>
        )
    }

    loadPage = async page => {
        const { playlistId } = this.props
        const { nextPageToken } = this.state
        const response = (await window.gapi.client.youtube.playlistItems.list({
            part: 'snippet, contentDetails, status',
            playlistId,
            maxResults: 10,
            pageToken: nextPageToken
        })).result
        this.setState({
            items: this.state.items.concat(response.items),
            nextPageToken: response.nextPageToken
        })
    }

    render() {
        if (!this.props.playlistId) return null
        let hasMore = Boolean(this.state.nextPageToken) || !this.state.items.length
        return (
            <div style={styles.container}>
                <InfiniteScroll hasMore={hasMore} initialLoad pageStart={0} loadMore={this.loadPage}>
                    <GridList padding={12} cellHeight={250} cols={5} style={styles.gridList}>
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
        overflowY: 'auto'
    },
    titleStyle: {
        color: 'black',
        fontSize: 16
    },
    secTextStyle: {
        color: 'rgba(35,35,35, 1)',
        fontSize: 12
    }
}
