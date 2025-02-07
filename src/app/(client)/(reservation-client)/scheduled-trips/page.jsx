"use client"

import React, { useEffect, useState } from "react"
import { AlertCircle, Calendar, CheckCircle2, Clock, MapPin, Users, Wallet } from "lucide-react"
import { BsInfo } from "react-icons/bs"
import { MdCancel } from "react-icons/md"
import TripAnnulationModal from "@/app/(client)/(reservation-client)/scheduled-trips/TripAnnulationModal"
import { useRouter } from "next/navigation"
import { FaHouse } from "react-icons/fa6"
import { useAuthentication } from "@/Utils/Provider"
import axiosInstance from "@/Utils/AxiosInstance"
import { Tooltip } from "antd"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { formatDateOnly, formatDateToTime, formatFullDateTime } from "@/Utils/formatDateMethods"
import ErrorHandler from "@/components/ErrorHandler/ErrorHandler"
import {PaymentModal} from "@/app/(client)/(reservation-client)/available-trips/[tripId]/PaymentRequestModal";
import SuccessModal from "@/components/Modals/SuccessModal";

// Données simulées mises à jour pour la prévisualisation
const mockReservation = {
    id: 1,
    reference: "RES123456",
    status: "Confirmed",
    class: "VIP",
    departure: "Douala",
    departureQuarter: "Akwa",
    arrival: "Yaoundé",
    arrivalQuarter: "Bastos",
    agencyName: "Finex Voyages",
    busRegistration: "CE 1234 AB",
    departureDate: "2024-01-15",
    departureTime: "13:00",
    paymentDeadline: "2024-01-14",
    price: 7000,
    amountPaid: 14000,
    totalAmount: 21000,
    cancellationPolicy:
        "Free cancellation up to 24 hours before departure. 50% refund for cancellations made less than 24 hours before departure.",
    passengers: [
        {
            id: "1",
            name: "John Doe",
            age: 35,
            gender: "Male",
            seatNumber: "23A",
            type: "Adult",
            idNumber: "ID123456",
            phone: "+237 123456789",
            email: "john@example.com",
            luggageCount: 2,
            ticketPrice: 7000,
        },
        {
            id: "2",
            name: "Jane Doe",
            age: 32,
            gender: "Female",
            seatNumber: "23B",
            type: "Adult",
            idNumber: "ID789012",
            phone: "+237 987654321",
            email: "jane@example.com",
            luggageCount: 1,
            ticketPrice: 7000,
        },
        {
            id: "3",
            name: "Alice Doe",
            age: 8,
            gender: "Female",
            seatNumber: "23C",
            type: "Child",
            idNumber: "ID345678",
            phone: "+237 567891234",
            email: "alice@example.com",
            luggageCount: 1,
            ticketPrice: 7000,
        },
    ],
}

