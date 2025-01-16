'use client';
import {useEffect} from 'react';
import {useSeatManager} from "@/Utils/seatDispositionMethods";
import PropTypes from "prop-types";

export default  function Bus75SeatsDisposition({setSelectedSeats}) {

    Bus75SeatsDisposition.propTypes = {
        setSelectedSeats: PropTypes.func.isRequired
    }


    const {selectedSeats, reservedSeats, handleSeatClick, getSeatClass} = useSeatManager();


    useEffect(() => {
        setSelectedSeats(selectedSeats);
    }, [selectedSeats.length]);


    return (
        <div className="p-5">
            <div className="grid grid-cols-2 w-fit gap-12 min-h-screen overflow-y-auto">
                {/* Premiere rangee */}
                <div className="grid gap-2 w-fit grid-cols-3 min-h-screen p-2">
                    <div className="col-span-3 border-2 border-gray-400 flex justify-center items-center rounded-lg font-bold h-12  mt-1">
                        <p className="text-xl text-reservation-color">Chauffeur</p>
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
                    {Array.from({length: 12}, (_, index) => {
                       const seatNumber = index + 46;
                       const isDoor = seatNumber === 50 || seatNumber === 51;
                       const displayNumber = isDoor ? "Porte" : seatNumber >=50 ? (seatNumber - 2) : seatNumber;

                        return (
                            <button
                                disabled={seatNumber=== 50 || seatNumber === 51}
                                key={index}
                                onClick={() => !isDoor&& handleSeatClick(displayNumber)}
                                className={`${isDoor ? "border-none" : getSeatClass(displayNumber)}`}
                            >
                                {displayNumber}
                            </button>
                        )
                    })}
                    {Array.from({length: 16}, (_, index) => {
                        const seatNumber = index + 56;
                        const isDoor = seatNumber === 64 || seatNumber === 65;
                        const displayNumber = isDoor ? "Porte" : seatNumber >=64 ? (seatNumber - 2): seatNumber;

                        return (
                            <button
                                disabled={seatNumber === 64 || seatNumber === 65}
                                key={index}
                                onClick={() => !isDoor && handleSeatClick(displayNumber)}
                                className={`${isDoor ? "border-none" : getSeatClass(displayNumber)}`}
                            >
                                {displayNumber}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/*  Dernier banc avec 6 places  */}
            <div className="grid gap-2 w-fit grid-cols-6 p-2">
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
        </div>
    );
};

