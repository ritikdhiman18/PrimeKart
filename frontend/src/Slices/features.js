import { createSlice } from "@reduxjs/toolkit";

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

export const { setSearchQuery, setFilters } = querySlice.actions;
export const { setIsLoginOpen, setIsSignupOpen } = dialogSlice.actions;
const rootReducer = {
    search: querySlice.reducer,
    dialog: dialogSlice.reducer
};
export default rootReducer;