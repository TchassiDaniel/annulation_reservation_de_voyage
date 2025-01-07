"use client";


import constate from 'constate';
import {useMemo, useState, useCallback, useEffect} from "react";
import axios from "axios";





export const [MoovingProvider, useAuthentication] = constate(useLogin, value => value.authMethods);

function useLogin() {
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorLogin, setErrorLogin] = useState("");
    const [hasLoginError, setHasLoginError] = useState(false);



    function saveAuthData(_token)
    {
        const token = _token.substring(7, _token.length);
        console.log("token, token");
        localStorage.setItem("mooving_token", token);
    }


    async function login (data)
    {
        try
        {
            const response= await axios.post("http://85.214.142.178:8085/api/utilisateur/connexion", data);
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
            if (error.status === 403)
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
        window.location.href = "/";
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
    }), [logout, setIsLoading, hasLoginError, errorLogin, isAuthenticated, isLoading, isAuthenticated, login]);

    return { authMethods };
}