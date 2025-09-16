import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice'; 
import tenantReducer from '../redux/slices/tenantApiSlice';
import profileReducer from '../redux/slices/tenantApiSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        tenant: tenantReducer,
        profile: profileReducer,
    }
});

export default store;
