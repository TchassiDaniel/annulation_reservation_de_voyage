import "../globals.css"
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/ClientNavBar";



export const metadata = {
    title: "Mooving.com",
    description: "Powered by 4GI students",
};

export default function Layout({ children }) {


    return (
        <div>
            <div className="flex">
                <Sidebar/>
                <div className="flex-1 min-h-screen bg-white overflow-x-hidden ml-[15%]">
                    <NavBar/>
                    {children}
                </div>
            </div>
        </div>
    );
}
