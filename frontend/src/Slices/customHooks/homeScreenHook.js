import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosConfig";

const fetchHomeData = async () => {
    const response = await axiosInstance.get(`/api`);
    return response.data;
};

export const useHomeData = () => {
    return useQuery({
        queryKey: ['homeData'],
        queryFn: fetchHomeData,
    });
};
