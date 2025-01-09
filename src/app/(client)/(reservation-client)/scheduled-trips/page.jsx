'use client';

import React, { useState } from 'react';
import {Calendar, Clock, MapPin, AlertCircle, CheckCircle2, Timer, Wallet, MapPinHouse} from 'lucide-react';
import {Tooltip} from "antd";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {MdAirlineSeatReclineNormal, MdCancel} from "react-icons/md";
import {BsInfo} from "react-icons/bs";
import {TripDetailsModal} from "./TripDetailModal"
import {FaHouse} from "react-icons/fa6";


export default function ScheduledTrips() {


    const [activeTab, setActiveTab] = useState('all');
    const [selectedTrip, setSelectedTrip] = useState({});
    const [canOpenTripDetailModal, setCanOpenTripDetailModal] = useState(false);

    const trips = [
        {
            id: 1,
            from: "Douala",
            to: "Yaoundé",
            departureLocation: "Douala Akwa",
            price: 7000,
            date: "2024-01-15",
            departureTime: "13:00",
            arrivalTime: "17:00",
            company: "Finex Voyages",
            status: "confirmed",
            deadline: "2024-01-14",
            remainingAmount: 0,
            totalAmount: 7000,
            busType: "VIP",
            seatNumber: "23A",
            arrivalLocation: "Yaounde Mvan"
        },
        {
            id: 2,
            from: "Douala",
            to: "Yaoundé",
            departureLocation: "Douala Mboppi",
            price: 8000,
            date: "2024-01-20",
            departureTime: "13:00",
            arrivalTime: "17:00",
            company: "General Voyages",
            status: "reserved",
            deadline: "2024-01-19",
            remainingAmount: 3000,
            totalAmount: 8000,
            busType: "VIP+",
            seatNumber: "15B",
            arrivalLocation: "Yaounde Mvan"
        },
        {
            id: 3,
            from: "Douala",
            to: "Yaoundé",
            departureLocation: "Douala Akwa",
            price: 7000,
            date: "2024-01-15",
            departureTime: "13:00",
            arrivalTime: "17:00",
            company: "Touristique Voyages",
            status: "confirmed",
            deadline: "2024-01-14",
            remainingAmount: 0,
            totalAmount: 7000,
            busType: "VIP",
            seatNumber: "23A",
            arrivalLocation: "Yaounde Mvan"
        },
        {
            id: 4,
            from: "Douala",
            to: "Bafoussam",
            departureLocation: "Douala Bepanda",
            price: 9000,
            date: "2024-01-20",
            departureTime: "13:00",
            arrivalTime: "17:00",
            company: "Tresor Voyages",
            status: "reserved",
            deadline: "2024-01-19",
            remainingAmount: 5000,
            totalAmount: 8000,
            busType: "VIP+",
            seatNumber: "15B",
            arrivalLocation: "Bafoussam Akwa"
        }
    ];

    return (
        <div className="min-h-screen p-4">
            <div className="bg-gray-100 rounded-lg">
                <div className="mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-reservation-color">My Booked Trips</h1>
                    <p className="mt-2 text-md font-medium">Manage your reservations, make your payments and track your upcoming trips.</p>
                </div>
            </div>
            <div className="mx-auto py-6">
                <div className="flex justify-end gap-4 mb-6">
                    <button onClick={() => setActiveTab('all')}
                        className={`px-4 py-2 rounded-lg text-md font-medium transition-colors ${activeTab === 'all' ? 'bg-reservation-color text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                        All Trips
                    </button>

                    <button onClick={() => setActiveTab('confirmed')}
                        className={`px-4 py-2 rounded-lg text-md font-medium transition-colors ${activeTab === 'confirmed' ? 'bg-reservation-color text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                        Confirmed
                    </button>

                    <button onClick={() => setActiveTab('reserved')}
                        className={`px-4 py-2 rounded-lg text-md font-medium transition-colors ${activeTab === 'reserved' ? 'bg-reservation-color text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                        On Hold
                    </button>
                </div>


                <div className="space-y-4">
                    {trips.filter(trip => activeTab === 'all' || trip.status === activeTab).map(trip => (
                        <div key={trip.id} className="border border-blue-600 bg-gray-50  rounded-xl p-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-reservation-color">
                                        <MapPin className="h-7 w-7"/>
                                        <h3 className="text-xl font-bold">{trip.from} - {trip.to}</h3>
                                    </div>
                                    <div className="flex gap-2">
                                        {trip.status === 'confirmed' ? (
                                            <span
                                                className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 flex items-center gap-1">
                                                <CheckCircle2 className="h-4 w-4"/>
                                                Confirmed
                                            </span>
                                        ) : (
                                            <span
                                                className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 flex items-center gap-1">
                                                <AlertCircle className="h-4 w-4"/>
                                                Waiting for confirmation
                                            </span>
                                        )}
                                        <span
                                            className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                                            {trip.busType}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-reservation-color">{trip.price.toLocaleString()} FCFA</p>
                                    <div className="flex gap-1 ml-14">
                                        <MdAirlineSeatReclineNormal className="text-green-500 w-6 h-6"/>
                                        <p className="text-md  text-green-500 font-semibold mt-1">Seat {trip.seatNumber}</p>
                                    </div>
                                </div>
                            </div>


                            <div className="grid grid-cols-3  mb-6 ml-10">
                                <div className="flex items-center gap-3">
                                    <FaHouse className="h-5 w-5 text-reservation-color"/>
                                    <div>
                                        <p className="text-sm text-gray-500">Transport agency</p>
                                        <p className="font-medium">{trip.company}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-reservation-color"/>
                                    <div>
                                        <p className="text-sm text-gray-500">Departure Date</p>
                                        <p className="font-medium">
                                            {new Date(trip.date).toLocaleDateString('en-EN', {dateStyle: 'long'})} At {trip.departureTime}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPinHouse className="h-5 w-5 text-red-500"/>
                                    <div>
                                        <p className="text-sm text-gray-500">Departure location</p>
                                        <p className="font-medium">{trip.departureLocation}</p>
                                    </div>
                                </div>
                            </div>


                            <div className="flex items-center justify-between ml-10">
                                <div className="flex gap-[248px]">
                                    <div className="flex items-center gap-3">
                                        <Timer className="h-5 w-5 text-reservation-color"/>
                                        <div>
                                            <p className="text-sm text-gray-500">Payment deadline</p>
                                            <p className="font-medium">
                                                {new Date(trip.deadline).toLocaleDateString('fr-FR', {dateStyle: 'long'})}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPinHouse className="h-5 w-5 text-red-500"/>
                                        <div>
                                            <p className="text-sm text-gray-500">Arrival location</p>
                                            <p className="font-medium">
                                                {trip.arrivalLocation}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${trip.status === 'reserved' ? 'justify-between' : 'justify-end'} flex mt-4`}>

                                {trip.status === 'reserved' && (
                                    <div className="bg-orange-50 rounded-lg border border-orange-200 w-[700px] p-4 ml-10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Wallet className="h-5 w-5 text-orange-500"/>
                                                <div>
                                                    <p className="font-medium text-orange-800">Amount remaining to be
                                                        paid: {trip.remainingAmount.toLocaleString()} FCFA</p>
                                                    <p className="text-sm text-orange-600">
                                                        on a total of {trip.totalAmount.toLocaleString()} FCFA
                                                    </p>
                                                </div>
                                            </div>
                                            <button onClick={() => {
                                                alert("payment")
                                            }}
                                                    className="px-4 py-2 bg-orange-500 font-bold text-white rounded-lg text-sm  hover:bg-orange-700 transition-colors">
                                                Complete payment
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className={`${trip.status === 'reserved' ? 'mt-10' : ''} flex gap-3`}>
                                    <button onClick={() => {setSelectedTrip(trip), setCanOpenTripDetailModal(true)}}
                                            className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-300 font-medium rounded-lg bg-blue-100 transition-all duration-300 flex items-center gap-2">
                                        <div className="border border-blue-600 rounded-full">
                                            <BsInfo className="h-6 w-6"/>
                                        </div>
                                        See details
                                    </button>
                                    <button onClick={() => {
                                        setSelectedTrip(trip), alert("cancellation")
                                    }}
                                            className="items-center px-4 py-2 text-red-600 font-medium rounded-lg bg-red-100 hover:text-red-800 hover:bg-red-300 transition-all duration-300 flex gap-1">
                                        <MdCancel className="w-6 h-6"/>
                                        Cancel reservation
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/*Pagination content */}
            <div className=" w-full justify-center flex mt-6 mb-4">
                <div className="flex gap-4">
                    <Tooltip placement={"left"} title={"previous slide"}>
                        <button
                            onClick={async () => {
                            }}
                            className="w-14 h-14 border-2 rounded-lg bg-gray-100 hover:bg-reservation-color text-xl  text-reservation-color hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                            <FaArrowLeft/>
                        </button>
                    </Tooltip>
                    <p className="text-reservation-color text-2xl font-bold mt-4">{"1/10"}</p>
                    <Tooltip placement={"right"} title={"next slide"}>
                        <button
                            onClick={async () => {
                            }}
                            className="w-14 h-14 border-2 rounded-lg bg-gray-100 hover:bg-reservation-color text-xl  text-reservation-color hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                            <FaArrowRight/>
                        </button>
                    </Tooltip>
                </div>
            </div>

            {/*Modal content */}
            <TripDetailsModal trip={selectedTrip} isOPen={canOpenTripDetailModal} onClose={()=>setCanOpenTripDetailModal(false)}/>
        </div>
    );
}

