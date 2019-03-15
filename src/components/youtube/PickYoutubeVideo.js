import React from 'react'
import HoverPaper from '../common/HoverPaper'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'
import GridList from '@material-ui/core/GridList'

const GridWrapper = styled.div`
    @media screen and (min-width: 0px) and (max-width: 750px) {
        max-width: 250px;
    }
    @media screen and (min-width: 750px) and (max-width: 1075px) {
        max-width: 750px;
    }
    @media screen and (min-width: 1075px) and (max-width: 1505px) {
        max-width: 1075px;
    }
    @media screen and (min-width: 1505px) and (max-width: 1935px) {
        max-width: 1505px;
    }
    @media screen and (min-width: 1935px) {
        max-width: 1935px;
    }
    width: 5000px;
    display: flex;
    overflowy: auto;
    flex-wrap: wrap;
    flex-direction: row;
`

const Container = styled.div`
    display: flex;
    width: 100%;
    padding: 12px;
    justify-content: center;
    flex-direction: center;
    align-items: center;
`

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
            <div
                key={index}
                onClick={this.videoClicked.bind(this, item)}
                style={{ margin: '18px 6px', cursor: 'pointer' }}
            >
                <HoverPaper style={{ height: 240, width: 200 }}>
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
        console.log(this)
        if (!this.props.playlistId) return null
        let hasMore = Boolean(this.state.nextPageToken) || !this.state.items.length
        return (
            <Container>
                <InfiniteScroll hasMore={hasMore} initialLoad pageStart={0} loadMore={this.loadPage}>
                    <GridWrapper>{this.state.items.map(this.renderItem)}</GridWrapper>
                </InfiniteScroll>
            </Container>
        )
    }
}

const styles = {
    titleStyle: {
        color: 'black',
        fontSize: 16
    },
    secTextStyle: {
        color: 'rgba(35,35,35, 1)',
        fontSize: 12
    }
}
