import axios from 'axios';

const getLikes = async (myToken) => {
          let actionResponse = {};
          let actionSuccess = false;
          console.log('inside get likes now');
          try {
              const response = await axios.get("/api/user/likes", { headers: { authorization: myToken }});
              actionResponse = response;
              actionSuccess = true;
          } catch(error) {
              console.log('get likes failed');
              actionSuccess = false;
          }
          console.log('outta trycatch get likes');
      return { actionResponse , actionSuccess };
}

const addToLikes = async (myToken , videoDetails) => {
  let actionResponse = {};
  let actionSuccess = false;
  console.log('inside add to likes now');
  try {
      const response = await axios.post("/api/user/likes", { video : videoDetails } , { headers: { authorization: myToken }});
      actionResponse = response;
      actionSuccess = true;
  } catch(error) {
      console.log('add to likes failed');
      actionSuccess = false;
  }
  console.log('outta trycatch add to likes');
  return { actionResponse , actionSuccess };
}

const removeFromLikes = async (myToken , videoId) => {
  console.log(videoId);
  let actionResponse = {};
  let actionSuccess = false;
  console.log('inside remove from likes now');
  try {
      const response = await axios.delete(`/api/user/likes/${videoId}`, { headers: { authorization: myToken }});
      actionResponse = response;
      actionSuccess = true;
  } catch(error) {
      console.log('remove from likes failed');
      actionSuccess = false;
  }
  console.log('outta trycatch remove from likes');
  return { actionResponse , actionSuccess };
}


export { getLikes , addToLikes , removeFromLikes };