import axios, {
    AxiosInstance,
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";




function AuthInterceptor(axiosInstance: AxiosInstance): void {
    axiosInstance.interceptors.request.use(
        (req: InternalAxiosRequestConfig) => {
            const token: null | string = localStorage.getItem("mooving_token");

            if (token) {
                if(req.headers)
                {
                    req.headers = req.headers || {};
                    req.headers.Authorization = `Bearer ${token}`;
                }
            }
            return req;
        },
        (err: AxiosError) => {
            return Promise.reject(err);
        }
    );
}


const ErrorInterceptor = (axiosInstance: AxiosInstance): void => {
    axiosInstance.interceptors.response.use(
        (res: AxiosResponse) => {
            return res;
        },
        (error: AxiosError) => {
            console.group("Error");
            console.log(error);
            console.groupEnd();

            return error.response;
        }
    );
};


const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.BACKEND_API_BASE_URL,
});


AuthInterceptor(axiosInstance);
ErrorInterceptor(axiosInstance);


export default axiosInstance;