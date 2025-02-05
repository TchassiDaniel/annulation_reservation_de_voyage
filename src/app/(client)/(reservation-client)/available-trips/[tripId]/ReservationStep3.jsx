import {
    ArrowLeft,
    Briefcase,
    Bus,
    Calendar,
    CheckCircle,
    Clock,
    CreditCard,
    DollarSign, House,
    MapPin, MapPinHouse,
    Users,
    X,
} from "lucide-react"
import { useAuthentication } from "@/Utils/Provider"
import PropTypes from "prop-types"
import { formatDateOnly, formatDateToTime } from "@/Utils/formatDateMethods"
import axiosInstance from "@/Utils/AxiosInstance"
import {PaymentRequestModal} from "@/app/(client)/(reservation-client)/available-trips/[tripId]/PaymentRequestModal";
import {useState} from "react";

export default function ReservationStep3({selectedSeats, tripDetails, passengersData,onClose, setStep, setCanOpenErrorModal, setCanOpenSuccessModal, setErrorMessage, setSuccessMessage, setIsLoading, setReservationPrice}) {


    ReservationStep3.propTypes = {
        selectedSeats: PropTypes.array.isRequired,
        tripDetails: PropTypes.object.isRequired,
        passengersData: PropTypes.object.isRequired,
        onClose: PropTypes.func.isRequired,
        setStep: PropTypes.func.isRequired,
        setCanOpenErrorModal: PropTypes.func.isRequired,
        setCanOpenSuccessModal: PropTypes.func.isRequired,
        setErrorMessage: PropTypes.func.isRequired,
        setSuccessMessage: PropTypes.func.isRequired,
        setIsLoading: PropTypes.func.isRequired,
        setReservationPrice: PropTypes.func.isRequired,
    }

    const totalPassengers = selectedSeats.length
    const totalLuggage = selectedSeats.reduce(
        (sum, seat) => sum + Number.parseInt(passengersData[seat].nbrBaggage, 10),
        0,
    )
    const totalPrice = tripDetails.prix * totalPassengers
    const { userData } = useAuthentication()






    async function bookTrip() {
        setIsLoading(true)
        const passengersArray = Object.keys(passengersData).map((seat) => ({
            placeChoisis: seat,
            ...passengersData[seat],
        }))
        const data = {
            nbrPassager: totalPassengers,
            montantPaye: 0,
            idUser: userData?.userId,
            idVoyage: tripDetails.idVoyage,
            passagerDTO: passengersArray,
        }

        console.log(data)
        try {
            const response = await axiosInstance.post("/reservation/reserver", data)
            if (response.status === 201) {
                setIsLoading(false);
                console.log(response.data);
                setReservationPrice(totalPrice);
                localStorage.setItem('idCurrentReservation', response?.data?.idReservation);
                setCanOpenErrorModal(false);
                setErrorMessage("");
                setSuccessMessage("Reservation created successfully and attempted for your confirmation");
                setCanOpenErrorModal(false);
                setCanOpenSuccessModal(true);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            setSuccessMessage("");
            setErrorMessage("Something went wrong when booking this trip, please try again later !");
            setCanOpenSuccessModal(false);
            setCanOpenErrorModal(true);
        }
    }

    return (
        <div className="p-4 lg:p-8">
            <div className="flex  lg:flex-row justify-between   mb-6">
                <div className="flex items-center gap-4 mb-4 lg:mb-0">
                    <button
                        onClick={() => setStep(2)}
                        className="w-10 h-10 bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition-all duration-300"
                    >
                        <ArrowLeft />
                    </button>
                    <h2 className="text-2xl lg:text-3xl font-semibold text-reservation-color">Reservation Summary</h2>
                </div>
                <button
                    onClick={onClose}
                    className="w-10 h-10 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-all duration-300"
                >
                    <X />
                </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-200">
                <div className="p-4 lg:p-6 border-b border-gray-200">
                    <h3 className="font-semibold text-lg text-reservation-color mb-4 flex items-center">
                        <Bus className="w-6 h-6 mr-2" />
                        Trip Details
                    </h3>
                    <div className="ml-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                        <div className="space-y-3 text-gray-600">
                            <div className="flex items-center">
                                <House className="w-5 h-5 mr-2 text-reservation-color" />
                                <div>
                                    <span className="font-medium text-gray-600">Agency: </span>
                                    <span className="font-bold text-black">{tripDetails.nomAgence}</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Bus className="w-5 h-5 mr-2 text-reservation-color" />
                                <div>
                                    <span className="font-medium text-gray-600">Bus: </span>
                                    <span className="font-bold text-black">{tripDetails.vehicule.plaqueMatricule}</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-reservation-color" />
                                <div>
                                    <span className="font-medium text-gray-600">Departure time: </span>
                                    <span className="font-bold text-black">
                                        {tripDetails?.heureDepartEffectif
                                            ? formatDateToTime(tripDetails?.heureDepartEffectif)
                                            : "not specified"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 text-gray-600">
                            <div className="flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                                <div>
                                    <span className="font-medium text-gray-600">From: </span>
                                    <span className="font-bold text-black">{tripDetails?.lieuDepart}</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-red-600" />
                                <div>
                                    <span className="font-medium text-gray-600">To: </span>
                                    <span className="font-bold text-black">{tripDetails?.lieuArrive}</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-reservation-color" />
                                <div>
                                    <span className="font-medium text-gray-600">Date: </span>
                                    <span className="font-bold text-black">
                    {tripDetails?.dateDepartEffectif
                        ? formatDateOnly(tripDetails?.dateDepartEffectif)
                        : "not specified"}
                  </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 text-gray-600">
                            <div className="flex items-start">
                                <Users className="w-5 h-5 mr-2 text-reservation-color mt-1" />
                                <div>
                                    <span className="font-medium text-gray-600">Selected Seats: </span>
                                    <div className="grid grid-cols-4 gap-1 mt-1">
                                        {selectedSeats.map((seat, index) => (
                                            <div
                                                key={index}
                                                className="w-8 h-7 border-green-500 border-2 rounded-md bg-green-100 flex justify-center items-center"
                                            >
                                                <p className="text-sm text-gray-600 font-semibold">{seat}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Briefcase className="w-5 h-5 mr-2 text-reservation-color" />
                                <div>
                                    <span className="font-medium text-gray-600">Total Luggage: </span>
                                    <span className="font-bold text-black">{totalLuggage}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 lg:p-6 border-b border-gray-200">
                    <h3 className="font-semibold text-lg text-reservation-color mb-4 flex items-center">
                        <Users className="w-6 h-6 mr-2" />
                        Travellers
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {selectedSeats.map((seat) => (
                            <div key={seat} className="bg-gray-100 p-3 rounded-lg">
                                <p className="font-medium text-gray-800">{passengersData[seat].nom}</p>
                                <p className="text-sm text-gray-600">
                                    Seat {seat} - {passengersData[seat].nbrBaggage} luggage(s)
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 lg:p-6">
                    <h3 className="font-semibold text-lg text-reservation-color mb-4 flex items-center">
                        <DollarSign className="w-6 h-6 mr-2" />
                        Price Summary
                    </h3>
                    <div className="space-y-2 text-gray-600">
                        <p className="flex justify-between">
                            <span>Price per traveller</span>
                            <span className="font-bold text-black">{tripDetails.prix} FCFA</span>
                        </p>
                        <p className="flex justify-between">
                            <span>Number of Travellers</span>
                            <span className="font-bold text-black">{totalPassengers}</span>
                        </p>
                        <div className="border-t border-gray-200 pt-2 mt-2">
                            <p className="flex justify-between text-lg font-semibold text-green-500">
                                <span>Total Price</span>
                                <span>{totalPrice} FCFA</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
                <button
                    onClick={async () => await bookTrip()}
                    className="bg-reservation-color text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200 flex items-center justify-center"
                >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Book
                </button>
                <button className="bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to payment
                </button>
            </div>
        </div>
    )
}

