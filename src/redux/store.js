import { configureStore } from '@reduxjs/toolkit';

//reducers
import languageSlice from './languages/languageSlice';
import authSlice from './auth/authSlice';
import imageSlice from './image/imageSlice';
import followersSlice from './followers/followersSlice';
import suggestionSlice from './suggestion/suggestionSlice';
import chatSlice from './chat/chatSlice';


export const store = configureStore({
    reducer: {
        auth: authSlice,
        languages: languageSlice,
        image: imageSlice,
        followers: followersSlice,
        suggestions: suggestionSlice,
        chats: chatSlice
    }
});