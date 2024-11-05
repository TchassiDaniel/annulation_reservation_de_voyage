import {Sidebar} from "@/components/dashbord/sidebar";
import {Footer} from "@/components/footer/footer";


export default function Layout( {children}: Readonly<{ children: React.ReactNode; }>)
{
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex">
                <div className="fixed h-screen w-1/5 border-r-2 border-gray-200">
                    <Sidebar/>
                </div>
                <div className="w-full ml-[20%] flex flex-col">
                    {/* <div className="h-24 bg-gradient-to-r from-blue-300 to-pink-400"></div> */}
                    {children}
                </div>
            </div>
            <div className="bottom-0">
                <Footer/>
            </div>
        </div>


    );
}
