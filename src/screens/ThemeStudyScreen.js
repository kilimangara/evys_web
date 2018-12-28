import React, { Component } from 'react'
import connect from "react-redux/es/connect/connect";
import { loadThemeById, loadTheoryByThemeId} from "../actions/CoursesActions";
import {HorizontalCentered} from "../components/styled/common";
import {ThemeStudyTextBlock} from "../components/styled/themes";
import {ThemeStudyTheoryItem} from "../components/themes/ThemeStudyTheoryItem";
import VideoIcon from '@material-ui/icons/videocam'

class ThemeStudyScreen extends Component {
    state = {
        theme: null,
        theory: null
    }

    componentDidMount(){
        const themeId = this.props.match.params['theme_id'];
        Promise.all([this.props.loadThemeById(themeId), this.props.loadTheoryByThemeId(themeId)]).then(responses =>{
            this.setState({theme: responses[0].data.data, theory: responses[1].data.data})
        })

    }

    createMarkup = (markup) => {
        return {__html: markup};
    }

    render() {
        const {theory} = this.state;
        console.log(theory)
        return (
        <HorizontalCentered direction={'column'}>
            <ThemeStudyTextBlock>
                <div dangerouslySetInnerHTML={theory && theory.text && this.createMarkup(theory.text)} />
            </ThemeStudyTextBlock>
            <ThemeStudyTheoryItem alias={"Видео1"} iconComponent={<VideoIcon/>}/>
        </HorizontalCentered>
        )
    }
}

const mapStateToProps = state => ({})

export default connect(
    mapStateToProps,
    { loadTheoryByThemeId, loadThemeById}
)(ThemeStudyScreen)
