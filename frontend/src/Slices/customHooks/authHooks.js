import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../config/axiosConfig';

const login = async (data) => {
    const response = await axiosInstance.post(`/api/users/auth`, data);
    return response.data;
};

const register = async (data) => {
    const response = await axiosInstance.post(`/api/users`, data, {
        withCredentials: true,
    });
    return response.data;
};

const logout = async () => {
    const response = await axiosInstance.post(`/api/users/logout`, {});
    return response.data;
};

const updateUser = async (data) => {
    const response = await axiosInstance.put(`/api/users/profile`, data);
    return response.data;
};
// ------------------------------------------------------------------------------------------------------
export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries(['cartItems']);
        },
    })
};

export const useRegisterMutation = () => useMutation({
    mutationFn: register
});
export const useLogoutMutation = () => useMutation({
    mutationFn: logout
});

export const useUpdateUserMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries(['cartItems']);
        }
    })
};
