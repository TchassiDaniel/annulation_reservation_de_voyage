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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorLogin, setErrorLogin] = useState<string>("");
    const [hasLoginError, setHasLoginError] = useState<boolean>(false);



    function saveAuthData(_token: string) : void
    {
        const token = _token.substring(7, _token.length);
        console.log("token, token");
        localStorage.setItem("mooving_token", token);
    }


    async function login (data: LoginData) : Promise<number | void>
    {
        try
        {
            const response: AxiosResponse = await axios.post("http://backend-reseau.ddns.net:8085/api/utilisateur/connexion", data);
            if (response?.status === 200)
            {
                setIsLoading(false);
                setIsLogged(true);
                setHasLoginError(false);
                saveAuthData(response?.data);
                return 200;
            }
            setHasLoginError(true);
            setErrorLogin("Something went wrong, please try later !");
        }
        catch (error)
        {
            console.log(error);
            setIsLoading(false);
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
        const token = localStorage.getItem('mooving_token');
        if (token)
        {
            setIsLogged(true);
        }
    }, [errorLogin]);


    function isAuthenticated()
    {
        return isLogged;
    }

    const authMethods = useMemo(() => ({
        login,
        logout,
        isLogged,
        isLoading,
        hasLoginError,
        errorLogin,
        setIsLoading,
        isAuthenticated
    }), [logout, setIsLoading, hasLoginError, errorLogin,isLogged, isLoading, isAuthenticated]);

    return { authMethods };
}