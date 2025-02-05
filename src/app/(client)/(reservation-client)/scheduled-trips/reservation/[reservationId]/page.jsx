"use client"

import React from "react"
import {
    ArrowLeft,
    Printer,
    Download,
    Share2,
    MapPin,
    Calendar,
    Clock,
    Building,
    CreditCard,
    Users,
    Truck,
    AlertTriangle,
    AlertCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ReservationDetails({ params }) {
    const reservation = {
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
        cancellationPolicy:
            "Free cancellation up to 24 hours before departure. 50% refund for cancellations made less than 24 hours before departure.",
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
                ticketPrice: 7000,
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
                ticketPrice: 7000,
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
                ticketPrice: 7000,
            },
        ],
    }
    const reservationId = React.use(params).reservationId
    const router = useRouter()

    return (
        <div className=" mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            router.back()
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">Reservation Details</h1>
                        <p className="text-gray-500">Booking Reference: 1</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download All
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Reservation Summary */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h2 className="font-semibold text-lg mb-4">Reservation Summary</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                        reservation.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                  {reservation.status}
                </span>
                                <span className="px-2 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {reservation.class}
                </span>
                            </div>

                            <div className="space-y-3">
                                {/* Route Info */}
                                <div className="flex items-center gap-2">
                                    <MapPin className="text-gray-500 h-5 w-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Route</p>
                                        <p className="font-medium">
                                            {reservation.departure} - {reservation.arrival}
                                        </p>
                                    </div>
                                </div>

                                {/* Agency Info */}
                                <div className="flex items-center gap-2">
                                    <Building className="text-gray-500 h-5 w-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Agency</p>
                                        <p className="font-medium">{reservation.agencyName}</p>
                                    </div>
                                </div>

                                {/* Bus Info */}
                                <div className="flex items-center gap-2">
                                    <Truck className="text-gray-500 h-5 w-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Bus</p>
                                        <p className="font-medium">{reservation.busRegistration}</p>
                                    </div>
                                </div>

                                {/* Date Info */}
                                <div className="flex items-center gap-2">
                                    <Calendar className="text-gray-500 h-5 w-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-medium">{reservation.departureDate}</p>
                                    </div>
                                </div>

                                {/* Time Info */}
                                <div className="flex items-center gap-2">
                                    <Clock className="text-gray-500 h-5 w-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Time</p>
                                        <p className="font-medium">{reservation.departureTime}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 my-4"></div>

                            <div className="space-y-3">
                                {/* Passengers Info */}
                                <div className="flex items-center gap-2">
                                    <Users className="text-gray-500 h-5 w-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Passengers</p>
                                        <p className="font-medium">{reservation.passengers.length} passengers</p>
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div className="flex items-center gap-2">
                                    <CreditCard className="text-gray-500 h-5 w-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Payment</p>
                                        <p className="font-medium">{reservation.amountPaid} FCFA</p>
                                    </div>
                                </div>

                                {/* Payment Deadline */}
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="text-gray-500 h-5 w-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Payment Deadline</p>
                                        <p className="font-medium">{reservation.paymentDeadline}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Cancellation Policy */}
                            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                                <h3 className="font-semibold text-yellow-800 flex items-center gap-2 mb-2">
                                    <AlertTriangle className="h-5 w-5" />
                                    Cancellation Policy
                                </h3>
                                <p className="text-sm text-yellow-700">{reservation.cancellationPolicy}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Passenger Details */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <h2 className="text-xl font-semibold p-6 border-b border-gray-200">Passenger Details</h2>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {reservation.passengers.map((passenger, index) => (
                                    <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-semibold text-lg">{passenger.name}</h3>
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {passenger.type}
                      </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <p>
                                                <span className="text-gray-500">Age:</span> {passenger.age}
                                            </p>
                                            <p>
                                                <span className="text-gray-500">Gender:</span> {passenger.gender}
                                            </p>
                                            <p>
                                                <span className="text-gray-500">ID Card:</span> {passenger.idNumber}
                                            </p>
                                            <p>
                                                <span className="text-gray-500">Seat:</span> {passenger.seatNumber}
                                            </p>
                                            <p>
                                                <span className="text-gray-500">Luggage:</span> {passenger.luggageCount}
                                            </p>
                                            <p>
                                                <span className="text-gray-500">Ticket Price:</span> {passenger.ticketPrice} FCFA
                                            </p>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <p className="text-sm">
                                                <span className="text-gray-500">Phone:</span> {passenger.phone}
                                            </p>
                                            <p className="text-sm">
                                                <span className="text-gray-500">Email:</span> {passenger.email}
                                            </p>
                                        </div>
                                        <button className="mt-4 w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300 flex items-center justify-center gap-2">
                                            <Printer className="h-4 w-4" />
                                            Print Ticket
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

