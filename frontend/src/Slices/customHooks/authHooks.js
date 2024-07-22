import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { BASE_URL } from '../Reducers/features';

const login = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/users/auth`, data, {
        withCredentials: true,
    });
    return response.data;
};

const register = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/users`, data, {
        withCredentials: true,
    });
    return response.data;
};

const logout = async () => {
    const response = await axios.post(`${BASE_URL}/api/users/logout`, {}, {
        withCredentials: true,
    });
    return response.data;
};

const updateUser = async (data) => {
    const response = await axios.put(`${BASE_URL}/api/users/profile`, data, {
        withCredentials: true,
    });
    return response.data;
};

export const useLoginMutation = () => useMutation({
    mutationFn: login
});
export const useRegisterMutation = () => useMutation({
    mutationFn: register
});
export const useLogoutMutation = () => useMutation({
    mutationFn: logout
});
export const useUpdateUserMutation = () => useMutation({
    mutationFn: updateUser
});
