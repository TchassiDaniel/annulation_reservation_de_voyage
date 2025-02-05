"use client";

import "../globals.css"
import Sidebar from "@/components/Sidebar"
import NavBar from "@/components/ClientNavBar"
import { useState } from "react"

const metadata = {
    title: "Mooving.com",
    description: "Powered by 4GI students",
}

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <NavBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-4">{children}</main>
            </div>
        </div>
    )
}

