'use client';
import { useState } from 'react';
import { ArrowLeft, User, Luggage, CreditCard } from 'lucide-react';




function PassengerForm ({ seatNumber, index, onChange, passengerData }) {
    return (
    <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-reservation-color mb-3">
            Passenger {index + 1} - Seat {seatNumber}
        </h3>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <input
                    type="text"
                    placeholder={"first name"}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-reservation-color"
                    onChange={(e) => onChange(seatNumber, 'firstName', e.target.value)}
                    value={passengerData.firstName || ''}
                />
            </div>
            <div>
                <input
                    placeholder={"last name"}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-reservation-color"
                    onChange={(e) => onChange(seatNumber, 'lastName', e.target.value)}
                    value={passengerData.lastName || ''}
                />
            </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-4">
            <div className="col-span-1">
                <input
                    placeholder={"Age"}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-reservation-color"
                    onChange={(e) => onChange(seatNumber, 'age', e.target.value)}
                    value={passengerData.age || ''}
                />
            </div>

            <div className="col-span-1">
                <input
                    placeholder={"luggage"}
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-reservation-color"
                    min="0"
                    onChange={(e) => onChange(seatNumber, 'luggage', e.target.value)}
                    value={passengerData.luggage || ''}
                />
            </div>
            <div className="col-span-2">
                <input
                    placeholder={"id card number"}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-reservation-color"
                    onChange={(e) => onChange(seatNumber, 'idCard', e.target.value)}
                    value={passengerData.idCard || ''}
                />
            </div>
        </div>
    </div>)
}

function TicketPreview({passengerData, seatNumber}) {
    return (
        <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
                <User className="w-5 h-5 text-reservation-color"/>
                <h4 className="font-medium">{passengerData.firstName} {passengerData.lastName}</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div>Seat: <span className="font-medium">{seatNumber}</span></div>
                <div>Age: <span className="font-medium">{passengerData.age}</span></div>
                <div>ID: <span className="font-medium">{passengerData.idCard}</span></div>
                <div className="flex items-center gap-1">
                    <Luggage className="w-4 h-4"/>
                    <span className="font-medium">{passengerData.luggage}</span>
                </div>
            </div>
        </div>
    )
}


export default function ReservationSteps({selectedSeats, tripDetails, onBack}) {

    const [step, setStep] = useState(1);
    const [passengersData, setPassengersData] = useState(
        Object.fromEntries(selectedSeats.map(seat => [seat, {}]))
    );

    const handlePassengerDataChange = (seatNumber, field, value) => {
        setPassengersData(prev => ({
            ...prev,
            [seatNumber]: {
                ...prev[seatNumber],
                [field]: value
            }
        }));
    };

    const isPassengerDataComplete = () => {
        return selectedSeats.every(seat => {
            const data = passengersData[seat];
            return data.firstName && data.lastName && data.age && data.idCard && data.luggage;
        });
    };

    if (step === 1) {
        return (
            <div className="flex h-full">
                {/* Formulaire à gauche */}
                <div className="w-1/2 p-6 overflow-y-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={onBack}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <ArrowLeft className="w-5 h-5 text-reservation-color" />
                        </button>
                        <h2 className="text-2xl font-semibold text-reservation-color">
                            Passenger Information
                        </h2>
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

                    <button
                        onClick={() => setStep(2)}
                        disabled={!isPassengerDataComplete()}
                        className="w-full bg-reservation-color text-white py-3 px-6 rounded-lg font-semibold disabled:bg-gray-400 mt-4"
                    >
                        Continue to Summary
                    </button>
                </div>

                {/* Prévisualisation à droite */}
                <div className="w-1/2 bg-gray-50 p-6 overflow-y-auto">
                    <h2 className="text-2xl font-semibold text-reservation-color mb-6">
                        Ticket Preview
                    </h2>
                    {selectedSeats.map(seatNumber => (
                        <TicketPreview
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
            <div className="p-8 max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => setStep(1)}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <ArrowLeft className="w-5 h-5 text-reservation-color" />
                    </button>
                    <h2 className="text-2xl font-semibold text-reservation-color">
                        Reservation Summary
                    </h2>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="font-semibold text-lg text-reservation-color mb-4">
                                Travel Details
                            </h3>
                            <div className="space-y-2 text-gray-600">
                                <p><span className="font-medium">Agency:</span> {tripDetails.agencyName}</p>
                                <p><span className="font-medium">From:</span> {tripDetails.lieuDepart}</p>
                                <p><span className="font-medium">To:</span> {tripDetails.lieuArrive}</p>
                                <p><span className="font-medium">Date:</span> {new Date(tripDetails.dateDepartPrev).toLocaleDateString('en-EN', {dateStyle: 'long'})}</p>
                                <p><span className="font-medium">Selected Seats:</span> {selectedSeats.join(', ')}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-reservation-color mb-4">
                                Passengers
                            </h3>
                            <div className="space-y-3">
                                {selectedSeats.map(seat => (
                                    <div key={seat} className="text-gray-600">
                                        <p className="font-medium">{passengersData[seat].firstName} {passengersData[seat].lastName}</p>
                                        <p className="text-sm">Seat {seat} - {passengersData[seat].luggage} luggage(s)</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            className="bg-reservation-color text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90"
                        >
                            Confirm Reservation
                        </button>
                        <button
                            className="bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600"
                        >
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Proceed to Payment
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}