export default function Page() {
    const router = useRouter();
    const [myScheduledTrips, setMyScheduledTrips] = useState([] | null);
    const [canOpenTripAnnulationModal, setCanOpenTripAnnulationModal] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState({});
    const { userData } = useAuthentication();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [canRenderPaginationContent, setCanRenderPaginationContent] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [canOpenPaymentRequestModal, setCanOpenPaymentRequestModal] = useState(false);
    const [successMessage, setSuccessMessage]  = useState("");
    const [canOpenSuccessModal, setCanOpenSuccessModal] = useState(false);


    async function getMyScheduledTrips(userId) {
        setIsLoading(true)
        try {
            const response = await axiosInstance.get(`/reservation/utilisateur/${userId}`);
            setIsLoading(false);
            if (response.status === 200) {
                console.log(response.data);
                setMyScheduledTrips(response.data.content);
                setTotalPages(response?.data?.totalPages);
                setIsSearch(false);
                if (response?.data?.empty === true) setCanRenderPaginationContent(false);
                else setCanRenderPaginationContent(true);
                setError(null);
            }
        } catch (error) {
            setIsLoading(false);
            setError(error);
            setMyScheduledTrips(null);
            console.log(error);
        }
    }

    useEffect(() => {
        if (userData.userId) {
            getMyScheduledTrips(userData?.userId);
        }
    }, [userData?.userId])

    return (
      <div className="min-h-screen  ">
        <div className="bg-gray-100 rounded-lg mb-5">
          <div className="mx-auto px-4 py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-reservation-color">
              My Booked Trips
            </h1>
            <p className="mt-2 text-sm sm:text-md font-medium">
              Manage your reservations, make your payments and track your
              upcoming trips.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          {isLoading ? (
            <div className="h-[500px] flex justify-center items-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-reservation-color border-b-transparent animate-spin relative">
                  <div className="absolute inset-0 w-full h-full rounded-full border-4 border-reservation-color/20"></div>
                </div>
                <p className="animate-bounce text-reservation-color text-xl font-bold mt-4">
                  Loading...
                </p>
              </div>
            </div>
          ) : (
            <>
              {myScheduledTrips?.length > 0 &&
                myScheduledTrips &&
                myScheduledTrips.map((scheduledTrip, index) => {
                  const tripDetails = scheduledTrip?.voyage;
                  const reservation = scheduledTrip?.reservation;
                  return (
                    <div
                      key={index}
                      className=" rounded-xl border-2 border-gray-300 bg-gray-100 overflow-hidden">
                      {/* Header Section */}
                      <div className="p-4 sm:p-6">
                        <div className="flex justify-between items-start mb-4 gap-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="text-reservation-color h-8 w-8 sm:h-10 sm:w-10" />
                            <h3 className="text-base sm:text-lg font-semibold">
                              {tripDetails?.titre}
                            </h3>
                          </div>

                          <div className="lg:hidden flex flex-wrap gap-2">
                            {reservation?.status === "CONFIRMER" ? (
                              <span className="px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-600 border-2 border-green-300 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                Confirmed
                              </span>
                            ) : (
                              <span className="px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-orange-100 text-orange-600 border-2 border-orange-300 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                Waiting for confirmation
                              </span>
                            )}
                            <span className="px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-600 border-2 border-blue-300 flex items-center">
                              {"VIP"}
                            </span>
                          </div>
                        </div>

                        <div className="ml-2 sm:ml-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <FaHouse className="text-reservation-color h-5 w-5" />
                              <div>
                                <p className="text-sm sm:text-md text-gray-500">
                                  Transport agency
                                </p>
                                <p className="font-bold">
                                  {tripDetails.nomAgence
                                    ? tripDetails?.nomAgence
                                    : "not specified"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="text-reservation-color h-5 w-5" />
                              <div>
                                <p className="text-sm sm:text-md text-gray-500">
                                  Departure Date
                                </p>
                                <p className="font-bold">
                                  {tripDetails.dateDepartEffectif
                                    ? formatDateOnly(
                                        tripDetails?.dateDepartEffectif
                                      )
                                    : "not specified"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Clock className="text-reservation-color h-5 w-5" />
                              <div>
                                <p className="text-sm sm:text-md text-gray-500">
                                  Departure Time
                                </p>
                                <p className="font-bold">
                                  {tripDetails?.heureDepartEffectif
                                    ? formatDateToTime(
                                        tripDetails?.heureDepartEffectif
                                      )
                                    : "not specified"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <AlertCircle className="text-reservation-color h-5 w-5" />
                              <div>
                                <p className="text-sm sm:text-md text-gray-500">
                                  Reservation Date
                                </p>
                                <p className="font-bold">
                                  {reservation?.dateReservation
                                    ? formatFullDateTime(
                                        reservation?.dateReservation
                                      )
                                    : "not specified"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Users className="text-reservation-color h-6 w-6" />
                              <div>
                                <div className="flex gap-3">
                                  <p className="text-sm sm:text-md text-gray-500">
                                    Passengers:
                                  </p>
                                  <p className="font-bold">
                                    {reservation?.nbrPassager}
                                  </p>
                                </div>
                                <div className="flex gap-3">
                                  <p className="text-sm sm:text-md text-gray-500">
                                    Seats:{" "}
                                  </p>
                                  <p className="font-bold">
                                    {mockReservation.passengers
                                      .map((p) => p.seatNumber)
                                      .join(", ")}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <AlertCircle className="text-reservation-color h-5 w-5" />
                              <div>
                                <p className="text-sm sm:text-md text-gray-500">
                                  Payment Deadline
                                </p>
                                <p className="font-bold">
                                  {tripDetails?.dateLimiteConfirmation
                                    ? formatDateOnly(
                                        tripDetails?.dateLimiteConfirmation
                                      )
                                    : "not specified"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`flex flex-col sm:flex-row ${
                          reservation?.statutReservation === "RESERVER"
                            ? "sm:justify-between"
                            : "sm:justify-end"
                        } items-center p-4 gap-4`}>
                        {reservation?.statutReservation === "RESERVER" && (
                          <div className="bg-orange-50 rounded-lg border border-orange-200 w-full sm:w-[700px] p-4">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <Wallet className="h-5 w-5 text-orange-500" />
                                <div>
                                  <p className="font-medium text-orange-800 text-sm sm:text-base">
                                    Amount remaining to be paid:{" "}
                                    {Number.parseInt(reservation?.prixTotal) -
                                      Number.parseInt(reservation?.montantPaye)}
                                  </p>
                                  <p className="text-xs sm:text-sm text-orange-600">
                                    on a total of{" "}
                                    {Number.parseInt(reservation?.prixTotal)}
                                    FCFA
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                    setSelectedTrip(scheduledTrip)
                                  setCanOpenPaymentRequestModal(true)
                                }}
                                className="px-4 py-2 bg-orange-500 font-bold text-white rounded-lg text-sm hover:bg-orange-700 transition-colors w-full sm:w-auto">
                                Complete payment
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                          <button
                            onClick={() => {
                              router.push(
                                `scheduled-trips/reservation/${reservation?.idReservation}`
                              );
                            }}
                            className="px-4 py-2 text-blue-600 hover:text-blue-800 border-2 border-blue-300 hover:bg-blue-300 font-medium rounded-lg bg-blue-100 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto">
                            <div className="border border-blue-600 rounded-full">
                              <BsInfo className="h-6 w-6" />
                            </div>
                            See details
                          </button>
                          <button
                            onClick={() => {
                              setSelectedTrip(scheduledTrip);
                              setCanOpenTripAnnulationModal(true);
                            }}
                            className="px-4 py-2 border-2 border-red-300 text-red-600 font-medium rounded-lg bg-red-100 hover:text-red-800 hover:bg-red-300 transition-all duration-300 flex items-center justify-center gap-1 w-full sm:w-auto">
                            <MdCancel className="w-6 h-6" />
                            Cancel reservation
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {canRenderPaginationContent && (
                <div className="w-full flex justify-center mt-8 mb-6">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <Tooltip placement={"left"} title={"previous slide"}>
                      <button className="w-8 h-8 sm:w-10 sm:h-10  text-reservation-color flex items-center justify-center">
                        <FaArrowLeft />
                      </button>
                    </Tooltip>
                    {totalPages > 5 ? (
                      <>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-reservation-color text-white font-medium flex items-center justify-center shadow-sm">
                            1
                          </button>
                          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white text-reservation-color hover:bg-gray-50 font-medium flex items-center justify-center border-2 border-gray-200">
                            2
                          </button>
                          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white text-reservation-color hover:bg-gray-50 font-medium flex items-center justify-center border-2 border-gray-200">
                            3
                          </button>
                          <span className="flex items-center justify-center px-2 text-gray-500">
                            ...
                          </span>
                          <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white text-reservation-color hover:bg-gray-50 font-medium flex items-center justify-center border-2 border-gray-200">
                            {totalPages}
                          </button>
                        </div>
                      </>
                    ) : (
                      Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-reservation-color text-white font-bold text-lg sm:text-xl flex items-center justify-center shadow-sm">
                          {index + 1}
                        </button>
                      ))
                    )}
                    <Tooltip placement={"right"} title={"next slide"}>
                      <button className="w-8 h-8 sm:w-10 sm:h-10  text-reservation-color flex items-center justify-center">
                        <FaArrowRight />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              )}
              <ErrorHandler
                error={error}
                dataLength={myScheduledTrips?.length}
                isSearch={isSearch}
              />
            </>
          )}
        </div>
        <TripAnnulationModal
          trip={selectedTrip}
          isOpen={canOpenTripAnnulationModal}
          onClose={() => setCanOpenTripAnnulationModal(false)}
        />

          <PaymentModal
              onClose={()=>setCanOpenPaymentRequestModal(false)}
              isOpen={canOpenPaymentRequestModal}
              reservationAmount={Number.parseInt(selectedTrip?.reservation?.prixTotal) - Number.parseInt(selectedTrip?.reservation?.montantPaye)}
              setIsLoading={setIsLoading}
              setCanOpenSuccessModal={setCanOpenSuccessModal}
              setSuccessMessage={setSuccessMessage}
              idReservation={selectedTrip?.reservation?.idReservation}
          />

          <SuccessModal canOpenSuccessModal={setCanOpenSuccessModal} isOpen={canOpenSuccessModal} message={successMessage} makeAction={()=>{setCanOpenPaymentRequestModal(false), window.location.reload()}}/>

      </div>
    );
}

