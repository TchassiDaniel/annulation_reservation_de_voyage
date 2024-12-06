"use client";
import Image from "next/image";
import logo from "../../public/logoMoovingProject.png";
import React from "react";
import {LoginData, useAuthentication} from "@/app/Utils/Provider"
import {useRouter} from "next/navigation";
import WaitForPageLoad from "@/components/loginComponents/waitForPageLoad";

const LoginPage: React.FC = () => {

  const router = useRouter();
  const {login, hasLoginError, errorLogin, isLoading ,setIsLoading} = useAuthentication();


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>)
  {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const data : LoginData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string
    }
    const response  : number | void = await login(data) ;
    if (response === 200)
    {
      router.push("/availableTrips");
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side - Login Form */}
        <div className="rounded-lg w-full max-w-[26rem] mx-auto">
          <div className="ml-[-38px]">
            <Image src={logo} alt={"App logo"} className="w-56 h-28 ml-5" />
          </div>


          <div className="flex justify-between">

            <h1 className="text-4xl font-bold mb-1">Sign In</h1>



          </div>

          <form className={`${!hasLoginError && "mt-6"} space-y-6`} onSubmit={handleSubmit}>
            <div>
              {hasLoginError && (<p className="text-red-500 font-bold text-xl mt-3 mb-4"> {errorLogin}</p>)}
              <label className="block text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name = "username"
                id = "username"
                placeholder="Enter your username"
                className="w-full px-4 py-2 rounded border-2 border-gray-300 focus:border-reservation-color focus:outline-0 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name = "password"
                id = "password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded border-2 border-gray-300 focus:border-reservation-color focus:outline-0 transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-reservation-color text-white py-2 px-4 rounded hover:bg-blue-800 transition-all duration-200">
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            {"Don't have an account ?  "}
            <a href="#" className="text-blue-500 hover:underline">
              {"  Sign up"}
            </a>
          </p>
        </div>

        {/* Right side - Dashboard Preview */}
        <div className="hidden md:block h-screen w-full sticky top-0">
          <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/img_dashboard.jpg"
              width={600}
              height={100}
              alt="Dashboard Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      {!isLoading && <WaitForPageLoad/>}
    </div>
  );
};

export default LoginPage;
