"use client"

import { useState } from "react"
import ReservationStep1 from "./ReservationStep1"
import ReservationStep2 from "./ReservationStep2"
import ReservationStep3 from "./ReservationStep3"
import WaitForPageLoad from "@/components/Modals/WaitForPageLoad"
import { ErrorModal } from "@/components/Modals/ErrorModal"
import SuccessModal from "@/components/Modals/SuccessModal"

export default function ReservationProcessModal({ isOpen, onClose, tripDetails }) {
    const [step, setStep] = useState(1)
    const [selectedSeats, setSelectedSeats] = useState([])
    const [passengersData, setPassengersData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [canOpenErrorModal, setCanOpenErrorModal] = useState(false)
    const [canOpenSuccessModal, setCanOpenSuccessModal] = useState(false)

    function onBack() {
        setStep(1)
    }

    if (!isOpen) return null
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300 lg:p-4 p-0">
                <div className="bg-white relative lg:rounded-xl lg:w-full lg:max-w-5xl w-screen max-h-[90vh] overflow-y-auto">
                    {step === 1 && (
                        <ReservationStep1
                            tripDetails={tripDetails}
                            setSelectedSeats={setSelectedSeats}
                            selectedSeats={selectedSeats}
                            onClose={onClose}
                            onContinue={() => setStep(2)}
                        />
                    )}
                    {step === 2 && (
                        <ReservationStep2
                            onBack={onBack}
                            onClose={() => {
                                onClose()
                                setStep(1)
                            }}
                            selectedSeats={selectedSeats}
                            setStep={setStep}
                            tripDetails={tripDetails}
                            setPassengers={setPassengersData}
                        />
                    )}
                    {step === 3 && (
                        <ReservationStep3
                            selectedSeats={selectedSeats}
                            tripDetails={tripDetails}
                            onClose={onClose}
                            passengersData={passengersData}
                            setStep={setStep}
                            setCanOpenErrorModal={setCanOpenErrorModal}
                            setCanOpenSuccessModal={setCanOpenSuccessModal}
                            setErrorMessage={setErrorMessage}
                            setSuccessMessage={setSuccessMessage}
                            setIsLoading={setIsLoading}
                        />
                    )}
                </div>
            </div>
            {isLoading && <WaitForPageLoad />}
            <ErrorModal
                isOpen={canOpenErrorModal}
                onCloseErrorModal={() => setCanOpenErrorModal(false)}
                message={errorMessage}
            />
            <SuccessModal
                isOpen={canOpenSuccessModal}
                canOpenSuccessModal={setCanOpenSuccessModal}
                message={successMessage}
                makeAction={() => {
                    setStep(1)
                    onClose()
                }}
            />
        </>
    )
}

