import {AiOutlineBarChart} from "react-icons/ai";
import {FaBus, FaHistory, FaHome, FaTicketAlt} from "react-icons/fa";
import {BsFillCalendarCheckFill, BsFillCalendarXFill} from "react-icons/bs";

export const linkList = [

    {
        name: "Available Trips",
        link: "/available-trips",
        icon: FaHome,
    },
    {
        name: "Scheduled Trips",
        link: "/scheduled-trips",
        icon: FaBus,
    },
    {
        name: "Coupons",
        link: "/coupons",
        icon: FaTicketAlt,
    },
    {
        name: "Statistics",
        link: "/statistics",
        icon: AiOutlineBarChart,
    },
    {
        name: "History",
        icon: FaHistory,
        subLinks: [
            {
                icon: BsFillCalendarCheckFill,
                name: "Reservation",
                link: '/history/reservation',

            },
            {
                icon: BsFillCalendarXFill,
                name: "Cancellation",
                link: '/history/cancellation',
            }
        ]
    },
];

