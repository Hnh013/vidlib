import axios from 'axios';

const getWatchLater = async (myToken) => {
          let actionResponse = {};
          let actionSuccess = false;
          console.log('inside get watch later now');
          try {
              const response = await axios.get("/api/user/watchlater", { headers: { authorization: myToken }});
              actionResponse = response;
              actionSuccess = true;
          } catch(error) {
              console.log('get watchlater failed');
              actionSuccess = false;
          }
          console.log('outta trycatch get watch later');
      return { actionResponse , actionSuccess };
}

const addToWatchLater = async (myToken , videoDetails) => {
  let actionResponse = {};
  let actionSuccess = false;
  console.log('inside add to watch later');
  try {
      const response = await axios.post("/api/user/watchlater", { video : videoDetails } , { headers: { authorization: myToken }});
      actionResponse = response;
      actionSuccess = true;
  } catch(error) {
      console.log('add to watch later failed');
      actionSuccess = false;
  }
  console.log('outta trycatch add to watch later');
  return { actionResponse , actionSuccess };
}

const removeFromWatchLater = async (myToken , videoId) => {
  console.log(videoId);
  let actionResponse = {};
  let actionSuccess = false;
  console.log('inside remove from watch later now');
  try {
      const response = await axios.delete(`/api/user/watchlater/${videoId}`, { headers: { authorization: myToken }});
      actionResponse = response;
      actionSuccess = true;
  } catch(error) {
      console.log('remove from watch later failed');
      actionSuccess = false;
  }
  console.log('outta trycatch remove from watch later');
  return { actionResponse , actionSuccess };
}


export { getWatchLater , addToWatchLater , removeFromWatchLater };