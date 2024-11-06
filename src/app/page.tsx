"use client";
import Image from "next/image";
import {useRouter} from "next/navigation";
import logo from "../../public/networkLogo.png";

const LoginPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side - Login Form */}
        <div className="rounded-lg w-full max-w-[26rem] mx-auto">
          <div className="ml-[-38px] mb-[-20px]">
            <Image src={logo} alt={"App logo"} className="w-72 h-36 ml-5" />
          </div>

          <h1 className="text-4xl font-bold mb-1">Sign In</h1>
          <p className="text-gray-600 mb-6">Please enter your details</p>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              onClick={() => {
                router.push("/availableTrips");
              }}>
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
    </div>
  );
};

export default LoginPage;
