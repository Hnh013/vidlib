import axios from 'axios';

const getHistory = async (myToken) => {
          let actionResponse = {};
          let actionSuccess = false;
          console.log('inside get history now');
          try {
              const response = await axios.get("/api/user/history", { headers: { authorization: myToken }});
              actionResponse = response;
              actionSuccess = true;
          } catch(error) {
              console.log('get history failed');
              actionSuccess = false;
          }
          console.log('outta trycatch gethist');
      return { actionResponse , actionSuccess };;
}

const addToHistory = async (myToken , videoDetails) => {
  let actionResponse = {};
  let actionSuccess = false;
  console.log('inside add to history now');
  try {
      const response = await axios.post("/api/user/history", { video : videoDetails } , { headers: { authorization: myToken }});
      actionResponse = response;
      actionSuccess = true;
  } catch(error) {
      console.log('add to history failed');
      actionSuccess = false;
  }
  console.log('outta trycatch add to hist');
return { actionResponse , actionSuccess };;
}

const removeFromHistory = async (myToken , videoId) => {
  console.log(videoId);
  let actionResponse = {};
  let actionSuccess = false;
  console.log('inside remove from history now');
  try {
      const response = await axios.delete(`/api/user/history/${videoId}`, { headers: { authorization: myToken }});
      actionResponse = response;
      actionSuccess = true;
  } catch(error) {
      console.log('remove from history failed');
      actionSuccess = false;
  }
  console.log('outta trycatch remove from hist');
return { actionResponse , actionSuccess };;
}

const clearHistory = async (myToken) => {
  let actionResponse = {};
  let actionSuccess = false;
  console.log('inside clear history now');
  try {
      const response = await axios.delete(`/api/user/history/all`, { headers: { authorization: myToken }});
      actionResponse = response;
      actionSuccess = true;
  } catch(error) {
      console.log('clear history failed');
      actionSuccess = false;
  }
  console.log('outta trycatch clear hist');
return { actionResponse , actionSuccess };;
}

export { getHistory , addToHistory , removeFromHistory , clearHistory };