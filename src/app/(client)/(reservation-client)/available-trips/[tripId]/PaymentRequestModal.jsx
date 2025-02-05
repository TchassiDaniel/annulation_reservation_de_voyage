import React, { useState } from 'react';
import { XIcon, CreditCard, ArrowLeft } from 'lucide-react';
import axiosInstance from "@/Utils/AxiosInstance";
import {useAuthentication} from "@/Utils/Provider";
import WaitForPageLoad from "@/components/Modals/WaitForPageLoad";



export function PaymentModal({ isOpen, onClose, reservationAmount, setCanOpenSuccessModal, setSuccessMessage, idReservation}) {
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(reservationAmount.toString());
    const {userData} = useAuthentication();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    function handleConfirmPayment () {
        setStep(2);
    }



    async function handleSubmitPayment (e){
        e.preventDefault();
        setIsLoading(true);
        let paymentData = {
            mobilePhone: '+237'+phoneNumber,
            mobilePhoneName: name,
            amount: amount,
            userId: userData?.userId,
            reservationId: idReservation ? idReservation : localStorage.getItem('idCurrentReservation'),
        };

        console.log(paymentData);
        try
        {
            const paymentResponse = await axiosInstance.put("/reservation/payer", paymentData);
            setIsLoading(false);
            if (paymentResponse.status === 200)
            {
                localStorage.removeItem('idCurrentReservation');
                setSuccessMessage("transaction initiated successfully, follow steps on your phone to complete the transaction");
                setCanOpenSuccessModal(true);
            }

        }
        catch (error)
        {
            console.log(error);
            setIsLoading(false);
            setSuccessMessage("");
            setCanOpenSuccessModal(false);
            if (error.response.status === 400)
            {
                setError("Any mobile account is associated with your phone number .... please retry !");
            }
            else if (error.response.status === 404)
            {
                setError("Your phone number doesn't exist!");
            }
            else
            {
                setError("Something went wrong when initializing the payment, please retry !!");
            }
        }

    }

    function resetAndClose ()  {
        setStep(1);
        localStorage.removeItem('idCurrentReservation');
        onClose();
    }

    if (!isOpen) return null;

    if (isLoading) return <WaitForPageLoad/>

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="lg:text-3xl  text-2xl font-semibold text-reservation-color">
                            {step === 1 ? "Confirm Payment" : "Payment Details"}
                        </h2>
                        <button onClick={resetAndClose} className="text-red-500 hover:text-red-700">
                            <XIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {step === 1 ? (
                        <div className="space-y-6">
                            <p className="text-center text-lg text-gray-600">
                                Are you ready to proceed with the payment?
                            </p>
                            <div className="flex justify-center">
                                <div className="bg-blue-100 rounded-full p-3">
                                    <CreditCard className="h-8 w-8 text-reservation-color" />
                                </div>
                            </div>
                            <p className="text-center text-xl font-semibold">
                                Total Amount: {reservationAmount} FCFA
                            </p>
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleConfirmPayment}
                                    className="flex-1 px-4 py-2 bg-reservation-color text-white rounded-md hover:bg-reservation-color/90 transition-colors"
                                >
                                    Proceed to Payment
                                </button>
                                <button
                                    onClick={resetAndClose}
                                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Not Now
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmitPayment} className="space-y-4">
                            {error && <p className="text-red-500 m-2 text-md font-semibold">{error}</p>}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reservation-color"
                                />
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter the name associated with the account"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reservation-color"
                                />
                            </div>
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                                    Amount (FCFA)
                                </label>
                                <input
                                    id="amount"
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-reservation-color"
                                />
                            </div>
                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-reservation-color text-white rounded-md hover:bg-reservation-color/90 transition-colors"
                                >
                                    Complete Payment
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
