import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// const baseurl = import.meta.env.VITE_BASE_API_URL
const baseQuery = fetchBaseQuery({ baseUrl: '' })
const USER_URL = '/api';
export const homeDataSlice = createApi({
    baseQuery,
    tagTypes: ['HomeScreen'],
    endpoints: (builder) => ({
        homeData: builder.query({
            query: () => ({
                url: `${USER_URL}`,
                method: 'GET',
            })
        })
    })
});

export const { useHomeDataQuery } = homeDataSlice;
