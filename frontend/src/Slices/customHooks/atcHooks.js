import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../config/axiosConfig";


const addCartItem = async (data) => {
    const res = await axiosInstance.post(`/api/add-to-cart`, data);
    return res.data;
};

const updatecart = async (data) => {
    const res = await axiosInstance.post(`/api/updateCart`, data);
    return res.data;
};

const getCartItems = async () => {
    const res = await axiosInstance.get(`/api/cartItems`);
    return res.data;
};

// ---------------------------------------------------------------------------------------------------------
export const useAddCartItemMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addCartItem,
        onSuccess: () => {
            queryClient.invalidateQueries(['cartItems']);
        },
    });
};
export const useUpdateCartMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updatecart,
        onSuccess: () => {
            queryClient.invalidateQueries(['cartItems']);
        },
    });
};

export const useGetCartItems = (enabled) => {
    return useQuery({
        queryKey: ['cartItems'],
        queryFn: getCartItems,
        enabled: enabled,
    });
};
