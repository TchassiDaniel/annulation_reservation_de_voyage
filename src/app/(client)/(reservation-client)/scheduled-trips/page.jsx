'use client';

import React, {useEffect, useState} from "react";
import {AlertCircle, Building, Calendar, CheckCircle2, Clock, MapPin, Users, Wallet} from "lucide-react";
import {BsInfo} from "react-icons/bs";
import {MdCancel} from "react-icons/md";
import TripAnnulationModal from "@/app/(client)/(reservation-client)/scheduled-trips/TripAnnulationModal";
import {useRouter} from "next/navigation";
import {FaHouse} from "react-icons/fa6";
import {useAuthentication} from "@/Utils/Provider";
import axiosInstance from "@/Utils/AxiosInstance";
import {Tooltip} from "antd";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

// Données simulées mises à jour pour la prévisualisation
const mockReservation = {
    id: 1,
    reference: "RES123456",
    status: "Confirmed",
    class: "VIP",
    departure: "Douala",
    departureQuarter: "Akwa",
    arrival: "Yaoundé",
    arrivalQuarter: "Bastos",
    agencyName: "Finex Voyages",
    busRegistration: "CE 1234 AB",
    departureDate: "2024-01-15",
    departureTime: "13:00",
    paymentDeadline: "2024-01-14",
    price: 7000,
    amountPaid: 14000,
    totalAmount: 21000,
    cancellationPolicy: "Free cancellation up to 24 hours before departure. 50% refund for cancellations made less than 24 hours before departure.",
    passengers: [
        {
            id: "1",
            name: "John Doe",
            age: 35,
            gender: "Male",
            seatNumber: "23A",
            type: "Adult",
            idNumber: "ID123456",
            phone: "+237 123456789",
            email: "john@example.com",
            luggageCount: 2,
            ticketPrice: 7000
        },
        {
            id: "2",
            name: "Jane Doe",
            age: 32,
            gender: "Female",
            seatNumber: "23B",
            type: "Adult",
            idNumber: "ID789012",
            phone: "+237 987654321",
            email: "jane@example.com",
            luggageCount: 1,
            ticketPrice: 7000
        },
        {
            id: "3",
            name: "Alice Doe",
            age: 8,
            gender: "Female",
            seatNumber: "23C",
            type: "Child",
            idNumber: "ID345678",
            phone: "+237 567891234",
            email: "alice@example.com",
            luggageCount: 1,
            ticketPrice: 7000
        }
    ]
};

