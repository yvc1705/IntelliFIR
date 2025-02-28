import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "light",
    user: null,
    token: null,
    officer: null,
};

export const jwtSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setOfficerLogin: (state, action) => {
            state.officer = action.payload.user; // expects `user`
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.officer = null; // Clear officer state on logout
            state.token = null;
        },
    },
});

export const { setLogin, setLogout, setOfficerLogin } = jwtSlice.actions;

export default jwtSlice.reducer;
