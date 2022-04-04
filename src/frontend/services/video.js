import axios from 'axios';

const getAllVideos = async () => {
          let actionResponse = {};
          let actionSuccess = false;
          console.log('inside get videos now');
          try {
              const response = await axios.get("/api/videos");
              actionResponse = response;
              actionSuccess = true;
          } catch(error) {
              console.log('get videos failed');
              actionSuccess = false;
          }
          console.log('outta trycatch video fetch');
    return { actionResponse , actionSuccess };
}

export { getAllVideos };