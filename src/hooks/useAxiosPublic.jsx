import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const baseURL = apiURL.includes('localhost') ? apiURL.replace('https://', 'http://') : apiURL;

const axiosPublic = axios.create({
    baseURL
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
