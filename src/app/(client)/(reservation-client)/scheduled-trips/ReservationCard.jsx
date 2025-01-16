'use client';

import React, { useState } from 'react';
import {
    MapPin,
    Clock,
    Calendar,
    Users,
    CreditCard,
    AlertCircle,
    Printer,
    ChevronDown,
    ChevronUp,
    Building,
    Ban,
    DollarSign,
    Wallet
} from 'lucide-react';
import {BsInfo} from "react-icons/bs";
import {MdCancel} from "react-icons/md";

export default function ReservationCard({ reservation }) {
    const [isOpen, setIsOpen] = useState(false);

    // Calculate payment status
    const totalAmount = reservation.totalAmount;
    const remainingAmount = totalAmount - reservation.amountPaid;
    const paymentStatus = remainingAmount === 0 ? 'Paid' : 'Partial';
    const paymentPercentage = Math.round((reservation.amountPaid / totalAmount) * 100);

    return (
        <div className=" rounded-xl border-2 border-gray-300 bg-gray-100 overflow-hidden">
            {/* Header Section */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <MapPin className="text-reservation-color h-10 w-10" />
                        <h3 className="text-lg font-semibold">
                            {reservation.departure} - {reservation.arrival}
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-2 rounded-full text-sm font-medium ${
                            reservation.status === 'Confirmed'
                                ? 'bg-green-200 text-green-600 border-green-600 border-2'
                                : 'bg-yellow-200 text-orange-700 border-orange-600 border-2'
                        }`}>
                          {reservation.status}
                        </span>
                        {reservation.class && (
                            <span className="px-2 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                {reservation.class}
                            </span>
                        )}
                    </div>
                </div>

                <div className="ml-10 grid grid-cols-3 gap-16 w-fit">
                    {/* Left Column */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Building className="text-reservation-color h-5 w-5"/>
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
                            <Users className="text-reservation-color h-5 w-5"/>
                            <div>
                                <p className="text-sm text-gray-500">Passengers</p>
                                <p className="font-medium">{reservation.passengers.length} passengers</p>
                                <p className="text-sm text-gray-500">Seats: {reservation.passengers.map(p => p.seatNumber).join(', ')}</p>
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

            {/* Collapsible Passenger Details
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full p-4 border-t border-gray-200 hover:bg-gray-50"
                >
                    <span className="font-medium">Passenger Details</span>
                    {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {isOpen && (
                    <div className="p-4 space-y-4 bg-gray-50">
                        {reservation.passengers.map((passenger, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                <div>
                                    <p className="font-medium">{passenger.name}</p>
                                    <p className="text-sm text-gray-500">Seat {passenger.seatNumber}</p>
                                </div>
                                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                                    <Printer className="h-4 w-4" />
                                    Print Ticket
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>*_/}

            {/* Footer Actions */}
            <div className="flex items-center justify-between  p-4">
                {/* Complete Payment Button */}
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


                <div
                    className={`${
                        reservation?.status === "reserved" ? "mt-10" : ""
                    } flex gap-3`}>
                    <button
                       // onClick={() => {
                       // setSelectedTrip(trip), setCanOpenTripDetailModal(true);
                       // }}
                        className="px-4 py-2 text-blue-600 hover:text-blue-800 border-2 border-blue-300 hover:bg-blue-300 font-medium rounded-lg bg-blue-100 transition-all duration-300 flex items-center gap-2">
                        <div className="border border-blue-600 rounded-full">
                            <BsInfo className="h-6 w-6"/>
                        </div>
                        See details
                    </button>
                    <button
                      /*  onClick={() => {
                            setSelectedTrip(trip),
                                setCanOpenTripAnnulationModal(true);
                        }}*/
                        className="items-center px-4 py-2 border-2 border-red-300 text-red-600 font-medium rounded-lg bg-red-100 hover:text-red-800 hover:bg-red-300 transition-all duration-300 flex gap-1">
                        <MdCancel className="w-6 h-6"/>
                        Cancel reservation
                    </button>
                </div>
            </div>
        </div>
    );
}

