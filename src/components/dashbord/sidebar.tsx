"use client";

import Image from "next/image";
import logo from "../../../public/networkLogo.png";
import Link from "next/link";
import { FaBus, FaHistory, FaHome, FaTicketAlt } from "react-icons/fa";
import { AiOutlineBarChart } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export function Sidebar() {
  const [isHistoryMenuOpen, setIsHistoryMenuOpen] = useState(false); // État pour le sous-menu History
  const historyMenuRef = useRef<HTMLLIElement>(null); // Référence pour le sous-menu

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
  ];

  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        historyMenuRef.current &&
        !historyMenuRef.current.contains(event.target as Node)
      ) {
        setIsHistoryMenuOpen(false); // Ferme le menu si on clique à l'extérieur
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col mt-4 mr-2 w-[210px] max-lg:w-full relative">
      <Image
        src={logo}
        alt={"App logo"}
        className="w-48 h-24 ml-4 max-lg:ml-0"
      />

      <nav className="mt-3 ml-6">
        <ul className="space-y-6">
          {navLink.map((link, index) => {
            const IconComponent = link.icon;
            const isActive = pathname.startsWith(link.Link);
            return (
              <li
                key={index}
                className={`p-3 rounded-lg ${
                  isActive ? "bg-blue-500 text-white" : ""
                }`}
              >
                <Link href={link.Link} className="flex gap-4 items-center">
                  {IconComponent && (
                    <IconComponent
                      className={`text-xl ${
                        isActive ? "text-white" : "text-gray-800"
                      }`}
                    />
                  )}
                  <p className="max-lg:hidden">{link.name}</p>
                </Link>
              </li>
            );
          })}

          <li
            className="relative flex items-center"
            ref={historyMenuRef} // Référence pour le sous-menu
          >
            <button
              className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-blue-100"
              onClick={() => setIsHistoryMenuOpen(!isHistoryMenuOpen)}
            >
              <FaHistory className="text-gray-800 text-xl" />
              <p className="max-lg:hidden">History</p>
              <span className="ml-auto text-gray-500">
                {isHistoryMenuOpen ? "▲" : "▼"}
              </span>
            </button>

            {isHistoryMenuOpen && (
              <ul className="absolute left-full top-0 flex flex-col space-y-2 bg-white border border-gray-200 rounded-lg shadow-md p-2">
                <li>
                  <Link
                    href="/reservation"
                    className={`block px-4 py-2 rounded-lg ${
                      pathname.startsWith("/history/reservation")
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-100 text-gray-800"
                    }`}
                    onClick={() => setIsHistoryMenuOpen(false)}
                  >
                    Reservations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/annulation"
                    className={`block px-4 py-2 rounded-lg ${
                      pathname.startsWith("/history/annulation")
                        ? "bg-blue-500 text-white"
                        : "hover:bg-blue-100 text-gray-800"
                    }`}
                    onClick={() => setIsHistoryMenuOpen(false)}
                  >
                    Annulations
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
