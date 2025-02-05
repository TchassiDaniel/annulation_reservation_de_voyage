"use client"
import { FaCog, FaEnvelope, FaSignOutAlt } from "react-icons/fa"
import { Tooltip } from "antd"
import userIcon from "../../public/userIcon.png"
import Image from "next/image"
import { useAuthentication } from "@/Utils/Provider"
import { Menu } from "lucide-react"

export default function NavBar({ onMenuClick }) {
    const { logout, userData } = useAuthentication()

    const applyNavLinkBtnStyle = () => {
        return "w-10 h-10 flex justify-center items-center rounded-full shadow-md hover:bg-reservation-color text-reservation-color text-xl hover:text-white transition-all duration-300"
    }

    return (
        <div className="border-b-2 border-gray-300 p-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <button className="lg:hidden mr-4 text-gray-600" onClick={onMenuClick}>
                        <Menu size={24} />
                    </button>
                    <h1 className="text-xl lg:text-3xl font-bold truncate">
                        Welcome Back {userData?.prenom + " " + userData?.nom}!
                    </h1>
                </div>
                <div className="flex items-center space-x-2 lg:space-x-4">
                    <div className="hidden lg:flex space-x-2">
                        <Tooltip placement="top" title="Settings">
                            <button className={applyNavLinkBtnStyle()}>
                                <FaCog />
                            </button>
                        </Tooltip>
                        <Tooltip placement="top" title="Messages">
                            <button className={applyNavLinkBtnStyle()}>
                                <FaEnvelope />
                            </button>
                        </Tooltip>
                    </div>
                    <Tooltip placement="top" title="LogOut">
                        <button
                            onClick={() => {
                                logout()
                            }}
                            className="w-10 h-10 flex justify-center items-center rounded-full shadow-md bg-red-400 text-white text-xl hover:bg-white hover:text-red-500 transition-all duration-300"
                        >
                            <FaSignOutAlt />
                        </button>
                    </Tooltip>
                    <div className="flex items-center">
                        <p className="hidden lg:block font-bold text-secondary text-xl mr-2">Profile</p>
                        <Image
                            src={userIcon || "/placeholder.svg"}
                            alt="user-icon"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

