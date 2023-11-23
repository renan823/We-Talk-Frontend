import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        signed: false,
        id: null
    },
    reducers: {
        setAuth: (state, action) => {
            const { user, signed, id } = action.payload;

            state.user = user;
            state.signed = signed;
            state.id = id;
        },
        setLogout: (state, action) => {
            state.user = null;
            state.signed = false;
            state.id = null;
        }
    }
});

export const { setAuth, setLogout } = authSlice.actions;
export default authSlice.reducer;