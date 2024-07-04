import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const baseurl = import.meta.env.VITE_BASE_API_URL
const baseQuery = fetchBaseQuery({ baseUrl: baseurl })
const USER_URL = '/api/users';
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST',
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data
            })
        })
    })
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = apiSlice;
