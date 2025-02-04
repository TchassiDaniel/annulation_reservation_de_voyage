import {MapPin, X} from "lucide-react";
import {FaCalendar, FaChair, FaDollarSign, FaMoneyBill, FaUsers} from "react-icons/fa";
import Bus70SeatsDisposition from "@/components/SeatsDisposition/Bus70SeatsDisposition";
import Bus75SeatsDisposition from "@/components/SeatsDisposition/Bus75SeatsDisposition";
import Bus80SeatsDisposition from "@/components/SeatsDisposition/Bus80SeatsDisposition";
import Bus56SeatsDisposition from "@/components/SeatsDisposition/Bus56SeatsDisposition";
import {useEffect, useState} from "react";
import {FaHouse} from "react-icons/fa6";
import PropTypes from "prop-types";
import {formatDateOnly} from "@/Utils/formatDateMethods";

export default function ReservationStep1({tripDetails, setSelectedSeats, selectedSeats, onClose, onContinue}) {


    ReservationStep1.propTypes = {
        tripDetails: PropTypes.object.isRequired,
        setSelectedSeats: PropTypes.func.isRequired,
        selectedSeats: PropTypes.array.isRequired,
        onClose: PropTypes.func.isRequired,
        onContinue: PropTypes.func.isRequired

    }

    const [totalPrice, setTotalPrice] = useState(0);


    useEffect(() => {
        if(selectedSeats.length > 0 && tripDetails.prix) {
            setTotalPrice(selectedSeats.length * tripDetails.prix);
        }
        if (selectedSeats.length === 0) {
            setTotalPrice(0);
        }
    }, [selectedSeats.length, tripDetails.prix]);


    const reservationDetails = [
        { icon: FaHouse, label: "Travel agency", value: tripDetails.nomAgence },
        { icon: FaCalendar, label: "Travel date", value: formatDateOnly(tripDetails?.dateDepartPrev) },
        {icon: MapPin, label: "Departure location", value: tripDetails?.lieuDepart },
        { icon: MapPin, label: "Arrival Location", value: tripDetails?.lieuArrive  },
        { icon: FaMoneyBill, label: "Unit price", value: tripDetails?.prix + " FCFA" },
    ];

    return (
        <>
            <button onClick={onClose}
                    className="fixed top-20 right-[270px] bg-red-100 rounded-full cursor-pointer w-10 h-10 flex items-center justify-center">
                <X className="w-8 h-6 text-red-500  hover:w-10 hover:h-10 hover:text-red-600 transition-all duration-300"/>
            </button>

            <div className="flex h-[630px]">
                <div className="w-1/2 h-full overflow-y-auto flex flex-col  p-7">
                    <h1 className="mb-10 text-2xl text-reservation-color font-bold">
                        Booking Details
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
                                <p className="text-sm font-medium text-gray-500">Number of places to
                                    reserve</p>
                                <p className="text-lg font-semibold text-gray-800">{selectedSeats.length === !0 ? " - " : selectedSeats.length}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <FaDollarSign className="w-5 h-5 text-green-500 mr-3"/>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500">Total Price</p>
                                <p className="text-lg font-semibold text-green-500">{totalPrice + " FCFA"}</p>
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

                    <div className="justify-center flex">
                        <button
                            onClick={onContinue}
                            className="bg-reservation-color mt-6 font-bold text-white w-fit py-2 px-6 rounded-lg  transition-all duration-300 disabled:bg-gray-400/80  disabled:cursor-not-allowed"
                            disabled={selectedSeats.length === 0}
                        >
                            Continue
                        </button>
                    </div>
                </div>


                <div className="w-1/2 p-6 bg-gray-50 h-full overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-reservation-color mb-1">Selection of places</h3>
                    <p className="italic text-md mb-6 text-gray-600">Please choose the seat(s) you want to book</p>
                    <div className="ml-7 flex gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg border-2 border-gray-500 bg-gray-200"/>
                            <span className="text-sm text-gray-500 font-medium">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-8 h-8 rounded-lg  bg-green-300 border-2 border-green-500"/>
                            <span className="text-sm text-green-600 font-medium">Selected </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg  bg-red-300 border-2 border-red-500"/>
                            <span className="text-sm text-red-600 font-medium">Reserved </span>
                        </div>
                    </div>
                    {tripDetails.nbrPlaceRestante === 70 && <Bus70SeatsDisposition setSeats={setSelectedSeats} _reservedSeats={tripDetails?.placeReservees}/>}
                    {tripDetails.nbrPlaceRestante === 75 && <Bus75SeatsDisposition setSelectedSeats={setSelectedSeats} _reservedSeats={tripDetails?.placeReservees}/>}
                    {tripDetails.nbrPlaceRestante === 80 && <Bus80SeatsDisposition setSelectedSeats={setSelectedSeats} _reservedSeats={tripDetails?.placeReservees}/>}
                    {tripDetails.nbrPlaceRestante === 56 && <Bus56SeatsDisposition setSelectedSeats={setSelectedSeats} _reservedSeats={tripDetails?.placeReservees}/>}
                </div>
            </div>

        </>
    );
}