import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chats',
    initialState: {
        data: []
    },
    reducers: {
        setChats: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const { setChats } = chatSlice.actions;
export default chatSlice.reducer;