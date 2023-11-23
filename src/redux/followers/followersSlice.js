import { createSlice } from '@reduxjs/toolkit';

const followersSlice = createSlice({
    name: 'followers',
    initialState: {
        data: []
    },
    reducers: {
        setFollowers: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const { setFollowers } = followersSlice.actions;
export default followersSlice.reducer;