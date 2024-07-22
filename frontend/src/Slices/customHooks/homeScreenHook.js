import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from '../Reducers/features';

const fetchHomeData = async () => {
    const response = await axios.get(`${BASE_URL}/api`, {
        withCredentials: true,
    });
    return response.data;
};

export const useHomeData = () => {
    return useQuery({
        queryKey: ['homeData'],
        queryFn: fetchHomeData,
    });
};
