import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';
import statusSlice from '../features/user/statusSlice'
export const store = configureStore({
    reducer:{
        user:userSlice,
        status:statusSlice, 
    }
})