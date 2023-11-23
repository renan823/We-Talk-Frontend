import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
    name: 'image',
    initialState: {
        data: null
    },
    reducers: {
        setImage: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setImage } = imageSlice.actions;
export default imageSlice.reducer;