import { SAVE_YOUTUBE_DATA, CLEAR_YOUTUBE_DATA } from '../../modules/youtube'

export function saveYoutubeData(channelId, uploadPlaylistId){
  return {
    type: SAVE_YOUTUBE_DATA,
    channelId,
    uploadPlaylistId
  }
}

export function clearYoutubeData(){
  return {
    type: CLEAR_YOUTUBE_DATA
  }
}
