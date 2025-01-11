'use client';
import {useEffect} from 'react';
import {useSeatManager} from "@/Utils/utilsMethods";
import PropTypes from "prop-types";

export default  function Bus56SeatsDisposition({setSelectedSeats}) {

    Bus56SeatsDisposition.propTypes =
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
                <div className="grid gap-2 w-fit grid-cols-2 min-h-screen p-2">
                    <div className="col-span-2 border-2 border-gray-400 flex justify-center items-center rounded-lg font-bold h-12  mt-1">
                        <p className="text-xl text-reservation-color">Driver</p>
                    </div>
                    {Array.from({length: 30}, (_, index) => (
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
                    <div
                        className="col-span-2 border-2 border-gray-400 flex justify-center items-center rounded-lg font-bold h-12  mt-1">
                        <p className="text-xl text-reservation-color">Hostess</p>
                    </div>
                    {Array.from({length: 12}, (_, index) => {
                        const seatNumber = index + 31;
                        const isDoor = seatNumber === 37 || seatNumber === 38;
                        const isToilet = seatNumber ===35 || seatNumber === 36;
                        const displayNumber = isDoor ? "Door" : isToilet ? "Toilet" : seatNumber >= 35 ? (seatNumber - 4) : seatNumber;

                        return (
                            <button
                                disabled={seatNumber === 35 || seatNumber === 36 || seatNumber === 37 || seatNumber === 38}
                                key={index}
                                onClick={() => !isDoor && !isToilet && handleSeatClick(displayNumber)}
                                className={`${isDoor ? "border-none w-12 h-12 " : isToilet ? "w-12 h-12 border-none" : getSeatClass(displayNumber)}`}
                            >
                                {displayNumber}
                            </button>
                        )
                    })}
                    {Array.from({length: 20}, (_, index) => {
                        const seatNumber = index + 39;
                        const isDoor = seatNumber === 49 || seatNumber === 50;
                        const displayNumber = isDoor ? "Door" : seatNumber >= 49 ? (seatNumber - 2) : seatNumber;

                        return (
                            <button
                                disabled={seatNumber === 49 || seatNumber === 50}
                                key={index}
                                onClick={() => !isDoor && handleSeatClick(displayNumber)}
                                className={`${isDoor ? "border-none w-12 h-12 " : getSeatClass(displayNumber)}`}
                            >
                                {displayNumber}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

