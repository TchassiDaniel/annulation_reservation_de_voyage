'use client';

import React, {useEffect, useState} from 'react';
import ReservationSteps from "@/app/(client)/(reservation-client)/available-trips/[tripId]/reservationProcessModal";
import ReservationStep1 from "@/app/(client)/(reservation-client)/available-trips/[tripId]/ReservationStep1";
import ReservationStep2 from "@/app/(client)/(reservation-client)/available-trips/[tripId]/ReservationStep2";



export default function ReservationModale({ isOpen, onClose, tripDetails }) {

    const [step, setStep] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);


    useEffect(() => {
        console.log(step)
    }, [step]);



    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300">
                <div className="bg-white relative rounded-xl  max-w-5xl w-full max-h-[630px] overflow-y-auto">
                    {step ===1 && (<ReservationStep1 tripDetails={tripDetails} setSelectedSeats={setSelectedSeats} selectedSeats={selectedSeats} onClose={onClose} onContinue={()=>{setStep(2)}}/>)}
                    {step ===2 && (<ReservationStep2  onBack={()=>{setStep(1)}} onClose={()=>{onClose(), setStep(1)}} selectedSeats={selectedSeats} setStep={setStep} tripDetails={tripDetails}/>)}
                    {step===3  && (<ReservationSteps selectedSeats={selectedSeats} tripDetails={tripDetails} onBack={()=>{setStep(2)}} onClose={() => onClose()}/>)}
                </div>
            </div>
        </>
    )
        ;
}

