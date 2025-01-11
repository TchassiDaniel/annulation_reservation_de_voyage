'use client';
import  { useState, useEffect } from 'react';

const BusSeats = () => {


    const [selectedSeats, setSelectedSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([]);


    useEffect(() => {

        async function fetchReservedSeats () {
            const mockReservedSeats = [3, 12, 25, 44,1,2,15];
            setReservedSeats(mockReservedSeats);
        }
        console.log(selectedSeats);
        fetchReservedSeats();
    }, [selectedSeats.length]);


    function handleSeatClick (seatNumber)  {
        if (reservedSeats.includes(seatNumber)) {
            return;
        }
        setSelectedSeats(prev => {
            if (prev.includes(seatNumber)) {
                return prev.filter(seat => seat !== seatNumber);
            } else {
                return [...prev, seatNumber];
            }
        });
    }


    function getSeatClass (seatNumber) {
        const baseClass = "w-10 h-10 border-2 ";
        if (reservedSeats.includes(seatNumber)) {
            return baseClass + "border-red-500 bg-red-300 cursor-not-allowed";
        }
        if (selectedSeats.includes(seatNumber)) {
            return baseClass + "border-green-500 bg-green-300";
        }
        return baseClass + "border-reservation-color";
    }

    return (
        <>
            <div className="grid grid-cols-2 w-fit gap-16 min-h-screen overflow-y-auto">

                {/* Première rangée */}
                <div className="grid gap-2 w-fit grid-cols-3 min-h-screen p-2">
                    <div className="col-span-3 border-2 border-reservation-color font-bold h-10 text-center mt-1">
                        Chauffeur
                    </div>
                    {Array.from({length: 42}, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handleSeatClick(index + 1)}
                            disabled={reservedSeats.includes(index + 1)}
                            className={getSeatClass(index + 1)}
                        >
                            {(index + 1) + " "}
                        </button>
                    ))}
                </div>

                {/* Deuxième rangée */}
                <div className="grid grid-cols-2 w-fit gap-2 p-2">
                    {Array.from({length: 12}, (_, index) => {
                        const seatNumber = index + 43;
                        const isPorte = seatNumber === 47 || seatNumber === 48;
                        const displayNumber = isPorte ? "Porte" : (seatNumber >= 47 ? seatNumber - 2 : seatNumber);

                        return (
                            <button
                                key={index}
                                onClick={() => !isPorte && handleSeatClick(displayNumber)}
                                disabled={isPorte || reservedSeats.includes(displayNumber)}
                                className={`${isPorte ? "border-none" : getSeatClass(displayNumber)} w-10 h-10`}
                            >
                                {displayNumber}
                            </button>
                        );
                    })}
                    {Array.from({length: 14}, (_, index) => {
                        const seatNumber = index + 53;
                        const isPorte = seatNumber === 61 || seatNumber === 62;
                        const displayNumber = isPorte ? "Porte" : (seatNumber >= 61 ? seatNumber - 2 : seatNumber);

                        return (
                            <button
                                key={index}
                                onClick={() => !isPorte && handleSeatClick(displayNumber)}
                                disabled={isPorte || reservedSeats.includes(displayNumber)}
                                className={`${isPorte ? "border-none" : getSeatClass(displayNumber)} w-10 h-10`}
                            >
                                {displayNumber}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Dernier banc */}
            <div className="grid  gap-3.5 w-fit grid-cols-6 p-2">
                {Array.from({length: 6}, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handleSeatClick(index + 65)}
                        disabled={reservedSeats.includes(index + 65)}
                        className={getSeatClass(index + 65)}
                    >
                        {index + 65}
                    </button>
                ))}
            </div>

            {/* Affichage des sièges sélectionnés */}
            <div className="mt-4 p-4 border-2 border-reservation-color rounded">
                <h3 className="font-bold mb-2">Sièges sélectionnés: {selectedSeats.sort((a, b) => a - b).join(", ")}</h3>
            </div>
        </>
    );
};

export default BusSeats;