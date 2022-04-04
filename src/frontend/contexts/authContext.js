import React, { useContext , createContext, useReducer } from 'react';

const AuthContext = createContext();

const user = { foundUser: null , encodedToken : null };

const AuthProvider = ({children}) => {

    const userDispatcher = (state, action) => {
        switch(action.type) {
            case 'login': 
                return { ...state, ...action.payload };
            case 'logout':
                return { ...state , ...user };
            case 'addPlaylist':
                return { ...state , foundUser : action.payload };
            case 'removePlaylist':
                return { ...state , foundUser : action.payload };
            case 'addVideoToPlaylist':
                return { ...state , foundUser : action.payload };
            case 'removeVideoFromPlaylist':
                return { ...state , foundUser : action.payload };
            case 'addVideoToHistory':
                return { ...state , foundUser : action.payload };
            case 'removeVideoFromHistory':
                return { ...state , foundUser : action.payload };
            case 'clearHistory':
                return { ...state , foundUser : action.payload };
            case 'addVideoToLikes':
                return { ...state , foundUser : action.payload };
            case 'removeVideoFromLikes':
                return { ...state , foundUser : action.payload };
            case 'addVideoToWatchLater':
                return { ...state , foundUser : action.payload };
            case 'removeVideoFromWatchLater':
                return { ...state , foundUser : action.payload };
            default:
                return { ...state};
        }
    }


    const [state,dispatcher] = useReducer(userDispatcher,user);

    return (
        <AuthContext.Provider value={{ state , dispatcher }}>
            { children }
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { useAuth , AuthProvider };
