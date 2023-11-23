import { createSlice } from '@reduxjs/toolkit';

const langaugeSlice = createSlice({
    name: 'languages',
    initialState: {
        data: [],
        speak: [],
        learn: []
    },
    reducers: {
        setLanguages: (state, action) => {
            state.data = action.payload;
        },
        setLearn: (state, action) => {
            state.learn = action.payload;
        },
        setSpeak: (state, action) => {
            state.speak = action.payload;
        }
    }
});

export const { setLanguages, setLearn, setSpeak } = langaugeSlice.actions;
export default langaugeSlice.reducer;