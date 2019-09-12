import React from 'react'
import SaveButton from '../../../components/common/SaveButton'
import List from '@material-ui/core/List'
import { ListHeader, ListText, Card } from './index'
import ListItem from '@material-ui/core/ListItem'
import Icon from '@material-ui/core/Icon'
import EvysQuill from '../../../components/quill/EvysQuill'
import styled from 'styled-components'
import { BorderedImage } from '../../../components/styled/common'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { theme } from '../../../utils/global_theme'

const ColoredButton = styled(Button)`
    background-color: ${({ disabled }) => (!disabled ? theme.ACCENT_COLOR : theme.ACCENT_COLOR_A(0.5))};
    color: white;
`

const VideoName = styled(Typography)`
    margin-left: 6px;
`

const ListItemContainer = styled.div`
    padding-left: 8px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin-top: 12px;
`

class TheoryView extends React.Component {
    changeTheoryText = newText => {
        const newTheoryObj = { ...this.props.theory, text: newText }
        this.props.updateTheory(newTheoryObj)
    }

    saveTheory = () => {
        this.props.theorySaved().then(() => this.saveButton.success())
    }

    formatImageUrl = video => {
        const { youtubeVideo } = video
        const vParam = new URL(youtubeVideo).searchParams.get('v')
        return `http://img.youtube.com/vi/${vParam}/sddefault.jpg`
    }

    goToAddVideo = () => {
        this.props.goToAddVideo && this.props.goToAddVideo()
    }

    addVideoText = () => {
        const { theory, youtubeSigned } = this.props
        if (!theory.id)
            return 'Для добавления видео контента обязательно нужно текстовое описание(теория) для этой темы'
        if (!youtubeSigned) return 'Войдите в свой youtube аккаунт для добавления видео'
        return 'Выбрать видео для добавления'
    }

    addButtonEnabled = () => {
        const { theory, youtubeSigned } = this.props
        return theory.id && youtubeSigned
    }

    renderVideo = (video, index) => {
        return (
            <ListItem key={video.id} divider className="test-cases-for-filter">
                <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemContainer>
                            <BorderedImage width={'150px'} height={'90px'} image={this.formatImageUrl(video)} />
                            <VideoName component={'span'}>{video.name}</VideoName>
                        </ListItemContainer>
                        <IconButton>
                            <Icon>delete</Icon>
                        </IconButton>
                    </div>
                </div>
            </ListItem>
        )
    }

    render() {
        const { theory, videos, youtubeSigned } = this.props
        if (!theory) return null
        return (
            <Container>
                <Card>
                    <EvysQuill value={theory.text} onChangeText={this.changeTheoryText} />
                    <SaveButton ref={ref => (this.saveButton = ref)} onClick={this.saveTheory} />
                </Card>
                <Card marginTop={12}>
                    <List
                        ref={ref => (this.list = ref)}
                        subheader={
                            <ListHeader component="div" className="ignore-drag" disableSticky>
                                Видео
                            </ListHeader>
                        }
                        component="ul"
                    >
                        {videos.map(this.renderVideo)}
                        <div style={{ marginLeft: 16, marginTop: 8 }}>
                            <ColoredButton
                                type="contained"
                                margin="normal"
                                onClick={this.goToAddVideo}
                                disabled={!this.addButtonEnabled()}
                            >
                                {this.addVideoText()}
                            </ColoredButton>
                        </div>
                    </List>
                </Card>
            </Container>
        )
    }
}

export default TheoryView
