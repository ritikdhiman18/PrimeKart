import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from '../Reducers/features.js'
const originURL = `${BASE_URL}/api`

const getAllProducts = async () => {
    const response = await axios.get(`${originURL}/products`, { withCredentials: true });
    return response.data;
};

const getProduct = async (id) => {
    const response = await axios.get(`${originURL}/products/${id}`, { withCredentials: true });
    return response.data;
};

const getProductsByQuery = async ({ search, category, minPrice, maxPrice, page }) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    if (minPrice) params.append('price[gte]', minPrice);
    if (maxPrice) params.append('price[lt]', maxPrice);
    if (page) params.append('page', page);

    const response = await axios.get(`${originURL}/products?${params.toString()}`, { withCredentials: true });
    return response.data;
};

const addReview = async (data) => {
    const response = await axios.put(`${originURL}/product/review`, data, { withCredentials: true });
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