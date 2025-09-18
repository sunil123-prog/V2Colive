import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice'; 
import tenantReducer from '../redux/slices/tenantApiSlice';
import profileReducer from '../redux/slices/tenantApiSlice';
import roomReducer from '../redux/slices/roomSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        tenant: tenantReducer,
        profile: profileReducer,
        rooms: roomReducer,
    }
});

export default store;
