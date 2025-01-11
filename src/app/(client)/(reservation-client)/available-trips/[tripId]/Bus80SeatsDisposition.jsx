'use client';
import {useEffect} from 'react';
import {useSeatManager} from "@/Utils/utilsMethods";
import PropTypes from "prop-types";

export default  function Bus80SeatsDisposition({setSelectedSeats}) {

    Bus80SeatsDisposition.propTypes =
        {
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
                    {Array.from({length: 48}, (_, index) => (
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
                        const seatNumber = index + 49;
                        const isDoor = seatNumber === 53 || seatNumber === 54;
                        const displayNumber = isDoor ? "Porte" : seatNumber >= 53 ? (seatNumber - 2) : seatNumber;

                        return (
                            <button
                                disabled={seatNumber === 53 || seatNumber === 54}
                                key={index}
                                onClick={() => !isDoor&& handleSeatClick(displayNumber)}
                                className={`${isDoor ? "border-none" : getSeatClass(displayNumber)}`}
                            >
                                {displayNumber}
                            </button>
                        )
                    })}
                    {Array.from({length: 18}, (_, index) => {
                        const seatNumber = index + 59;
                        const isDoor = seatNumber === 71 || seatNumber === 72;
                        const displayNumber = isDoor ? "Porte" : seatNumber >=71 ? (seatNumber - 2): seatNumber;

                        return (
                            <button
                                disabled={seatNumber === 71 || seatNumber === 72}
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
                        onClick={() => handleSeatClick(index + 75)}
                        disabled={reservedSeats.includes(index + 75)}
                        className={getSeatClass(index + 75)}
                    >
                        {index + 75}
                    </button>
                ))}
            </div>
        </div>
    );
};

