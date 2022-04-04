import React from 'react';
import { useData } from '../../contexts/dataContext';

const Home = () => {
  const { playlists } = useData();
  return (
      <>
        hi           
      Home
       { JSON.stringify(playlists) } 
      {/* <button onClick={() => getUsersAttempt()} >hit login</button> */}
      <button onClick={addList} >hit add</button>
      </>
  );
}

export default Home;