export default function Page() {


    const router = useRouter();
    const totalAmount = mockReservation.totalAmount;
    const remainingAmount = totalAmount - mockReservation.amountPaid;
    const paymentStatus = remainingAmount === 0 ? 'Paid' : 'Partial';
    const paymentPercentage = Math.round((mockReservation.amountPaid / totalAmount) * 100);
    const [myScheduledTrips, setMyScheduledTrips] =useState([]);
    const [canOpenTripDetailModal, setCanOpenTripDetailModal] = useState(false);
    const [canOpenTripAnnulationModal, setCanOpenTripAnnulationModal] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState({});
    const {userData} = useAuthentication();
    const [isLoading, setIsLoading] = useState(false);




    async function getMyScheduledTrips(userId)
    {
        setIsLoading(true);
        try
        {
            const response = await axiosInstance.get(`/reservation/${userId}`);
            setIsLoading(false);
            if(response.status === 200)
            {
                console.log(response.data);
            }
        }
        catch (error)
        {
            setIsLoading(false);
            console.log(error);

        }
    }


    useEffect(() => {
        if (userData)
        {
            getMyScheduledTrips(userData?.userId);
        }
    }, [userData]);




    return (
        <div className="min-h-screen p-4 ">
                <div className="bg-gray-100 rounded-lg mb-5">
                    <div className="mx-auto px-4 py-6">
                        <h1 className="text-3xl font-bold text-reservation-color">
                            My Booked Trips
                        </h1>
                        <p className="mt-2 text-md font-medium">
                            Manage your reservations, make your payments and track your upcoming
                            trips.
                        </p>
                    </div>
                </div>


            <div className="space-y-6">
                <div className=" rounded-xl border-2 border-gray-300 bg-gray-100 overflow-hidden">
                    {/* Header Section */}
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <MapPin className="text-reservation-color h-10 w-10"/>
                                <h3 className="text-lg font-semibold">
                                    {"Yaounde"} - {"Douala"}
                                </h3>
                            </div>

                            <div className="flex gap-2">
                                {mockReservation.status === "confirmed" ? (
                                    <span
                                        className="px-3 py-2 rounded-full text-sm font-medium bg-green-100 text-green-600 border-2 border-green-300 flex items-center gap-1">
                                          <CheckCircle2 className="h-4 w-4"/>
                                          Confirmed
                                        </span>
                                ) : (
                                    <span
                                        className="px-3 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-600 border-2 border-orange-300 flex items-center gap-1">
                                      <AlertCircle className="h-4 w-4"/>
                                      Waiting for confirmation
                                    </span>
                                )}
                                <span className="px-3 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-600 border-2 border-blue-300 flex items-center">
                                    {"VIP"}
                                </span>
                            </div>
                        </div>

                        <div className="ml-10 grid grid-cols-3 ">
                            {/* Left Column */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <FaHouse className="text-reservation-color h-5 w-5"/>
                                    <div>
                                        <p className="text-md text-gray-500">Transport agency</p>
                                        <p className="font-bold">{"General Voyages"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar className="text-reservation-color h-5 w-5"/>
                                    <div>
                                        <p className="text-md text-gray-500">Departure Date</p>
                                        <p className="font-bold">
                                            {"Mercredi 12 janvier 2025"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-3">

                                <div className="flex items-center gap-2">
                                    <Clock className="text-reservation-color h-5 w-5"/>
                                    <div>
                                        <p className="text-md text-gray-500">Departure Time</p>
                                        <p className="font-bold">{"12h30min"}</p>
                                    </div>
                                </div>


                                <div className="flex items-center gap-2">
                                    <AlertCircle className="text-reservation-color h-5 w-5"/>
                                    <div>
                                        <p className="text-md text-gray-500">Reservation Date</p>
                                        <p className="font-bold">{"Jeudi 15 avril 2025"}</p>
                                    </div>
                                </div>
                            </div>


                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Users className="text-reservation-color h-6 w-6"/>
                                    <div>
                                        <div className="flex gap-3">
                                            <p className="text-md text-gray-500">Passengers:</p>
                                            <p className="font-bold">{"3"}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <p className="text-md text-gray-500">Seats: </p>
                                            <p className="font-bold">{mockReservation.passengers.map(p => p.seatNumber).join(', ')}</p>
                                        </div>

                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <AlertCircle className="text-reservation-color h-5 w-5"/>
                                    <div>
                                        <p className="text-md text-gray-500">Payment Deadline</p>
                                        <p className="font-bold">{"Jeudi 15 avril 2025"}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="flex items-center justify-between  p-4">


                        <div className="bg-orange-50 rounded-lg border border-orange-200 w-[700px] p-4 ml-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Wallet className="h-5 w-5 text-orange-500"/>
                                    <div>
                                        <p className="font-medium text-orange-800">
                                            Amount remaining to be paid:{" "}
                                            8000
                                        </p>
                                        <p className="text-sm text-orange-600">
                                            on a total of 15000
                                            FCFA
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        alert("payment");
                                    }}
                                    className="px-4 py-2 bg-orange-500 font-bold text-white rounded-lg text-sm  hover:bg-orange-700 transition-colors">
                                    Complete payment
                                </button>
                            </div>
                        </div>


                        <div className={`${mockReservation?.status === "reserved" ? "mt-10" : ""} flex gap-3`}>
                            <button onClick={() => {router.push(`scheduled-trips/reservation/${mockReservation.id}`)}}
                                className="px-4 py-2 text-blue-600 hover:text-blue-800 border-2 border-blue-300 hover:bg-blue-300 font-medium rounded-lg bg-blue-100 transition-all duration-300 flex items-center gap-2">
                                <div className="border border-blue-600 rounded-full">
                                    <BsInfo className="h-6 w-6"/>
                                </div>
                                See details
                            </button>
                            <button onClick={() => {setSelectedTrip(mockReservation), setCanOpenTripAnnulationModal(true);}}
                                className="items-center px-4 py-2 border-2 border-red-300 text-red-600 font-medium rounded-lg bg-red-100 hover:text-red-800 hover:bg-red-300 transition-all duration-300 flex gap-1">
                                <MdCancel className="w-6 h-6"/>
                                Cancel reservation
                            </button>
                        </div>
                    </div>
                </div>
            </div>



                <div className="w-full flex justify-center mt-8 mb-6">
                    <div className="flex items-center gap-4">

                        <Tooltip placement={"left"} title={"previous slide"}>
                            <button
                                className="w-10 h-10  text-reservation-color flex items-center justify-center"
                            >
                                <FaArrowLeft/>
                            </button>
                        </Tooltip>


                        <div className="flex items-center gap-2">
                            <button
                                className="w-10 h-10 rounded-lg bg-reservation-color text-white font-medium flex items-center justify-center shadow-sm">
                                1
                            </button>
                            <button
                                className="w-10 h-10 rounded-lg bg-white text-reservation-color hover:bg-gray-50 font-medium flex items-center justify-center border-2 border-gray-200">
                                2
                            </button>
                            <button
                                className="w-10 h-10 rounded-lg bg-white text-reservation-color hover:bg-gray-50 font-medium flex items-center justify-center border-2 border-gray-200">
                                3
                            </button>
                            <span
                                className="flex items-center justify-center px-2 text-gray-500">...</span>
                            <button
                                className="w-10 h-10 rounded-lg bg-white text-reservation-color hover:bg-gray-50 font-medium flex items-center justify-center border-2 border-gray-200">
                                {"10"}
                            </button>
                        </div>

                        <Tooltip placement={"right"} title={"next slide"}>
                            <button
                                className="w-10 h-10  text-reservation-color flex items-center justify-center"
                            >
                                <FaArrowRight/>
                            </button>
                        </Tooltip>
                    </div>
                </div>


            <TripAnnulationModal
                trip={selectedTrip}
                isOpen={canOpenTripAnnulationModal}
                onClose={() => setCanOpenTripAnnulationModal(false)}
            />
        </div>
    );
}

