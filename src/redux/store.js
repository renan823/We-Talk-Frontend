import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

//reducers
import languageSlice from './languages/languageSlice';
import authSlice from './auth/authSlice';
import imageSlice from './image/imageSlice';
import followersSlice from './followers/followersSlice';
import suggestionSlice from './suggestion/suggestionSlice';

import axios from 'axios';
import { setLanguages } from './languages/languageSlice';
import { setFollowers } from './followers/followersSlice';
import { setSuggestions } from './suggestion/suggestionSlice';
import request from '../services/request';


export const store = configureStore({
    reducer: {
        auth: authSlice,
        languages: languageSlice,
        image: imageSlice,
        followers: followersSlice,
        suggestions: suggestionSlice
    },
    middleware: [thunk]
});

//thunk actions
export const fetchLanguages = () => {
    return async (dispatch) => {
        const { data, status } = await request('GET', 'language/all');
        console.log(data)
        dispatch(setLanguages(data.languages));
    };
};

export const fecthFollowers = () => {
    return async (dispatch) => {
        const { data, status } = await request('GET', 'user/followers');
        dispatch(setFollowers(data.followers));
    };
}

export const fecthSuggestions = () => {
    return async (dispatch) => {
        const { data, status } = await request('GET', 'user/feed');
        dispatch(setSuggestions(data.suggestions));
    }
}