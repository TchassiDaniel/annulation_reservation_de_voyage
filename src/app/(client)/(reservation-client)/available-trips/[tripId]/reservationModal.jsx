'use client';

import React, {useEffect, useState} from 'react';
import {MapPin, X} from 'lucide-react';
import {FaHouse} from "react-icons/fa6";
import {FaCalendar, FaChair, FaClock, FaDollarSign, FaMoneyBill, FaUsers} from "react-icons/fa";
import Bus70SeatsDisposition from "@/app/(client)/(reservation-client)/available-trips/[tripId]/Bus70SeatsDisposition";
import Bus75SeatsDisposition from "@/app/(client)/(reservation-client)/available-trips/[tripId]/Bus75SeatsDisposition";
import Bus80SeatsDisposition from "@/app/(client)/(reservation-client)/available-trips/[tripId]/Bus80SeatsDisposition";
import Bus56SeatsDisposition from "@/app/(client)/(reservation-client)/available-trips/[tripId]/Bus56SeatsDisposition";



export default function ReservationModal({ isOpen, onClose, tripDetails }) {

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(7500);

    const reservationDetails = [
        { icon: FaHouse, label: "Travel agency", value: "General Express" },
        { icon: FaCalendar, label: "Travel date", value: new Date(tripDetails.dateDepartPrev).toLocaleDateString('en-EN', {dateStyle: 'long'}) },
        { icon: FaClock, label: "Departure Time", value: "08:00" },
        { icon: FaMoneyBill, label: "Unit price", value: "7500 FCFA" },
        {icon: MapPin, label: "Departure location", value: tripDetails.lieuDepart },
        { icon: MapPin, label: "Arrival Location", value: tripDetails.lieuArrive },
    ];




    useEffect(() => {
        if(selectedSeats.length > 0 && tripDetails.price) {
            setTotalPrice(selectedSeats.length * tripDetails.price);
        }
    }, [selectedSeats.length, tripDetails.price]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300">

            <div className="bg-white relative rounded-xl  max-w-5xl w-full max-h-[630px] overflow-y-auto">
                <button onClick={onClose}
                    className="fixed top-20 right-[270px] bg-red-100 rounded-full cursor-pointer w-10 h-10 flex items-center justify-center">
                    <X className="w-8 h-6 text-red-500  hover:w-10 hover:h-10 hover:text-red-600 transition-all duration-300"/>
                </button>
                <div className="fixed flex flex-col p-7">
                    <h1 className="mb-10 text-2xl text-reservation-color font-bold">
                        Détails de la Réservation
                    </h1>
                    <div className="ml-5 gap-x-12 gap-y-7 grid grid-cols-2 w-fit">
                        {reservationDetails.map((detail, index) => (
                            <div key={index} className="flex items-center">
                                <detail.icon className="w-5 h-5 text-reservation-color mr-3"/>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-500">{detail.label}</p>
                                    <p className="text-lg font-semibold text-gray-800">{detail.value}</p>
                                </div>
                            </div>
                        ))}
                            <div className="flex items-center">
                                <FaUsers className="w-5 h-5 text-reservation-color mr-3"/>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-500">Number of places to reserve</p>
                                    <p className="text-lg font-semibold text-gray-800">{selectedSeats.length === !0 ? " - " : selectedSeats.length}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaDollarSign className="w-5 h-5 text-green-500 mr-3"/>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-500">Total Price</p>
                                    <p className="text-lg font-semibold text-green-500">{totalPrice}</p>
                                </div>
                            </div>
                    </div>

                    <div className="ml-5 flex items-center mt-5 mr-4">
                        <FaChair className="w-5 h-5 text-reservation-color mr-3"/>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-500">Selected seats</p>
                            <div className="grid grid-cols-10 gap-3 mt-1">
                                {selectedSeats.map((seat, index) => (
                                    <div key={index}
                                         className="w-8 h-7 border-green-500 border-2 rounded-md bg-green-100 flex justify-center items-center">
                                        <p className=" text-sm text-gray-600 font-semibold">{seat}</p>
                                    </div>
                                ))}
                                {selectedSeats.length === 0 && (" - ")}
                            </div>
                        </div>
                    </div>

                    <div className="ml-7 mt-4 mb-2 flex gap-4">
                        <button
                            className="bg-reservation-color font-bold text-white py-2 px-4 rounded-lg  transition-all duration-300 disabled:bg-gray-400/80  disabled:cursor-not-allowed"
                            disabled={selectedSeats.length === 0}
                        >
                            Confirm reservation
                        </button>
                        <button
                            className=" bg-orange-500 text-white font-bold  disabled:bg-gray-400/80  disabled:cursor-not-allowed py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
                            disabled={selectedSeats.length === 0}
                        >
                            Proceed to payment
                        </button>
                    </div>
                </div>


                <div className="ml-[53%] p-6 bg-gray-50 min-h-screen overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-reservation-color mb-1">Selection of places</h3>
                    <p className="italic text-md mb-6 text-gray-600">Please choose the seat(s) you want
                        to book</p>
                    <div className="ml-7 flex gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg border-2 border-gray-500 bg-gray-200"/>
                            <span className="text-sm text-gray-500 font-medium">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg  bg-green-300 border-2 border-green-500"/>
                            <span className="text-sm text-green-600 font-medium">Selected </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg  bg-red-300 border-2 border-red-500"/>
                            <span className="text-sm text-red-600 font-medium">Reserved </span>
                        </div>
                    </div>
                    {/*<Bus70SeatsDisposition setSeats={setSelectedSeats}/>*/}
                    {/*<Bus75SeatsDisposition setSelectedSeats={setSelectedSeats}/> */}
                    {/*<Bus80SeatsDisposition setSelectedSeats={setSelectedSeats}/>*/}
                    <Bus56SeatsDisposition setSelectedSeats={setSelectedSeats}/>
                </div>
            </div>
        </div>
    );
}

