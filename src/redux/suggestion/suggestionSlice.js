import { createSlice } from '@reduxjs/toolkit';

const suggestionSlice = createSlice({
    name: 'suggestions',
    initialState: {
        data: []
    },
    reducers: {
        setSuggestions: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const { setSuggestions } = suggestionSlice.actions;
export default suggestionSlice.reducer;