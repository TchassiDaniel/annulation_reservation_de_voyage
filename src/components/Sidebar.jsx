"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { linkList } from "@/Utils/ClientNavLink"

export default function Sidebar({ isOpen, setIsOpen }) {
    const activeLink = usePathname();
    const [expandedLinks, setExpandedLinks] = useState({});

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize)
    }, [setIsOpen])


    function toggleSubMenu(linkName) {
        setExpandedLinks((prev) => ({
            ...prev,
            [linkName]: !prev[linkName],
        }))
    }

    function renderLink(item, index, isSubLink = false) {
        const IconComponent = item.icon
        const isActive = activeLink.startsWith(item.link)
        const hasSubLinks = item.subLinks && item.subLinks.length > 0

        return (
            <div key={index}>
                {!hasSubLinks ? (
                    <Link
                        className={`transition-all duration-400 flex p-3 items-center cursor-pointer ${isActive ? "bg-white rounded-l-full mb-2 mt-2" : "hover:bg-white/20 hover:rounded-l-full"} ${isSubLink ? "ml-4" : "ml-5"}`}
                        href={item.link}
                        onClick={() => setIsOpen(false)}
                    >
                        {IconComponent && (
                            <IconComponent className={isActive ? "text-black text-xl mr-3" : "text-xl mr-3 text-white"} />
                        )}
                        <p className={isActive ? "text-black font-bold text-md" : "text-md font-bold text-white"}>{item.name}</p>
                    </Link>
                ) : (
                    <div
                        className="transition-all duration-400 flex p-3.5 items-center cursor-pointer ml-5 hover:bg-white/20 hover:rounded-l-full"
                        onClick={() => toggleSubMenu(item.name)}
                    >
                        {IconComponent && (
                            <IconComponent className={isActive ? "text-black text-xl mr-3" : "text-xl mr-3 text-white"} />
                        )}
                        <p className={isActive ? "text-black font-bold text-md" : "text-md font-bold text-white"}>{item.name}</p>
                        {hasSubLinks &&
                            (expandedLinks[item.name] ? (
                                <ChevronUp className={`ml-auto ${isActive ? "text-black" : "text-white"}`} />
                            ) : (
                                <ChevronDown className={`ml-auto ${isActive ? "text-black" : "text-white"}`} />
                            ))}
                    </div>
                )}
                {hasSubLinks && expandedLinks[item.name] && (
                    <div className="ml-8 mt-2">
                        {item.subLinks.map((subItem, subIndex) => renderLink(subItem, subIndex, true))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden ${isOpen ? "block" : "hidden"}`}
                onClick={() => setIsOpen(false)}
            ></div>
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-r from-blue-500 to-reservation-color transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
            >
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-2xl font-bold text-white">Mooving.com</h1>
                    <button className="lg:hidden text-white" onClick={() => setIsOpen(false)}>
                        <X size={24} />
                    </button>
                </div>
                <nav className="mt-8">{linkList.map((item, index) => renderLink(item, index))}</nav>
            </aside>
        </>
    )
}

