import {ArrowLeft, X} from "lucide-react";
import {FaUsers} from "react-icons/fa";
import TravellerInfosForm from "@/app/(client)/(reservation-client)/available-trips/[tripId]/TravellerInfosForm";
import TicketPreview from "@/app/(client)/(reservation-client)/available-trips/[tripId]/TicketPreview";
import {useState} from "react";
import PropTypes from "prop-types";


export default function ReservationStep2({selectedSeats, tripDetails, onBack, onClose,  setStep, setPassengers})
{


    ReservationStep2.propTypes = {
        selectedSeats: PropTypes.array.isRequired,
        tripDetails: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        setPassengers: PropTypes.func.isRequired,
        setStep: PropTypes.func.isRequired
    };


    const [passengersData, setPassengersData] = useState(
        Object.fromEntries(selectedSeats.map(seat => [seat, {}]))
    );

    function handlePassengerDataChange(seatNumber, field, value)  {
        setPassengersData(prev => ({
            ...prev,
            [seatNumber]: {
                ...prev[seatNumber],
                [field]: value
            }
        }));
    }

    function isPassengerDataComplete()  {
        return selectedSeats.every(seat => {
            const data = passengersData[seat];
            return data.nom && data.genre && data.age && data.numeroPieceIdentific && data.nbrBaggage;
        });
    }

    return (
        <div className="flex max-h-[630px]">
            <div className="w-1/2 p-6 overflow-y-auto h-full">
                <div className="flex gap-4 mb-6 items-center">
                    <button
                        onClick={onBack}
                        className="w-10 h-15 bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition-all duration-300"
                    >
                        <ArrowLeft/>
                    </button>
                    <div className="flex gap-1 ml-10 mt-1">
                        <FaUsers className="text-reservation-color text-3xl"/>
                        <h2 className="text-2xl font-semibold text-reservation-color">
                            Traveler information
                        </h2>
                    </div>
                </div>
                {selectedSeats.map((seatNumber ) => (<TravellerInfosForm key={seatNumber}
                                                                        seatNumber={seatNumber}
                                                                        onChange={handlePassengerDataChange}
                                                                        passengerData={passengersData[seatNumber]}
                />))}
                <div className="flex justify-center">
                    <button
                        onClick={() => {setStep(3), setPassengers(passengersData)}}
                        disabled={!isPassengerDataComplete()}
                        className="bg-reservation-color text-white py-3 px-6 rounded-lg font-semibold disabled:bg-gray-400 mt-4"
                    >
                        Continue to Summary
                    </button>
                </div>
            </div>


            <div className="w-1/2 bg-gray-50 p-6 overflow-y-auto h-full">
                <div className="mt-1 flex justify-between">
                    <h2 className="text-2xl font-semibold text-reservation-color mb-6">
                        Ticket Preview
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-all duration-300"
                    >
                        <X/>
                    </button>
                </div>
                {selectedSeats.map(seatNumber => (
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