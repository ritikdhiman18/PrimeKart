import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Slices/Reducers/authSlice';
import rootReducer from '../Slices/Reducers/features';
import { productSlice } from '../Slices/productSlice';
import { apiSlice } from '../Slices/apiSlice';
import { homeDataSlice } from '../Slices/homeScreenSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        ...rootReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [productSlice.reducerPath]: productSlice.reducer,
        [homeDataSlice.reducerPath]: homeDataSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, productSlice.middleware),
    devTools: true,
});

export default store;
