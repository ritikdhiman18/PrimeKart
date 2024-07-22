import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slices/Reducers/authSlice';
import rootReducer from '../Slices/Reducers/features';


const store = configureStore({
    reducer: {
        auth: authReducer,
        ...rootReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(),
    devTools: true,
});

export default store;
