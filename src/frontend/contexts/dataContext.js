import React, { createContext , useContext , useReducer, useState } from 'react';
import { handleAllFilters , initialFilters} from '../services/filters';
import axios from 'axios';

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [ videos , setVideos] = useState([]);

    axios.get('/api/videos')
        .then( (response) => { 
            let pureVideos = response.data.videos;
            let initialVideos = pureVideos.map(video => {
            return { ...video, isliked : false , isAddedToWatchLater : false }; 
                })
            setVideos(initialVideos);
            })
    .catch((error) => console.log(error) );
 
    const configureFilters = (state, action) => {
        switch(action.type) {
            case 'category' : 
                return { ...state, category : action.payload };
            default :
                return { ...state};
        }
    }

    const [filtersState,filtersDispatcher] = useReducer(configureFilters,initialFilters);

    const filteredVideos = handleAllFilters(videos , filtersState);


    return (
        <DataContext.Provider value={{ filtersState, filtersDispatcher, filteredVideos }}>
          { children }
        </DataContext.Provider>
    );
}

const useData = () => useContext(DataContext);

export { useData , DataProvider };