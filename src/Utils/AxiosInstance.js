import axios from "axios";




const token = localStorage.getItem("mooving_token");


const axiosInstance = axios.create(
    {
        baseURL: 'http://85.214.142.178:8085/api/',
        headers:
            {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
    }
);


export default axiosInstance;