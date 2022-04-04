import React , {useEffect , useState} from 'react';
import { useAuth } from './frontend/contexts/authContext';
import { loginAction } from './frontend/services/auth';
import { addPlaylist, getPlaylist , removePlaylist , addVideoToPlaylist , removeVideoFromPlaylist } from './frontend/services/playlist';
import './App.css';  
import { getAllVideos } from './frontend/services/video';
import { getHistory , addToHistory , removeFromHistory , clearHistory } from './frontend/services/history';
import { getLikes , addToLikes , removeFromLikes } from './frontend/services/like';
import { getWatchLater , addToWatchLater , removeFromWatchLater } from './frontend/services/watchLater';
import { useData } from './frontend/contexts/dataContext';

function App() {
  const { state , dispatcher } = useAuth();
  const [videos , setVideos] = useState([])
  const { filtersState , filteredVideos , filtersDispatcher } = useData();


  const LI = async () => {
    let actionResponse;
    try {
        actionResponse = await loginAction({email: "adarshbalika@gmail.com", password: "adarshBalika123"});
        let { foundUser , encodedToken } = actionResponse.loginResponse.data;
        console.log({ foundUser , encodedToken },'got data')
        dispatcher({ type: 'login' , payload : { foundUser , encodedToken }});
    } catch(error) {
        console.log('in catch');
        actionResponse = error;
        console.log(actionResponse);
    }
  }

  const LO = () => {
    dispatcher({ type: 'logout'});
  }

  const AP = async (myToken) => {
    const response = await addPlaylist(myToken);
    console.log(response);
    dispatcher({ 
      type: 'addPlaylist' , 
      payload : { ...state.foundUser , playlists : response.actionResponse.data.playlists }   
    }); 
  }

  const RP = async (myToken , playListId) => {
    const response = await removePlaylist(myToken , playListId);
    console.log(response);
    dispatcher({ 
      type: 'removePlaylist' , 
      payload : { ...state.foundUser , playlists : response.actionResponse.data.playlists }   
    }); 
  }

  const GH = async (myToken) => {
    const response = await getHistory(myToken);
    console.log(response);
  }

  const ATH = async (myToken , videoDetails) => {
    const response = await addToHistory(myToken , videoDetails);
    console.log(response , 'returned response');
    dispatcher({ 
      type: 'addVideoToHistory' , 
      payload : { ...state.foundUser , history : response.actionResponse.data.history }   
    });
  }

  const RFH = async (myToken , videoId) => {
    const response = await removeFromHistory(myToken , videoId);
    console.log(response);
    dispatcher({ 
      type: 'addVideoToHistory' , 
      payload : { ...state.foundUser , history : response.actionResponse.data.history }   
    });
  }

  const CH = async (myToken) => {
    const response = await clearHistory(myToken);
    console.log(response);
    dispatcher({ 
      type: 'clearHistory' , 
      payload : { ...state.foundUser , history : response.actionResponse.data.history }   
    }); 
  }

  const GL = async (myToken) => {
    const response = await getLikes(myToken);
    console.log(response);
  }

  const ATL = async (myToken , videoDetails) => {
    const response = await addToLikes(myToken , videoDetails);
    console.log(response);
    dispatcher({ 
      type: 'addVideoToLikes' , 
      payload : { ...state.foundUser , likes : response.actionResponse.data.likes }   
    });
  }

  const RFL = async (myToken, videoId) => {
    const response = await removeFromLikes(myToken, videoId);
    console.log(response);
    dispatcher({ 
      type: 'removeVideoFromLikes' , 
      payload : { ...state.foundUser , likes : response.actionResponse.data.likes }   
    });
  }

  const GWL = async (myToken) => {
    const response = await getWatchLater(myToken);
    console.log(response);
  }

  const ATWL = async (myToken , videoDetails) => {
    const response = await addToWatchLater(myToken , videoDetails);
    console.log(response);
    dispatcher({ 
      type: 'addVideoToWatchLater' , 
      payload : { ...state.foundUser , watchlater : response.actionResponse.data.watchlater }   
    });
  }

  const RFWL = async (myToken , videoId) => {
    const response = await removeFromWatchLater(myToken , videoId);
    console.log(response);
    dispatcher({ 
      type: 'removeVideoFromWatchLater' , 
      payload : { ...state.foundUser , watchlater : response.actionResponse.data.watchlater }   
    });
  }

  const AVTP = async ( myToken , playListId , videoDetails ) => {
    const response = await addVideoToPlaylist(myToken, playListId, videoDetails);
    console.log(response);
    if(response) {
        const response = await getPlaylist(myToken);
        console.log(response);  
        dispatcher({ 
          type: 'addVideoToPlaylist' , 
          payload : { ...state.foundUser , playlists : response.actionResponse.data.playlists }   
        }); 
    } 
  }

  const RVFP = async ( myToken , playListId , videoId ) => {
    const response = await removeVideoFromPlaylist(myToken, playListId, videoId);
    console.log(response);
    if(response) {
        const response = await getPlaylist(myToken);
        console.log(response);  
        dispatcher({ 
          type: 'removeVideoFromPlaylist' , 
          payload : { ...state.foundUser , playlists : response.actionResponse.data.playlists }   
        }); 
    } 
  }

  useEffect(() => {

    const getVid = async () => {
      const response = await getAllVideos();
      setVideos(response.actionResponse.data.videos);
    }
    getVid();
  } , [])

  return (
    
    <div className="App">
    <div className="btn-wrapper">  
    { JSON.stringify(state) }

    </div>
    {/* <button onClick={() => gethistory()}> History </button> */}
    <div className='btn-wrapper'>
    <button 
     onClick={() => LI()}
    > Log In </button>
    <button 
     onClick={() => LO()}
    > Log Out </button>
    </div>

    <div className='btn-wrapper' >
    Playlists
    
    { state.foundUser  ?  
    
    state.foundUser.playlists.map( list => ( 
    <p> { list._id }  | { JSON.stringify(list.videos) } |  { list.title} | { list.description }
    <button 
     onClick={() => RP(state.encodedToken , list._id)}
    > Add Playlist </button>
    </p> )) : ''  }
     
    </div>

    <div className='btn-wrapper'>
    <button 
     onClick={() => AP(state.encodedToken)}
    > Add Playlist </button>
    {/* <button 
     onClick={() => GP(state.encodedToken)}
    > Get Playlist </button> */}
    </div>
    <div className='btn-wrapper'>
     { videos.map((x) => <p> { x._id } | {x.title} 
         { state.foundUser ? 
         state.foundUser.playlists.map( list => ( 
         <>
         <button onClick={ () => AVTP(state.encodedToken , list._id , x)} > 
         { list.title } +  
         </button>
         <button onClick={ () => RVFP(state.encodedToken , list._id , x._id)} > 
         { list.title } -  
         </button>
         </>
         )) 
         : ''}
     <button onClick={ () => ATH(state.encodedToken , x )}>Add Video To History</button>
     <button onClick={ () => RFH(state.encodedToken , x._id )}>Remove Video From History</button>
     <button onClick={ () => ATL(state.encodedToken , x )}>Add To Likes</button>
     <button onClick={ () => RFL(state.encodedToken , x._id )}>Remove From Likes</button>
     <button onClick={ () => ATWL(state.encodedToken , x )}>Add To Watch Later</button>
     <button onClick={ () => RFWL(state.encodedToken , x._id )}>Remove From Watch Later</button>
     </p> ) }
    </div>

    <div className='btn-wrapper'>         
         <button onClick={() => GH(state.encodedToken)} >Get User History</button>
         <button onClick={() => CH(state.encodedToken) } >Clear User History</button>
    </div>

    <div className='btn-wrapper'>         
         <button onClick={() => GL(state.encodedToken)}>Get User Likes</button>
    </div>

    <div className='btn-wrapper'>         
         <button onClick={() => GWL(state.encodedToken)}>Get User Likes</button>
    </div>

    <div className='btn-wrapper'>         
     { JSON.stringify(filteredVideos) }
    </div>

    <div className='btn-wrapper'>
    <label> Anuglar
            <input onChange={() => filtersDispatcher({ type: 'category', payload: { ...filtersState.category , angular: !filtersState.category.angular } })} type='checkbox' name='angular' checked={filtersState.category.angular} /> 
            </label> 
            <label> Vue
            <input onChange={() => filtersDispatcher({ type: 'category', payload: { ...filtersState.category , vue: !filtersState.category.vue } })} type='checkbox' name='vue' checked={filtersState.category.vue} /> 
            </label>
            <label> Node
            <input onChange={() => filtersDispatcher({ type: 'category', payload: { ...filtersState.category , node: !filtersState.category.node } })} type='checkbox' name='node' checked={filtersState.category.node} /> 
            </label>
            <label> React
            <input onChange={() => filtersDispatcher({ type: 'category', payload: { ...filtersState.category , react: !filtersState.category.react } })} type='checkbox' name='react' checked={filtersState.category.react} /> 
            </label>
            <label> Svelte
            <input onChange={() => filtersDispatcher({ type: 'category', payload: { ...filtersState.category , svelte: !filtersState.category.svelte } })} type='checkbox' name='svelte' checked={filtersState.category.svelte} /> 
            </label>
    </div>
    
   </div>

  );
}

export default App;
