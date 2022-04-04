import axios from 'axios';

export const loginAction = async (credentials) => {
    let loginSuccess = false;
    let loginResponse;
    await axios.post('/api/auth/login/', credentials).then((response) => {
      loginResponse = response;
      loginSuccess = true;
    }).catch((error) => {
        console.log('in catch');
        loginResponse = error;
        console.log(loginResponse);
        loginSuccess = false;
    });
    return {loginResponse , loginSuccess};
}

// export const fetchUsersAction = async () => {
//   let actionSuccess = false;
//   let actionResponse;
//   try {
//       console.log('in try');
//       actionResponse = await axios.get('/api/auth/user');
//       console.log(actionResponse);
//   } catch(error) {
//     console.log('in catch');
//       actionResponse = error.response;
//       console.log(actionResponse);
//       actionSuccess = false;
//   }
//   return actionSuccess;
// }




