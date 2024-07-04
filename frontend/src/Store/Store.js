import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slices/authSlice';

import { apiSlice } from '../Slices/apiSlice';
import { productSlice } from '../Slices/productSlice';
import rootReducer from '@/Slices/features';


const store = configureStore({
    reducer: {
        auth: authReducer,
        ...rootReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [productSlice.reducerPath]: productSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, productSlice.middleware),
    devTools: true,
});

export default store;
