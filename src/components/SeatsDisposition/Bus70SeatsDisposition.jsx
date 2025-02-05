'use client';

import PropTypes from "prop-types";
import {useSeatManager} from "@/Utils/seatDispositionMethods";
import {useEffect} from "react";

export default  function Bus70SeatsDisposition ({setSeats, _reservedSeats}) {

    Bus70SeatsDisposition.propTypes = {
        setSeats: PropTypes.func.isRequired,
        _reservedSeats: PropTypes.array.isRequired
    }

    const {selectedSeats, reservedSeats,setReservedSeats, handleSeatClick, getSeatClass} = useSeatManager();


    useEffect(() => {
        setReservedSeats(_reservedSeats);
        setSeats(selectedSeats);
    }, [selectedSeats?.length, _reservedSeats?.length]);



    return (
        <div className="p-5">
            <div className="grid grid-cols-2 w-fit gap-12 min-h-screen overflow-y-auto">
                {/* Première rangée */}
                <div className="grid lg:gap-3 gap-8 w-fit grid-cols-3 min-h-screen p-2  ">
                    <div className="col-span-3 border-2 border-gray-400 flex justify-center items-center rounded-lg font-bold h-12  mt-1">
                        <p className="text-xl text-reservation-color">Driver</p>
                    </div>
                    {Array.from({length: 42}, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handleSeatClick(index + 1)}
                            disabled={reservedSeats.includes(index + 1)}
                            className={getSeatClass(index + 1)}
                        >
                            {(index + 1)}
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
                                className={`${isPorte ? "border-none" : getSeatClass(displayNumber)}`}
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
                                className={`${isPorte ? "border-none" : getSeatClass(displayNumber)}`}
                            >
                                {displayNumber}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Dernier banc */}
            <div className="grid  gap-2 w-fit grid-cols-6 p-2">
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
        </div>
    );
};

