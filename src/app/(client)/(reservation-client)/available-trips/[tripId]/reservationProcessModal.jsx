'use client';
import {useEffect, useState} from 'react';
import {X, ArrowLeft, CreditCard, Users, Calendar, Briefcase, MapPin, Clock, Bus, DollarSign, CheckCircle} from 'lucide-react';
import {FaUsers} from "react-icons/fa";
import axiosInstance from "@/Utils/AxiosInstance";
import {useAuthentication} from "@/Utils/Provider";
import PassengerForm from "@/app/(client)/(reservation-client)/available-trips/[tripId]/PassengerForm";
import TicketPreview from "@/app/(client)/(reservation-client)/available-trips/[tripId]/TicketPreview";



export default function ReservationSteps({selectedSeats, tripDetails, onBack, onClose}) {

    const [step, setStep] = useState(1);


    const {userData} = useAuthentication();



    const totalPassengers = selectedSeats.length;
    const totalLuggage = selectedSeats.reduce((sum, seat) => sum + (passengersData[seat].nbrBaggage || 0), 0);
    const totalPrice = tripDetails.prix * totalPassengers;


    function handlePassengerDataChange  (seatNumber, field, value)  {
        setPassengersData(prev => ({
            ...prev,
            [seatNumber]: {
                ...prev[seatNumber],
                [field]: value
            }
        }));
    }



    async function bookTrip()
    {

        const passengersArray = Object.keys(passengersData).map(seat => ({
            placeChoisis: seat,
            ...passengersData[seat]
        }));

        let data = {
            nbrPassager: totalPassengers,
            montantPaye: 0,
            idUser: userData?.userId,
            idVoyage: tripDetails.tripId,
            passagerDTO: passengersArray,
        }

        console.log(data);
        try
        {
            //const response = await axiosInstance.post("/reservation/reserver",data);

        }
        catch (error)
        {

        }

    }


    function isPassengerDataComplete()  {
        return selectedSeats.every(seat => {
            const data = passengersData[seat];
            return data.nom && data.genre && data.age && data.numeroPieceIdentific && data.nbrBaggage;
        });
    }


    if (step === 1) {
        return (
            <div className="flex h-full">
                {/* Formulaire à gauche */}
                <div className="w-1/2 p-6 overflow-y-auto">
                    <div className="flex gap-4 mb-6 items-center">
                        <button
                            onClick={() => {
                                onBack()
                            }}
                            className="w-10 h-15 bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition-all duration-300"
                        >
                            <ArrowLeft/>
                        </button>
                        <div className="flex gap-1 ml-10 mt-1">
                            <FaUsers className="text-reservation-color text-3xl"/>
                            <h2 className="text-2xl font-semibold text-reservation-color">
                                Passenger Information
                            </h2>
                        </div>
                    </div>

                    {selectedSeats.map((seatNumber, index) => (
                        <PassengerForm
                            key={seatNumber}
                            seatNumber={seatNumber}
                            index={index}
                            onChange={handlePassengerDataChange}
                            passengerData={passengersData[seatNumber]}
                        />
                    ))}

                    <div className="flex justify-center">
                        <button
                            onClick={() => setStep(2)}
                            disabled={!isPassengerDataComplete()}
                            className="bg-reservation-color text-white py-3 px-6 rounded-lg font-semibold disabled:bg-gray-400 mt-4"
                        >
                            Continue to Summary
                        </button>
                    </div>
                </div>

                {/* Prévisualisation à droite */}
                <div className="w-1/2 bg-gray-50 p-6 overflow-y-auto">
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
        );
    }

    if (step === 2) {
        return (
            <div className="w-full p-8">
                <div className="flex justify-between">
                    <div className="flex gap-5 mb-4 items-center">
                        <button
                            onClick={() => {
                                setStep(1)
                            }}
                            className="w-10 h-15 bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition-all duration-300"
                        >
                            <ArrowLeft/>
                        </button>
                        <div className="flex gap-1 mt-1">
                            <h2 className="text-3xl font-semibold text-reservation-color">
                                Reservation Summary
                            </h2>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-all duration-300"
                    >
                        <X/>
                    </button>

                </div>

                <div className="rounded-xl  overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="font-semibold text-lg text-reservation-color mb-4 flex items-center">
                            <Bus className="w-7 h-7 mr-2"/>
                            Trip Details
                        </h3>
                        <div className="ml-7 grid grid-cols-1 md:grid-cols-3 gap-6">

                            <div className="space-y-3 text-gray-600">
                                <p className="flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-reservation-color"/>
                                    <span className="font-medium">Agency: </span> {" " + tripDetails.nomAgence}
                                </p>
                                <p className="flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-reservation-color"/>
                                    <span
                                        className="font-medium">Bus: </span> {" " + tripDetails.vehicule.plaqueMatricule}
                                </p>
                                <p className="flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-reservation-color"/>
                                    <span
                                        className="font-medium">Departure time:</span> {tripDetails.heureDepartEffectif ? new Date(tripDetails?.heureDepartEffectif).toISOString().slice(11, 16) : "not specified"}
                                </p>
                            </div>


                            <div className="space-y-3 text-gray-600">
                                <p className="flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-reservation-color"/>
                                    <span className="font-medium">From:</span> {" " + tripDetails.lieuDepart}
                                </p>
                                <p className="flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-reservation-color"/>
                                    <span className="font-medium">To:</span> {" " + tripDetails.lieuArrive}
                                </p>
                                <p className="flex items-center">
                                    <Calendar className="w-5 h-5 mr-2 text-reservation-color"/>
                                    <span
                                        className="font-medium">Date:</span> {tripDetails.dateDepartEffectif ? new Date(tripDetails?.dateDepartEffectif).toLocaleDateString('en-EN', {dateStyle: 'long'}) : " - "}
                                </p>
                            </div>

                            <div className="space-y-3 text-gray-600">
                                <p className="flex items-center">
                                    <Users className="w-5 h-5 mr-2 text-reservation-color"/>
                                    <span className="font-medium">Selected Seats:</span> {selectedSeats.join(', ')}
                                </p>
                                <p className="flex items-center">
                                    <Briefcase className="w-5 h-5 mr-2 text-reservation-color"/>
                                    <span className="font-medium">Total of Luggage</span> {totalLuggage}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-b border-gray-200">
                        <h3 className="font-semibold text-lg text-reservation-color mb-4 flex items-center">
                            <Users className="w-7 h-7 mr-2"/>
                            Travellers
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {selectedSeats.map(seat => (
                                <div key={seat} className="bg-gray-50 p-3 rounded-lg">
                                    <p className="font-medium text-gray-800">{passengersData[seat].nom}</p>
                                    <p className="text-sm text-gray-600">Seat {seat} - {passengersData[seat].nbrBaggage} luggage(s)</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6">
                        <h3 className="font-semibold text-lg text-reservation-color mb-4 flex items-center">
                            <DollarSign className="w-7 h-7 mr-2"/>
                            Price Summary
                        </h3>
                        <div className="space-y-2 text-gray-600">
                            <p className="ml-7 flex justify-between">
                                <span>Price per traveller</span>
                                <span className="font-medium">{tripDetails.prix} FCFA</span>
                            </p>
                            <p className="ml-7 flex justify-between">
                                <span>Number of Traveller</span>
                                <span className="font-medium">{totalPassengers}</span>
                            </p>

                            <div className="border-t border-gray-200 pt-2 mt-2">
                                <p className="ml-7 flex justify-between text-lg font-semibold text-green-500">
                                    <span>Total Price</span>
                                    <span>{totalPrice} FCFA</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
                    <button
                        onClick={async ()=>{ await bookTrip() /*setStep(0),onClose()*/}}
                        className="bg-reservation-color text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-200 flex items-center justify-center"
                    >
                        <CheckCircle className="w-5 h-5 mr-2"/>
                        Book
                    </button>
                    <button
                        className="bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center"
                    >
                        <CreditCard className="w-5 h-5 mr-2"/>
                        Proceed to payment
                    </button>
                </div>
            </div>
        );
    }
}





