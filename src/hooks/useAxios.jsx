import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://style-decor-server-mkbq.onrender.com'
})

const useAxios = () => {
    return axiosPublic;
};

export default useAxios;