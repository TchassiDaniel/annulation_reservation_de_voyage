"use client";

import Image from "next/image";
import logo from "../../../public/networkLogo.png";
import Link from "next/link";
import {FaBus, FaHistory} from "react-icons/fa";
import { FaHome} from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const navLink = [
    {
      name: "Available Trips",
      Link: "/availableTrips",
      icon: FaHome,
    },
    {
      name: "Scheduled Trips",
      Link: "/scheduledTrips",
      icon: FaBus,
    },
    {
      name: "Coupons",
      Link: "/coupons",
      icon: FaTicketAlt,
    },
    {
      name: "Statistics",
      Link: "/statistics",
      icon: AiOutlineBarChart,
    },
    {
      name: "History",
      Link: "/history",
      icon: FaHistory,
    },
  ];

  const pathname = usePathname();

  return (
    <div className="flex flex-col mt-4 mr-2 w-[210px] max-lg:w-full">
      <Image
        src={logo}
        alt={"App logo"}
        className="w-48 h-24 ml-4 max-lg:ml-0"
      />

      <nav className="mt-3 ml-6 ">
        <ul className="space-y-6">
          {navLink.map((link, index) => {
            const IconComponent = link.icon;
            const isActive = pathname.startsWith(link.Link);
            return (
              <li
                key={index}
                className={
                  isActive
                    ? "bg-reservation-color p-3 rounded-lg text-base-color"
                    : ""
                }>
                <Link href={link.Link} className="flex gap-4">
                  {IconComponent && (
                    <IconComponent
                      className={
                        isActive
                          ? "text-white text-xl "
                          : "text-gray-800 text-xl"
                      }
                    />
                  )}
                  <p className="max-lg:hidden">{link.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}