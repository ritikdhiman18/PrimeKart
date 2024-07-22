import { createSlice } from "@reduxjs/toolkit";
export const BASE_URL = import.meta.env.VITE_BASE_API_URL;
const initialState = {
    searchQuery: '',
    filters: {
        category: '',
        minPrice: null,
        maxPrice: null,
        page: 1
    },
};
const initialStatedialog = {
    isLoginOpen: false,
    isSignupOpen: false
};
const initialStatedLoading = {
    isLoading: false
};

const querySlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },

    },
});
const dialogSlice = createSlice({
    name: 'dialog',
    initialState: initialStatedialog,
    reducers: {
        setIsLoginOpen: (state, action) => {
            state.isLoginOpen = action.payload;
        },
        setIsSignupOpen: (state, action) => {
            state.isSignupOpen = action.payload;
        },
    }
});
const loadingSlice = createSlice({
    name: 'Loading',
    initialState: initialStatedLoading,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { setSearchQuery, setFilters } = querySlice.actions;
export const { setIsLoginOpen, setIsSignupOpen } = dialogSlice.actions;
export const { setLoading } = loadingSlice.actions;
const rootReducer = {
    search: querySlice.reducer,
    dialog: dialogSlice.reducer,
    loading: loadingSlice.reducer,
};
export default rootReducer;