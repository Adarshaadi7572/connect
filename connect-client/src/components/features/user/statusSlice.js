import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loginStatus: false, // Initial state for login status
};

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        // Define your reducer functions here
        login: (state) => {
            state.loginStatus = !state.loginStatus; // Toggle the login status
        },
    },
});

// Export the action
export const { login } = statusSlice.actions;

// Export the reducer
export default statusSlice.reducer;
