"use client"
import { useEffect, useState } from "react"
import { Search, Clock, MapPin, Calendar, Filter, ArrowRight } from "lucide-react"
import Image from "next/image"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { Tooltip } from "antd"
import { useRouter } from "next/navigation"
import axiosInstance from "@/Utils/AxiosInstance"
import AvailableTripsLoadingSkeleton from "@/components/Loadings/Available-Trips-Skeleton"
import { MdAirlineSeatReclineNormal } from "react-icons/md"
import ErrorHandler from "@/components/ErrorHandler/ErrorHandler"
import { formatDurationSimple } from "@/Utils/formatDateMethods"

export default function AvailableTrips() {
    const router = useRouter()
    const [availableTrips, setAvailableTrips] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [canRenderPaginationContent, setCanRenderPaginationContent] = useState(false)
    const [activeFilter, setActiveFilter] = useState("all")
    const [isSearch, setIsSearch] = useState(false)

    useEffect(() => {
        fetchAvailableTrips()
    }, [])

    const trips = {
        amenities: ["wifi", "Air conditioning", "USB"],
    }

    async function fetchAvailableTrips() {
        try {
            setIsLoading(true)
            const response = await axiosInstance.get("/voyage")
            if (response.status === 200) {
                console.log(response.data)
                setIsLoading(false)
                setAvailableTrips(response.data.content)
                if (response.data.empty === true) {
                    setIsSearch(false)
                    setCanRenderPaginationContent(false)
                } else {
                    setCanRenderPaginationContent(true)
                }

                setError(null)
            }
        } catch (error) {
            setIsLoading(false)
            setCanRenderPaginationContent(false)
            console.log(error)
            setAvailableTrips(null)
            setError(error)
        }
    }

    return (
        <div className="min-h-screen p-2 flex-1">
            <div className="mx-auto mb-8">
                <div className="bg-gray-100 rounded-2xl shadow-sm mb-6 p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-reservation-color mb-4 sm:mb-0 sm:mt-1 sm:ml-2">
                        Available Trips
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full sm:w-auto">
                            <div className="border-2 bg-white border-reservation-color flex gap-2 p-1 rounded-lg">
                                <MapPin className="text-reservation-color h-6 w-6 mt-1 ml-3" />
                                <input
                                    type="text"
                                    placeholder="departure city"
                                    className="w-full  border-none rounded-lg outline-none focus:outline-none focus:border-none"
                                />
                            </div>
                            <div className="border-2 bg-white border-reservation-color flex gap-2 p-1 rounded-lg">
                                <MapPin className="text-reservation-color h-6 w-6 mt-1 ml-3" />
                                <input
                                    type="text"
                                    placeholder="arrival city"
                                    className="w-full  border-none rounded-lg outline-none focus:outline-none focus:border-none"
                                />
                            </div>
                            <div className="border-2 bg-white border-reservation-color flex gap-2 p-1 rounded-lg">
                                <Calendar className="text-reservation-color h-6 w-6 mt-1 ml-3" />
                                <input
                                    type="date"
                                    placeholder="trip date"
                                    className="w-full  border-none rounded-lg outline-none focus:outline-none focus:border-none"
                                />
                            </div>
                        </div>
                        <button className="bg-reservation-color text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 w-full sm:w-auto">
                            <Search className="h-6 w-6" />
                            <span className="sm:hidden">Search</span>
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-end gap-2 mb-8">
                    <button
                        onClick={() => setActiveFilter("all")}
                        className={`px-4 py-2 rounded-full ${activeFilter === "all" ? "bg-reservation-color text-white" : "bg-gray-100 text-reservation-color hover:bg-gray-200"} transition-all font-bold duration-300 shadow-sm`}
                    >
                        All
                    </button>
                    {["Douala", "Yaoundé", "Limbé", "Kribi"].map((city, index) => (
                        <button
                            key={city || index}
                            onClick={() => setActiveFilter(city)}
                            className={`px-4 py-2 rounded-full ${activeFilter === city ? "bg-reservation-color text-white" : "bg-gray-100 text-reservation-color hover:bg-gray-200"} transition-all font-bold duration-300 shadow-sm`}
                        >
                            {city}
                        </button>
                    ))}
                    <button className="px-6 py-2 rounded-full bg-white text-gray-600 hover:bg-gray-50 transition-colors duration-200 shadow-sm flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                    </button>
                </div>

                {/* Grille des voyages */}
                <div>
                    {isLoading ? (
                        <AvailableTripsLoadingSkeleton />
                    ) : (
                        <div className="flex flex-col">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {availableTrips &&
                                    availableTrips.length > 0 &&
                                    availableTrips?.map((trip, index) => (
                                        <div
                                            key={trip.idVoyage || index}
                                            className="bg-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-2 transform transition duration-300"
                                        >
                                            <div className="relative h-48">
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src={trip.bigImage || "/placeholder.svg"}
                                                    alt={"agency image"}
                                                    className="w-full h-full object-cover transform transition-all duration-700 hover:scale-110"
                                                />
                                                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                                                    {trip.nomClasseVoyage}
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="text-xl font-bold ">{trip.nomAgence}</h3>
                                                    </div>
                                                    <div className="text-right ml-2">
                                                        <p className="text-2xl font-bold text-reservation-color">{trip.prix} FCFA</p>
                                                        <p className="text-sm text-reservation-color">per Person</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-3 mb-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                                            <Clock className="h-4 w-4 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Departure at: {trip.lieuDepart}</p>
                                                            <p className="text-sm font-medium">Duration: {formatDurationSimple(trip?.dureeVoyage)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                                            <MdAirlineSeatReclineNormal className="text-blue-500 w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Available Seat</p>
                                                            <p className="text-sm font-medium">
                                                                {trip.nbrPlaceReservable}/{trip.nbrPlaceRestante} seats
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 mb-6">
                                                    {trips.amenities.map((amenity, index) => (
                                                        <span key={index} className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                                                          {amenity}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-6 h-6 text-red-600" />
                                                        <span className="font-medium">{trip.lieuDepart}</span>
                                                        <ArrowRight className="h-4 w-4 text-gray-400" />
                                                        <span className="font-medium">{trip.lieuArrive}</span>
                                                    </div>
                                                    <button
                                                        className="px-6 py-2 font-bold bg-reservation-color text-white rounded-lg hover:bg-white hover:border-2 hover:border-reservation-color transition-all duration-300 hover:text-reservation-color"
                                                        onClick={() => router.push(`/available-trips/${trip.idVoyage}`)}
                                                    >
                                                        Book Trip
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {/*Pagination content */}
                            {canRenderPaginationContent && (
                                <div className="w-full flex justify-center mt-8 mb-6">
                                    <div className="flex items-center gap-2 sm:gap-4">
                                        <Tooltip placement={"left"} title={"previous slide"}>
                                            <button className="w-8 h-8 sm:w-10 sm:h-10 text-reservation-color flex items-center justify-center">
                                                <FaArrowLeft />
                                            </button>
                                        </Tooltip>
                                        <div className="flex items-center gap-1 sm:gap-2">
                                            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-reservation-color text-white font-medium flex items-center justify-center shadow-sm">
                                                1
                                            </button>
                                            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white text-reservation-color hover:bg-gray-50 font-medium flex items-center justify-center border-2 border-gray-200">
                                                2
                                            </button>
                                            <button className="hidden sm:flex w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white text-reservation-color hover:bg-gray-50 font-medium items-center justify-center border-2 border-gray-200">
                                                3
                                            </button>
                                            <span className="hidden sm:flex items-center justify-center px-2 text-gray-500">...</span>
                                            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white text-reservation-color hover:bg-gray-50 font-medium flex items-center justify-center border-2 border-gray-200">
                                                {availableTrips?.length}
                                            </button>
                                        </div>
                                        <Tooltip placement={"right"} title={"next slide"}>
                                            <button className="w-8 h-8 sm:w-10 sm:h-10 text-reservation-color flex items-center justify-center">
                                                <FaArrowRight />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <ErrorHandler error={error} dataLength={availableTrips?.length} isSearch={isSearch} />
                </div>
            </div>
        </div>
    )
}

