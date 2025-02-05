import { ArrowLeft, X } from "lucide-react"
import TravellerInfosForm from "./TravellerInfosForm"
import TicketPreview from "./TicketPreview"
import { useState } from "react"
import PropTypes from "prop-types"

export default function ReservationStep2({ selectedSeats, tripDetails, onBack, onClose, setStep, setPassengers }) {
    ReservationStep2.propTypes = {
        selectedSeats: PropTypes.array.isRequired,
        tripDetails: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        setPassengers: PropTypes.func.isRequired,
        setStep: PropTypes.func.isRequired,
    }

    const [passengersData, setPassengersData] = useState(Object.fromEntries(selectedSeats.map((seat) => [seat, {}])))

    function handlePassengerDataChange(seatNumber, field, value) {
        setPassengersData((prev) => ({
            ...prev,
            [seatNumber]: {
                ...prev[seatNumber],
                [field]: value,
            },
        }))
    }

    function isPassengerDataComplete() {
        return selectedSeats.every((seat) => {
            const data = passengersData[seat]
            return data.nom && data.genre && data.age && data.numeroPieceIdentific && data.nbrBaggage
        })
    }

    return (
        <div className="flex flex-col lg:flex-row h-full">
            <div className="w-full lg:w-1/2 p-4 lg:p-6 overflow-y-auto h-full">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="w-10 h-10 bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition-all duration-300"
                        >
                            <ArrowLeft />
                        </button>
                        <h2 className="text-2xl font-semibold text-reservation-color">Traveler information</h2>
                    </div>
                    <button onClick={onClose} className="lg:hidden bg-red-100 rounded-full p-2">
                        <X className="w-6 h-6 text-red-500" />
                    </button>
                </div>
                {selectedSeats.map((seatNumber) => (
                    <TravellerInfosForm
                        key={seatNumber}
                        seatNumber={seatNumber}
                        onChange={handlePassengerDataChange}
                        passengerData={passengersData[seatNumber]}
                    />
                ))}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => {
                            setStep(3)
                            setPassengers(passengersData)
                        }}
                        disabled={!isPassengerDataComplete()}
                        className="bg-reservation-color text-white py-3 px-6 rounded-lg font-semibold disabled:bg-gray-400"
                    >
                        Continue to Summary
                    </button>
                </div>
            </div>

            <div className="w-full lg:w-1/2 bg-gray-50 p-4 lg:p-6 overflow-y-auto h-full">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-reservation-color">Ticket Preview</h2>
                    <button
                        onClick={onClose}
                        className="cursor-not-allowed lg:cursor-pointer lg:w-10 lg:h-10 lg:bg-red-100 lg:text-red-600 lg:p-2 lg:rounded-full lg:hover:bg-red-200 lg:transition-all lg:duration-300"
                    >
                        <X  className="text-transparent lg:text-red-500 " />
                    </button>
                </div>
                {selectedSeats.map((seatNumber) => (
                    <TicketPreview
                        tripDetails={tripDetails}
                        key={seatNumber}
                        seatNumber={seatNumber}
                        passengerData={passengersData[seatNumber]}
                    />
                ))}
            </div>
        </div>
    )
}

