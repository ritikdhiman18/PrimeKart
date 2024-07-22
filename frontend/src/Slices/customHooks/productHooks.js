import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../config/axiosConfig.js';

const getAllProducts = async () => {
    const response = await axiosInstance.get(`/api/products`);
    return response.data;
};

const getProduct = async (id) => {
    const response = await axiosInstance.get(`/api/products/${id}`);
    return response.data;
};

const getProductsByQuery = async ({ search, category, minPrice, maxPrice, page }) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    if (minPrice) params.append('price[gte]', minPrice);
    if (maxPrice) params.append('price[lt]', maxPrice);
    if (page) params.append('page', page);

    const response = await axiosInstance.get(`/api/products?${params.toString()}`);
    return response.data;
};

const addReview = async (data) => {
    const response = await axiosInstance.put(`/api/product/review`, data);
    return response.data;
};

// ==================================================================================================================
export const useGetAllProductsQuery = () => {
    return useQuery({ queryKey: ['allProducts'], queryFn: getAllProducts });
};

export const useGetProductQuery = (id) => {
    return useQuery({ queryKey: ['product', id], queryFn: () => getProduct(id) });
};

export const useGetProductsByQuery = (params) => {
    return useQuery({ queryKey: ['productsByQuery', params], queryFn: () => getProductsByQuery(params) });
};

export const useAddReviewMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addReview,
        onSuccess: () => {
            queryClient.invalidateQueries(['product']);
        },
    });
};