'use client';

import {useEffect, useState} from 'react';
import {
    FaArrowLeft,
    FaCalendarCheck,
    FaCalendarTimes,
    FaDollarSign,
    FaInfoCircle,
    FaLandmark,
    FaStar,
    FaTools
} from 'react-icons/fa';
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight,  Wifi, Coffee, Usb } from 'lucide-react';
import Image from "next/image";
import bus from "../../../../../../public/bus1.jpeg";
import busImage from "../../../../../../public/bus-image.jpeg";
import {useRouter} from "next/navigation";


export default function TripDetails() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    const images = [
        bus,
        busImage,
        bus
    ];

    const equipmentsOnBus = [
        { icon: Wifi, label: "Free WiFi" },
        { icon: Coffee, label: "Sandwich/Coffee/Tea" },
        { icon: Usb, label: "USB Ports" }
    ];

    function nextImage ()
    {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }

    function prevImage ()
    {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }


    useEffect(() => {
        setInterval( () => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        },10000)
    }, []);

    const router = useRouter();
    return (
        <div className="min-h-screen p-4">

            <div className="flex justify-between  p-4 bg-gray-100 rounded-lg mb-2">
                <button onClick={() => router.back()} className="flex gap-1">
                    <FaArrowLeft className="text-reservation-color text-xl mt-0.5"/>
                    <p className="text-reservation-color text-md font-bold">Back To Available Trips</p>
                </button>
            </div>

            <div className="relative h-[470px] ">
                <div className="absolute inset-0">
                    <Image
                        src={images[currentImageIndex]}
                        alt="Trip view"
                        className="w-full h-full object-cover opacity-80 rounded-lg transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg"/>
                </div>
                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/80 p-2 rounded-full duration-300 transition-all"
                >
                    <ChevronLeft className="h-6 w-6 text-white"/>
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/80 p-2 rounded-full duration-300 transition-all"
                >
                    <ChevronRight className="h-6 w-6 text-white"/>
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "bg-white w-4" : "bg-white/50"}`}
                            onClick={() => setCurrentImageIndex(index)}
                        />
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-5xl font-bold mb-4">Douala - Yaoundé</h1>
                        <p className="text-2xl opacity-90">Travel comfortably with General Voyages</p>
                        <button
                            className="absolute bottom-8 right-8 bg-reservation-color text-white px-8 py-4 text-2xl hover:bg-white hover:text-reservation-color hover:border-4 hover:border-reservation-color rounded-lg font-bold shadow-lg transition-all duration-300 flex items-center gap-2 ">
                            <span>Book Now</span>
                        </button>
                    </div>
                </div>
            </div>



            <div className="max-w-7xl mx-auto mt-4 mb-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gray-100 rounded-xl shadow-sm p-6 grid grid-cols-2 md:grid-cols-4 gap-4">


                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Calendar className="h-7 w-7 text-reservation-color"/>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Travel Date</p>
                                    <p className="font-medium">12 Jan 2025.</p>
                                </div>
                            </div>


                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Calendar className="h-8 w-8 text-reservation-color"/>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Departure</p>
                                    <p className="font-semibold">08:00</p>
                                </div>
                            </div>


                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Clock className="h-8 w-8 text-reservation-color"/>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Duration</p>
                                    <p className="font-semibold">4 hours</p>
                                </div>
                            </div>


                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Users className="h-6 w-6 text-reservation-color"/>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Places</p>
                                    <p className="font-semibold">23/70 available</p>
                                </div>
                            </div>
                        </div>



                        <div className="bg-gray-100 rounded-xl shadow-sm p-6 space-y-1">
                            <div className="flex gap-3">
                                <FaLandmark className="text-reservation-color w-7 h-7"/>
                                <h2 className="text-xl text-reservation-color font-bold mb-4">Reservation policy</h2>
                            </div>
                            <div className="space-y-4 text-gray-600 ml-10">
                                <div className="flex items-start gap-3">
                                    <FaCalendarCheck className="h-6 w-6 text-green-500"/>
                                    <div>
                                        <h3 className="font-semibold text-black mb-1">Reservation flexible</h3>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Acompte de 30% à la réservation</li>
                                            <li>Solde à régler 45 jours avant le départ</li>
                                            <li>Passeport valide 6 mois après la date retour</li>
                                        </ul>
                                    </div>
                                </div>


                                <div className="flex items-start gap-3">
                                    <FaCalendarTimes className="h-6 w-6 text-orange-500"/>
                                    <div>
                                        <h3 className="font-semibold text-black mb-1">Annulation Flexible</h3>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Plus de 45 jours avant le départ : 150€ de frais</li>
                                            <li>Entre 45 et 30 jours : 30% du montant total</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="bg-gray-100 rounded-xl shadow-sm p-6">
                            <div className="flex gap-3">
                                <FaInfoCircle className="text-reservation-color w-7 h-7 "/>
                                <h2 className="text-xl font-bold mb-4 text-reservation-color">About This Trip</h2>
                            </div>
                            <p className="text-gray-600 mb-10 leading-8 font-semibold ml-10 text-justify">Partez à la découverte de Bali, une île paradisiaque où nature luxuriante et culture ancestrale se rencontrent. Ce voyage vous permettra d;explorer les plus beaux temples, de vous détendre sur des plages de sable fin, et de vous immerger dans la culture balinaise.</p>
                            <div className="flex gap-3 mb-2">
                                <FaTools className="text-reservation-color w-7 h-7"/>
                                <h3 className="font-bold text-xl mb-3 text-reservation-color">Equipment and services on the bus</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 ml-10">
                                {equipmentsOnBus.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <item.icon className="h-6 w-6 text-reservation-color"/>
                                        <span className="text-gray-600">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>



                    {/*Trip detail and book btn */}
                    <div className="lg:col-span-1 ">
                        <div className=" bg-gray-100 rounded-xl shadow-sm p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-5">
                                    <FaDollarSign className="h-8 w-8 text-green-600"/>
                                    <div>
                                        <p className="text-sm text-gray-500 font-semibold">From</p>
                                        <div className="flex gap-1">
                                            <p className="text-4xl font-bold text-reservation-color">7800</p>
                                            <div className="flex gap-3">
                                                <p className="text-md text-reservation-color mt-3 font-semibold"> FCFA</p>
                                                <p className="text-xl text-gray-500 font-semibold mt-2">/person</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-6">
                                <FaStar className="h-7 w-7 text-yellow-400"/>
                                <div>
                                    <p className="text-sm text-gray-500">Trip Class</p>
                                    <p className="font-medium">VIP</p>
                                </div>
                            </div>

                            <div className="space-y-8 mb-6">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-7 w-7 text-red-600"/>
                                    <div>
                                        <p className="text-sm text-gray-500">Departure location</p>
                                        <p className="font-medium">Douala, Mboppi</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-7 w-7 text-red-600"/>
                                    <div>
                                        <p className="text-sm text-gray-500">Arrival location</p>
                                        <p className="font-medium">Yaoundé, Nsam</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-7 w-7 text-reservation-color"/>
                                    <div>
                                        <p className="text-sm text-gray-500">Arrival Time</p>
                                        <p className="font-medium">12:00</p>
                                    </div>
                                </div>


                                <div className="flex items-center gap-2">
                                    <Calendar className="h-7 w-7 text-reservation-color"/>
                                    <div>
                                        <p className="text-sm text-gray-500">Validity of the offer</p>
                                        <p className="font-medium">Until Dec 31, 2023</p>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => {
                                alert("reservation")
                            }}
                                    className="w-full bg-reservation-color font-bold  text-xl text-white rounded-lg px-4 py-3 hover:bg-blue-800 transition-all duration-300">
                                Book Now
                            </button>

                            <p className="text-center text-sm text-gray-500 mt-4">
                                Only 23 places left at this price
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

