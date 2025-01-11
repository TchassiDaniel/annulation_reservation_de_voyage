'use client';
import React, { useState, useEffect } from 'react';

const Bus75Seats = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);

    useEffect(() => {
        const fetchReservedSeats = async () => {
            // Simuler les sièges réservés - à remplacer par votre appel API
            const mockReservedSeats = [3, 12, 25, 44];
            setReservedSeats(mockReservedSeats);
        };
        fetchReservedSeats();
    }, []);

    const handleSeatClick = (seatNumber) => {
        if (reservedSeats.includes(seatNumber)) return;
        setSelectedSeats(prev =>
            prev.includes(seatNumber)
                ? prev.filter(seat => seat !== seatNumber)
                : [...prev, seatNumber]
        );
    };

    const getSeatClass = (seatNumber) => {
        const baseClass = "w-10 h-10 border-2 border-reservation-color";
        if (reservedSeats.includes(seatNumber)) {
            return `${baseClass} bg-gray-300 cursor-not-allowed`;
        }
        if (selectedSeats.includes(seatNumber)) {
            return `${baseClass} bg-green-100`;
        }
        return baseClass;
    };

    return (
        <>
            <div className="grid grid-cols-2 w-fit gap-16 min-h-screen overflow-y-auto">
                {/* Premiere rangee */}
                <div className="grid gap-2 w-fit grid-cols-3 min-h-screen p-2">
                    <div className="col-span-3 border-2 border-reservation-color font-bold h-10 text-center mt-1">
                        Chauffeur
                    </div>
                    {Array.from({length: 45}, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handleSeatClick(index + 1)}
                            disabled={reservedSeats.includes(index + 1)}
                            className={getSeatClass(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {/* Deuxieme rangee */}
                <div className="grid grid-cols-2 w-fit gap-2 p-2">
                    {Array.from({length: 12}, (_, index) => (
                        <button
                            disabled={(index + 46) === 51 || (index + 46) === 52}
                            key={index}
                            onClick={() => !((index + 46) === 51 || (index + 46) === 52) && handleSeatClick(index + 46)}
                            className={`${(index + 46) === 51 || (index + 46) === 52 ? "border-none" : getSeatClass(index + 46)} w-10 h-10`}
                        >
                            {((index + 46) === 51 || (index + 46) === 52) ? "Porte" : ((index + 46) >= 51) ? (index + 44) : (index + 46)}
                        </button>
                    ))}
                    {Array.from({length: 12}, (_, index) => (
                        <button
                            disabled={(index + 58) === 63 || (index + 58) === 64}
                            key={index}
                            onClick={() => !((index + 58) === 63 || (index + 58) === 64) && handleSeatClick(index + 58)}
                            className={`${(index + 58) === 63 || (index + 58) === 64 ? "border-none" : getSeatClass(index + 58)} w-10 h-10`}
                        >
                            {(index + 58) === 63 || (index + 58) === 64 ? "Porte" : (index + 58 >= 63) ? (index + 56) : (index + 58)}
                        </button>
                    ))}
                </div>
            </div>

            {/*  Dernier banc avec 6 places  */}
            <div className="grid gap-3.5 w-fit grid-cols-6 p-2">
                {Array.from({length: 6}, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handleSeatClick(index + 70)}
                        disabled={reservedSeats.includes(index + 70)}
                        className={getSeatClass(index + 70)}
                    >
                        {index + 70}
                    </button>
                ))}
            </div>

            {/* Affichage des sièges sélectionnés */}
            <div className="mt-4 p-4 border-2 border-reservation-color rounded">
                <h3 className="font-bold mb-2">
                    Sièges sélectionnés: {selectedSeats.sort((a, b) => a - b).join(", ")}
                </h3>
            </div>
        </>
    );
};

export default Bus75Seats;