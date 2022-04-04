import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJlNmVmNjJhNC1kMjQ3LTRkMzMtYWQyMS1hZjNlNWE1YWE2ZDciLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.bmZNLWFVI9qopbfO1Bo6RQXE5wApEHriojA-w-2PjUw';
    
const getPlaylist = async (myToken) => {
          let actionResponse = {};
          let actionSuccess = false;
          console.log('inside get playlist now');
          try {
              const response = await axios.get("/api/user/playlists", { headers: { authorization: myToken }});
              actionResponse = response;
              actionSuccess = true;
          } catch(error) {
              console.log('get playlist failed');
              actionSuccess = false;
          }
          console.log('outta trycatch wishlist');
      return { actionResponse , actionSuccess };
}

const addPlaylist = async (myToken) => {
    let playListData = { playlist: {title: "foo", description:"bar bar bar" } };
    let actionResponse = {};
    let actionSuccess = false;
    console.log('inside add wishlist now');
    try {
        const response = await axios.post("/api/user/playlists" , playListData , { headers: { authorization: myToken }} );
        actionResponse = response;
        actionSuccess = true;
    } catch(error) {
        console.log('add list failed')
        actionSuccess = false;
    }
    console.log('outta trycatch list')
    return { actionResponse , actionSuccess };
}

const removePlaylist = async (myToken , playListId) => {
    let actionResponse = {};
    let actionSuccess = false;
    console.log('inside reove playlist now');
    try {
        const response = await axios.delete(`/api/user/playlists/${playListId}` , { headers: { authorization: myToken }} );
        actionResponse = response;
        actionSuccess = true;
    } catch(error) {
        console.log('remove list failed')
        actionSuccess = false;
    }
    console.log('outta trycatch remove list')
    return { actionResponse , actionSuccess };
}

const addVideoToPlaylist = async (myToken , playlistId, videoDetails) => {
    let actionResponse = {};
    let actionSuccess = false;
    console.log('inside add video to playlist now');
    try {
        const response = await axios.post(`/api/user/playlists/${playlistId}`, { video : videoDetails } , { headers: { authorization: myToken }});
        actionResponse = response;
        actionSuccess = true;
    } catch(error) {
        console.log('add video to playlist failed');
        actionSuccess = false;
    }
    console.log('outta trycatch add video to playlist');
    return actionSuccess ;
  }
  
  const removeVideoFromPlaylist = async (myToken , playListId, videoId) => {
    console.log(videoId);
    let actionResponse = {};
    let actionSuccess = false;
    console.log('inside remove video from playlists now');
    try {
        const response = await axios.delete(`/api/user/playlists/${playListId}/${videoId}`, { headers: { authorization: myToken }});
        actionResponse = response;
        actionSuccess = true;
    } catch(error) {
        console.log('remove video form playlists failed');
        actionSuccess = false;
    }
    console.log('outta trycatch remove video from playlists');
    return actionSuccess ;
  }




export { getPlaylist , addPlaylist , removePlaylist , addVideoToPlaylist , removeVideoFromPlaylist };


  