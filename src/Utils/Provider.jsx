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
    const [userData, setUserData] = useState({
        userId :"",
        nom : "",
        prenom :"",
        username: "",
        telNumber: "",
        role: "",
        address: "",
        idcoordonneeGPS: ""
    });



    function saveAuthData(_token)
    {
        const token = _token.substring(7, _token.length);
        localStorage.setItem("mooving_app_token", token);
    }


    async function login (data)
    {
        try
        {
            const response= await axios.post("http://85.214.142.178:8085/api/utilisateur/connexion", data);
            //const response = await axios.post("https://tchassidaniel-voyage-service--8080.prod1a.defang.dev/api/utilisateur/connexion", data);
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
        localStorage.removeItem('mooving_app_token');
        window.location.href = "/";
    }, []);




    function isAuthenticated()
    {
        return isLogged;
    }


    useEffect(() => {
        const token = localStorage.getItem("mooving_app_token");
        async function fetchUserData()
        {
            if (token)
            {
                try {
                    {
                        const response = await axios.get(`http://85.214.142.178:8085/api/utilisateur/profil/${token}`);
                        //const response = await axios.get(`https://tchassidaniel-voyage-service--8080.prod1a.defang.dev/api/utilisateur/profil/${token}`);
                        if (response.status === 200)
                        {
                            console.log(response.data);
                            setUserData(response.data);
                            setIsLogged(true);
                        }
                    }
                }
                catch (error)
                {
                    console.log(error);
                    setIsLogged(false);
                    setUserData({});
                }
            }
        }
        fetchUserData();
    }, []);



    const authMethods = useMemo(() => ({
        login,
        logout,
        isLogged,
        isLoading,
        hasLoginError,
        errorLogin,
        setIsLoading,
        isAuthenticated,
        userData
    }), [userData, logout, setIsLoading, hasLoginError, errorLogin, isAuthenticated, isLoading, isAuthenticated, login]);

    return { authMethods };
}