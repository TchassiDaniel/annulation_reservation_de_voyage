"use client"

import React, { useCallback, useEffect, useState } from "react"
import {
    FaArrowLeft,
    FaCalendarCheck,
    FaCalendarTimes,
    FaDollarSign,
    FaInfoCircle,
    FaLandmark,
    FaStar,
    FaTools,
} from "react-icons/fa"
import { Calendar, ChevronLeft, ChevronRight, Clock, Coffee, MapPin, Usb, Wifi } from "lucide-react"
import { useRouter } from "next/navigation"
import axiosInstance from "@/Utils/AxiosInstance"
import { ErrorModal } from "@/components/Modals/ErrorModal"
import busImage1 from "../../../../../../public/bus-image.jpeg"
import { MdAirlineSeatReclineNormal } from "react-icons/md"
import TripDetailsSkeleton from "@/components/Loadings/Trip-details-skeleton"
import ReservationProcessModal from "@/app/(client)/(reservation-client)/available-trips/[tripId]/ReservationProcess"
import { formatDateOnly, formatDurationSimple, formatFullDateTime, formatDateToTime } from "@/Utils/formatDateMethods"

export default function TripDetails({ params }) {
    const tripId = React.use(params).tripId
    const router = useRouter()
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [direction, setDirection] = useState("right")
    const interval = 5000
    const [errorMessage, setErrorMessage] = useState("")
    const [canOpenErrorModal, setCanOpenErrorModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [tripDetails, setTripDetail] = useState({})
    const [images, setImages] = useState([busImage1])
    const [canOpenReservationModal, setCanOpenReservationModal] = useState(false)

    async function fetchTripDetails(tripId) {
        setIsLoading(true)
        try {
            const response = await axiosInstance.get(`/voyage/${tripId}`)
            if (response.status === 200) {
                console.log(response?.data)
                setIsLoading(false)
                setTripDetail(response?.data)
                setImages([response.data?.smallImage, response?.data.bigImage])
                setErrorMessage("")
                setCanOpenErrorModal(false)
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            setErrorMessage("Something went wrong when retrieving trip details, please try again later !")
            setCanOpenErrorModal(true)
        }
    }

    const equipmentsOnBus = [
        { icon: Wifi, label: "Free WiFi" },
        { icon: Coffee, label: "Sandwich/Coffee/Tea" },
        { icon: Usb, label: "USB Ports" },
    ]

    const nextImage = useCallback(() => {
        setDirection("right")
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, [images.length])

    const previousImage = useCallback(() => {
        setDirection("left")
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }, [images.length])

    useEffect(() => {
        if (tripId) {
            fetchTripDetails(tripId)
        }
    }, [tripId])

    const imageNext = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, [images.length])

    useEffect(() => {
        const timer = setInterval(nextImage, interval)
        return () => clearInterval(timer)
    }, [imageNext, interval])

    if (isLoading) {
        return <TripDetailsSkeleton />
    }
    return (
        <div className="min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between p-4 bg-gray-100 rounded-lg mb-2">
                <button onClick={() => router.back()} className="flex gap-1 mb-2 sm:mb-0">
                    <FaArrowLeft className="text-reservation-color text-xl mt-0.5" />
                    <p className="text-reservation-color text-md font-bold">Back To Available Trips</p>
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mt-4">
                <div className="relative h-[400px] lg:h-[580px] w-full lg:w-[68%] rounded-lg overflow-hidden ">
                    <div
                        className="flex w-full h-full relative"
                        style={{
                            transform: `translateX(-${currentImageIndex * 100}%)`,
                            transition: "transform 0.5s ease-in-out",
                        }}
                    >
                        {images.map((image, index) => (
                            <div key={index} className="min-w-full h-full flex-shrink-0">
                                <img
                                    src={image || "/placeholder.svg"}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-b-lg" />
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={previousImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/80 p-2 rounded-full duration-300 transition-all"
                    >
                        <ChevronLeft className="h-6 w-6 text-white" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/80 p-2 rounded-full duration-300 transition-all"
                    >
                        <ChevronRight className="h-6 w-6 text-white" />
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
                    <div className=" absolute bottom-0 left-0 right-0 lg:p-10 pb-24 pl-3 text-white">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="lg:text-5xl text-3xl font-bold lg:mb-4 mb-2">{tripDetails?.lieuDepart + " - " + tripDetails?.lieuArrive}</h1>
                            <p className="lg:text-2xl text-sm opacity-90">Travel comfortably with {tripDetails?.nomAgence}</p>
                            <button
                                onClick={() => {
                                    setCanOpenReservationModal(true)
                                }}
                                className="lg:hidden absolute bottom-8 right-1 bg-reservation-color text-white px-4 py-2 text-xl hover:bg-white hover:text-reservation-color hover:border-2 hover:border-reservation-color rounded-lg font-semibold shadow-lg transition-all duration-300 flex items-center gap-2 "
                            >
                                <span>Book Now</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/*Trip detail and book btn */}
                <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
                    <div className=" bg-gray-100 rounded-xl shadow-sm p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex gap-5">
                                <FaDollarSign className="h-8 w-8 text-green-600" />
                                <div>
                                    <p className="text-sm text-gray-500 font-semibold">From</p>
                                    <div className="flex gap-1">
                                        <p className="text-4xl font-bold text-reservation-color">{tripDetails?.prix}</p>
                                        <div className="flex gap-3">
                                            <p className="text-md text-reservation-color mt-3 font-semibold"> FCFA</p>
                                            <p className="text-xl text-gray-500 font-semibold mt-2">/person</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8 mb-6">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-7 w-7 text-red-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Departure location</p>
                                    <p className="font-medium">{tripDetails?.pointDeDepart}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-7 w-7 text-red-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Arrival location</p>
                                    <p className="font-medium">{tripDetails?.pointArrivee}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className=" flex items-center justify-center">
                                    <Calendar className="h-7 w-7 text-reservation-color" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Travel Date</p>
                                    <p className="font-medium">
                                        {tripDetails?.dateDepartPrev ? formatDateOnly(tripDetails?.dateDepartPrev) : "not specified"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className=" flex items-center justify-center">
                                    <Clock className="h-8 w-8 text-reservation-color" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Departure Time</p>
                                    <p className="font-semibold">
                                        {tripDetails?.heureDepartEffectif
                                            ? formatDateToTime(tripDetails?.heureDepartEffectif)
                                            : "not specified"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar className="h-7 w-7 text-reservation-color" />
                                <div>
                                    <p className="text-sm text-gray-500">Validity of the offer</p>
                                    <p className="font-medium">
                                        {tripDetails?.dateLimiteReservation
                                            ? formatFullDateTime(tripDetails?.dateLimiteReservation)
                                            : "not specified"}
                                    </p>
                                </div>
                            </div>
                        </div>


                        <button onClick={() => {setCanOpenReservationModal(true)}}
                                className="w-full bg-reservation-color font-semibold  text-xl text-white rounded-lg px-4 py-2 hover:bg-blue-800 transition-all duration-300">
                            Book Now
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-4">
                            Only {tripDetails.nbrPlaceReservable} places left at this price
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-4 mb-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gray-100 rounded-xl shadow-sm p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-10">
                            <div className="flex items-center gap-3 ">
                                <FaStar className="h-7 w-7 text-yellow-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Trip Class</p>
                                    <p className="font-medium">{tripDetails?.nomClasseVoyage}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Clock className="h-8 w-8 text-reservation-color" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Duration</p>
                                    <p className=" font-semibold">
                                        {tripDetails?.dureeVoyage ? formatDurationSimple(tripDetails?.dureeVoyage) : "not specified"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock className="h-7 w-7 text-reservation-color" />
                                <div>
                                    <p className="text-sm text-gray-500">Arrival Time</p>
                                    <p className="font-medium">
                                        {tripDetails?.heureArrive ? formatDateToTime(tripDetails?.heureArrive) : "not specified"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <MdAirlineSeatReclineNormal className="h-6 w-6 text-reservation-color" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Seats</p>
                                    <p className="font-semibold">
                                        {tripDetails?.nbrPlaceReservable + "/" + tripDetails?.nbrPlaceRestante} available
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 rounded-xl shadow-sm p-6">
                            <div className="flex gap-3">
                                <FaInfoCircle className="text-reservation-color w-7 h-7 " />
                                <h2 className="text-xl font-bold mb-4 text-reservation-color">About This Trip</h2>
                            </div>
                            <p className="text-gray-600 mb-10 leading-8 font-semibold ml-10 text-justify">
                                {tripDetails?.description}
                            </p>
                            <div className="flex gap-3 mb-2">
                                <FaTools className="text-reservation-color w-7 h-7" />
                                <h3 className="font-bold text-xl mb-3 text-reservation-color">Equipment and services on the bus</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 ml-4 sm:ml-10">
                                {equipmentsOnBus.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <item.icon className="h-6 w-6 text-reservation-color" />
                                        <span className="text-gray-600">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-xl shadow-sm p-6 space-y-1">
                        <div className="flex gap-3 mb-2">
                            <FaLandmark className="text-reservation-color w-7 h-7" />
                            <h2 className="text-xl text-reservation-color font-bold mb-4">Reservation policy</h2>
                        </div>
                        <div className="space-y-4 text-gray-600 ml-10">
                            <div className="flex items-start gap-3">
                                <FaCalendarCheck className="h-6 w-6 text-green-500" />
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
                                <FaCalendarTimes className="h-6 w-6 text-orange-500" />
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
                </div>

                  <div className="lg:hidden flex justify-center items-center mt-7 mb-5">
                        <button
                            onClick={() => {
                                setCanOpenReservationModal(true)
                            }}
                            className="bg-reservation-color rounded-xl text-2xl text-white font-medium px-6 py-3">
                            Book This Trip
                        </button>
                  </div>
            </div>

            <ErrorModal
                isOpen={canOpenErrorModal}
                onCloseErrorModal={() => {
                    setCanOpenErrorModal(false)
                }}
                message={errorMessage}
            />
            <ReservationProcessModal
                isOpen={canOpenReservationModal}
                onClose={() => {
                    setCanOpenReservationModal(false)
                }}
                tripDetails={tripDetails}
            />
        </div>
    )
}

