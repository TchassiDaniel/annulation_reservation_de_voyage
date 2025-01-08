'use client';
import React, { useState } from 'react';
import { Search, Clock, MapPin, Calendar, Users, Filter, ArrowRight, Star, Tag } from 'lucide-react';
import Image from "next/image";
import bus from "../../../../../public/bus1.jpeg";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {Tooltip} from "antd";
import {useRouter} from "next/navigation";


export default function AvailableTrips() {
    const [activeFilter, setActiveFilter] = useState('all');

    const router = useRouter();

    const trips = [
        {
            id: 1,
            company: "General Voyages",
            from: "Douala",
            to: "Yaoundé",
            departure: "08:00",
            duration: "4h",
            price: 6000,
            seatsAvailable: 23,
            totalSeats: 70,
            rating: 4.5,
            comfort: "VIP",
            imageUrl: "/placeholder.svg?height=200&width=300",
            amenities: ["WiFi", "Climatisé", "USB"]
        },
        {
            id: 2,
            company: "General Voyages",
            from: "Douala",
            to: "Yaoundé",
            departure: "08:00",
            duration: "4h",
            price: 6000,
            seatsAvailable: 23,
            totalSeats: 70,
            rating: 4.5,
            comfort: "VIP",
            imageUrl: "/placeholder.svg?height=200&width=300",
            amenities: ["WiFi", "Climatisé", "USB"]
        },
        {
            id: 3,
            company: "General Voyages",
            from: "Douala",
            to: "Yaoundé",
            departure: "08:00",
            duration: "4h",
            price: 6000,
            seatsAvailable: 23,
            totalSeats: 70,
            rating: 4.5,
            comfort: "VIP",
            imageUrl: "/placeholder.svg?height=200&width=300",
            amenities: ["WiFi", "Climatisé", "USB"]
        },
        {
            id: 4,
            company: "General Voyages",
            from: "Douala",
            to: "Yaoundé",
            departure: "08:00",
            duration: "4h",
            price: 6000,
            seatsAvailable: 23,
            totalSeats: 70,
            rating: 4.5,
            comfort: "VIP",
            imageUrl: "/placeholder.svg?height=200&width=300",
            amenities: ["WiFi", "Climatisé", "USB"]
        },
        {
            id: 5,
            company: "General Voyages",
            from: "Douala",
            to: "Yaoundé",
            departure: "08:00",
            duration: "4h",
            price: 6000,
            seatsAvailable: 23,
            totalSeats: 70,
            rating: 4.5,
            comfort: "VIP",
            imageUrl: "/placeholder.svg?height=200&width=300",
            amenities: ["WiFi", "Climatisé", "USB"]
        },
        {
            id: 6,
            company: "General Voyages",
            from: "Douala",
            to: "Yaoundé",
            departure: "08:00",
            duration: "4h",
            price: 6000,
            seatsAvailable: 23,
            totalSeats: 70,
            rating: 4.5,
            comfort: "VIP",
            imageUrl: "/placeholder.svg?height=200&width=300",
            amenities: ["WiFi", "Climatisé", "USB"]
        },
    ];

    return (
        <div className="min-h-screen  p-6 flex-1">
            <div className="max-w-7xl mx-auto mb-8">


                <div className="bg-gray-100 rounded-2xl shadow-sm mb-6 p-6 flex justify-between">
                    <h1 className="text-3xl font-bold text-reservation-color mt-1 ml-2">
                        Available Trips
                    </h1>

                    <div className="flex gap-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div
                                className="border-2 bg-white border-reservation-color flex gap-2 p-1 rounded-lg">
                                <MapPin className="text-reservation-color h-6 w-6 mt-1 ml-3"/>
                                <input
                                    type="text"
                                    placeholder="departure city"
                                    className="w-full  border-none rounded-lg outline-none focus:outline-none focus:border-none"
                                />
                            </div>


                            <div
                                className="border-2 bg-white border-reservation-color flex gap-2 p-1 rounded-lg">
                                <MapPin className="text-reservation-color h-6 w-6 mt-1 ml-3"/>
                                <input
                                    type="text"
                                    placeholder="arrival city"
                                    className="w-full  border-none rounded-lg outline-none focus:outline-none focus:border-none"
                                />
                            </div>


                            <div
                                className="border-2 bg-white border-reservation-color flex gap-2 p-1 rounded-lg">
                                <Calendar className="text-reservation-color h-6 w-6 mt-1 ml-3"/>
                                <input
                                    type="date"
                                    placeholder="trip date"
                                    className="w-full  border-none rounded-lg outline-none focus:outline-none focus:border-none"
                                />
                            </div>
                        </div>

                        <button
                            className="bg-reservation-color text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
                            <Search className="h-6 w-6"/>
                        </button>

                    </div>


                </div>


                <div className="flex justify-end gap-2 mb-8">
                    <button onClick={() => setActiveFilter('all')}
                        className={`px-4 py-2 rounded-full ${activeFilter === 'all' ? 'bg-reservation-color text-white' : 'bg-gray-100 text-reservation-color hover:bg-gray-200'} transition-all font-bold duration-300 shadow-sm`}
                    >
                        All
                    </button>
                    {['Douala', 'Yaoundé', 'Limbé', 'Kribi'].map((city, index) => (
                        <button
                            key={city || index}
                            onClick={() => setActiveFilter(city)}
                            className={`px-4 py-2 rounded-full ${activeFilter === city ? 'bg-reservation-color text-white' : 'bg-gray-100 text-reservation-color hover:bg-gray-200'} transition-all font-bold duration-300 shadow-sm`}
                        >
                            {city}
                        </button>
                    ))}
                    <button
                        className="px-6 py-2 rounded-full bg-white text-gray-600 hover:bg-gray-50 transition-colors duration-200 shadow-sm flex items-center gap-2">
                        <Filter className="h-4 w-4"/>
                        Filter
                    </button>
                </div>

                {/* Grille des voyages */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map((trip, index) => (
                        <div key={trip.id || index} className="bg-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                            <div className="relative h-48">
                                <Image
                                    src={bus}
                                    alt={`${trip.from} - ${trip.to}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                                    {trip.comfort}
                                </div>
                            </div>


                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {trip.company}
                                        </h3>
                                        <div className="flex items-center text-yellow-400">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="ml-1 text-sm text-gray-600">{trip.rating}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-gray-900">{trip.price} FCFA</p>
                                        <p className="text-sm text-gray-500">per Person</p>
                                    </div>
                                </div>


                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                            <Clock className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Départ à {trip.departure}</p>
                                            <p className="text-sm font-medium">Duration: {trip.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                            <Users className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Available Seat</p>
                                            <p className="text-sm font-medium">
                                                {trip.seatsAvailable}/{trip.totalSeats} sièges
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex gap-2 mb-6">
                                    {trip.amenities.map((amenity, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                </div>


                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-6 h-6 text-blue-600"/>
                                        <span className="font-medium">{trip.from}</span>
                                        <ArrowRight className="h-4 w-4 text-gray-400" />
                                        <span className="font-medium">{trip.to}</span>
                                    </div>
                                    <button className="px-6 py-2 font-bold bg-reservation-color text-white rounded-lg hover:bg-white hover:border-2 hover:border-reservation-color transition-all duration-300 hover:text-reservation-color"
                                            onClick={ ()=>router.push(`/available-trips/${trip.id}`)}>
                                        Book Trip
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


                {/*Pagination content */}
                <div className=" w-full justify-center flex mt-6 mb-4">
                    <div className="flex gap-4">
                        <Tooltip placement={"left"} title={"previous slide"}>
                            <button
                                onClick={async ()=> {}}
                                className="w-14 h-14 border-2 rounded-lg bg-gray-100 hover:bg-reservation-color text-xl  text-reservation-color hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                                <FaArrowLeft/>
                            </button>
                        </Tooltip>
                        <p className="text-reservation-color text-2xl font-bold mt-4">{"1/10"}</p>
                        <Tooltip placement={"right"} title={"next slide"}>
                            <button
                                onClick={async ()=> {}}
                                className="w-14 h-14 border-2 rounded-lg bg-gray-100 hover:bg-reservation-color text-xl  text-reservation-color hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                            <FaArrowRight/>
                            </button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
}

