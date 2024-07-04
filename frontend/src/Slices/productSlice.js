import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseurl = import.meta.env.VITE_BASE_API_URL
const baseQuery = fetchBaseQuery({ baseUrl: baseurl })
const USER_URL = '/api';

export const productSlice = createApi({
    reducerPath: "productSlice",
    baseQuery,
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getAllproducts: builder.query({
            query: () => ({
                url: `${USER_URL}/products`,
                method: 'GET',
            }),
        }),
        getProduct: builder.query({
            query: (id) => ({
                url: `${USER_URL}/products/${id}`,
                method: 'GET',
            }),
        }),
        getProductsByQuery: builder.query({
            query: ({ search, category, minPrice, maxPrice, page }) => {
                const params = new URLSearchParams();
                if (search) params.append('search', search);
                if (category) params.append('category', category);
                if (minPrice) params.append('price[gte]', minPrice);
                if (maxPrice) params.append('price[lt]', maxPrice);
                if (page) params.append('page', page);

                return {
                    url: `${USER_URL}/products?${params.toString()}`,
                    method: 'GET',
                };
            },
        }),
        addReview: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/product/review`,
                method: 'PUT',
                body: data
            }),
        }),
        updateReviews: builder.query({
            query: (id) => ({
                url: `${USER_URL}/product/reviews?id=${id}`,
                method: 'GET',
            }),
        })

    }),
});

export const { useGetAllproductsQuery, useGetProductQuery, useGetProductsByQueryQuery, useAddReviewMutation, useUpdateReviewsQuery } = productSlice;
