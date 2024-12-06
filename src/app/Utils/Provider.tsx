"use client";


import constate from 'constate';
import {useMemo, useState, useCallback, useEffect} from "react";
import axios, { AxiosError, AxiosResponse } from "axios";


export interface LoginData {
    username: string;
    password: string;
}



export const [MoovingProvider, useAuthentication] = constate(useLogin, value => value.authMethods);

function useLogin() {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [isLoading, setIsIsLoading] = useState<boolean>(false);
    const [errorLogin, setErrorLogin] = useState<string>("");
    const [hasLoginError, setHasLoginError] = useState<boolean>(false);



    function saveAuthData(token: string) : void
    {
        localStorage.setItem("mooving_token", token);
    }


    async function login (data: LoginData) : Promise<number | void>
    {
        try
        {
            const response: AxiosResponse = await axios.post("http://backend-reseau.ddns.net:8085/api/login", data);
            if (response?.status === 200)
            {
                setIsIsLoading(false);
                setIsLogged(true);
                setHasLoginError(false);
                saveAuthData(response?.data?.token);
                return 200;
            }
            setHasLoginError(true);
            setErrorLogin("Something went wrong, please try later !");
        }
        catch (error)
        {
            setIsIsLoading(false);
            setIsLogged(false);
            setHasLoginError(true);
            const requestError = error as AxiosError;
            if (requestError.status === 403)
            {
                setErrorLogin("Invalid username or password");
            }
            else
            {
                setErrorLogin("Something went wrong, please try later !");
            }
        }
    }


    const logout = useCallback(() => {
        setIsLogged(false);
        localStorage.removeItem('mooving_token');
    }, []);


    useEffect(() => {
        console.log("error", errorLogin);
        const token = localStorage.getItem('mooving_token');
        if (token)
        {
            setIsLogged(true);
        }
    }, [errorLogin]);


    const checkAuthStatus = useCallback(() => {
        const token = localStorage.getItem('mooving_token');
        if (token) {
            setIsLogged(true);
        }
    }, []);

    const authMethods = useMemo(() => ({
        login,
        logout,
        isLogged,
        isLoading,
        checkAuthStatus,
        hasLoginError,
        errorLogin,
        setIsLoading: setIsIsLoading
    }), [logout, setIsIsLoading, hasLoginError, errorLogin,isLogged, isLoading, checkAuthStatus]);

    return { authMethods };
}