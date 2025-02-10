'use client';
import axios from "axios";


let token = null;
if (typeof window !== "undefined")
{
    token = localStorage.getItem("mooving_app_token");
}

const axiosInstance = axios.create(
    {
        //baseURL: 'http://85.214.142.178:8085/api',
        baseURL: 'https://tchassidaniel-voyage-service--8080.prod1b.defang.dev/api',
        headers:
            {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
    }
);


export default axiosInstance;


