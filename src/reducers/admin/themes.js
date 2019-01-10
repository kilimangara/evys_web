
import {
  getSubjectThemes,
  createSubjectTheme,
  updateTheme,
  getThemeTheory,
  createThemeTheory,
  getTheoryVideos,
  createTheoryVideo
} from '../../api'


export const loadThemes = (subjectId, params) => (dispatch) => {
  return getSubjectThemes(subjectId, params)
}

export const createTheme(subjectId, data) => (dispatch) => {
  return createSubjectTheme(subjectId, data)
}

export const changeTheme(themeId, data) => (dispatch) => {
  return updateTheme(themeId, data)
}

export const loadTheory = (themeId) => (dispatch) => {
  return getThemeTheory(themeId).then(response => {
    const {data} = response
    const theoryId = data.id
    if(!theoryId) return {
      theory: data,
      videos: []
    }
    return getTheoryVideos(theoryId).then((videosResponse) =>{
      const videos = videosResponse.data
      return {
        theory: data,
        videos
      }
    })
  })
}

export const addTheoryVideo = (theoryId, data) => (dispatch) => {
  return createTheoryVideo(theoryId, data)
}

// const initialState = {
//   fetching: false,
//
// }
//
//
// export default createReducer(
//   {
//
//   },
//
// )
