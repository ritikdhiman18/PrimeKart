import axios from "axios";
import { BASE_URL } from "../Reducers/features";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const addCartItem = async (data) => {
    const res = await axios.post(`${BASE_URL}/api/add-to-cart`, data, {
        withCredentials: true
    });
    return res.data;
};
const updatecart = async (data) => {
    const res = await axios.post(`${BASE_URL}/api/updateCart`, data, {
        withCredentials: true
    });
    return res.data;
};

const getCartItems = async () => {
    const res = await axios.get(`${BASE_URL}/api/cartItems`, {
        withCredentials: true
    });
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
