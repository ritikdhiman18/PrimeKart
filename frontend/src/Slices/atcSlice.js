import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseurl = import.meta.env.VITE_BASE_API_URL
const baseQuery = fetchBaseQuery({ baseUrl: baseurl, credentials: 'include' })
const USER_URL = '/api';
export const atcSlice = createApi({
    baseQuery,
    tagTypes: ['add-To-Cart'],
    endpoints: (builder) => ({

        addCartItem: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/add-to-cart`,
                method: 'POST',
                body: data
            })
        }),
        getCartItems: builder.mutation({
            query: () => ({
                url: `${USER_URL}/cartItems`,
                method: 'GET',
            })
        })
    })
});

export const { useAddCartItemMutation, useGetCartItemsMutation } = atcSlice;
