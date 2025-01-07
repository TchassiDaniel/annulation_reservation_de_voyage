'use client';

import  { useState } from 'react';
import {ChevronDown, ChevronUp} from 'lucide-react';
import {usePathname} from "next/navigation";
import Link from "next/link";
import {linkList} from "@/Utils/ClientNavLink";







export default function Sidebar() {


    const activeLink = usePathname();
    const [expandedLinks, setExpandedLinks] = useState({});


    function toggleSubMenu  (linkName)
    {
        setExpandedLinks(prev => ({
            ...prev,
            [linkName]: !prev[linkName]
        }));
    }


    function renderLink(item, index, isSubLink = false)
    {
        const IconComponent = item.icon;
        const isActive = activeLink.startsWith(item.link);
        const hasSubLinks = item.subLinks && item.subLinks.length > 0;



        return (
            <div key={index}>
                {!hasSubLinks ? (
                    <Link className={`transition-all duration-400 flex p-3 items-center cursor-pointer ${isActive ? "bg-white rounded-l-full mb-2 mt-2" : "hover:bg-white/20 hover:rounded-l-full"} ${isSubLink ? "ml-4" : "ml-5"}`}
                          href={item.link}
                    >
                        {IconComponent && (
                            <IconComponent
                                className={isActive ? "text-black text-xl mr-3" : "text-xl mr-3 text-white"}
                            />
                        )}
                        <p className={isActive ? "text-black font-bold text-md" : "text-md font-bold text-white"}>
                            {item.name}
                        </p>
                    </Link>
                ) : (
                    <div
                        className="transition-all duration-400 flex p-3.5 items-center cursor-pointer ml-5 hover:bg-white/20 hover:rounded-l-full"
                        onClick={() => toggleSubMenu(item.name)}
                    >
                        {IconComponent && (
                            <IconComponent
                                className={isActive ? "text-black text-xl mr-3" : "text-xl mr-3 text-white"}
                            />
                        )}
                        <p className={isActive ? "text-black font-bold text-md" : "text-md font-bold text-white"}>
                            {item.name}
                        </p>
                        {hasSubLinks && (expandedLinks[item.name] ? (
                                <ChevronUp className={`ml-auto ${isActive ? "text-black" : "text-white"}`}/>
                            ) : (
                                <ChevronDown className={`ml-auto ${isActive ? "text-black" : "text-white"}`}/>
                            )
                        )}
                    </div>
                )
                }
                {hasSubLinks && !expandedLinks[item.name] && (
                    <div className="ml-8 mt-2">
                        {item.subLinks.map((subItem, subIndex) => renderLink(subItem, subIndex, true))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            <div
                className="w-[15%] fixed h-screen bg-gradient-to-r from-blue-500 to-reservation-color flex flex-col overflow-y-auto scrollbar">
                <h1 className="text-3xl font-bold ml-6 mb-10 mt-7 text-white">
                    Mooving.com
                </h1>
                <nav className="flex flex-col space-y-1.5 mb-2 ">
                    {linkList.map((item, index) => renderLink(item, index))}
                </nav>
            </div>
        </div>

    )
}

