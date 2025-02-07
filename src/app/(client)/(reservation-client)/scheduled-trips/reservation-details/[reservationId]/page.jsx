'use client';

import React,{useEffect, useState} from 'react';
import { ArrowLeft, Printer, MapPin,User, Briefcase, Ticket, Calendar, Clock, CreditCard, Users, Truck, AlertTriangle, AlertCircle } from 'lucide-react';
import {useRouter} from "next/navigation";
import axiosInstance from "@/Utils/AxiosInstance";
import {FaHouse} from "react-icons/fa6";
import {formatDateOnly, formatDateToTime} from "@/Utils/formatDateMethods";
import {MdCancel} from "react-icons/md";
import {FaExclamation} from "react-icons/fa";
import {BiStar} from "react-icons/bi";
import ErrorHandler from "@/components/ErrorHandler/ErrorHandler";
import TripAnnulationModal from "@/app/(client)/(reservation-client)/scheduled-trips/TripAnnulationModal";

export default function ReservationDetails({ params }) {
  const reservationId = React.use(params)?.reservationId;
  const router = useRouter();
  const [reservationDetails, setReservationDetails] = useState([] || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [canOpenTripAnnulationModal, setCanOpenTripAnnulationModal] =
    useState(false);

  async function getReservationDetails(reservationId) {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/reservation/${reservationId}`);
      setIsLoading(false);
      if (response?.status === 200) {
        console.log(response?.data);
        setReservationDetails(response?.data);
        setError(null);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
      setReservationDetails(null);
      console.log(
        "error lors de la recuperation des details de la reservation-details ",
        error
      );
    }
  }

  useEffect(() => {
    if (reservationId) {
      getReservationDetails(reservationId);
    }
  }, [reservationId]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex bg-gray-100 items-center mb-8 p-6 h-28 rounded-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              router.back();
            }}
            className="p-2 bg-blue-200 rounded-full text-reservation-color hover:bg-blue-400 w-10 h-10 flex justify-center items-center transition-all duration-300">
            <ArrowLeft className="h-7 w-7" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-reservation-color">
              Reservation Details
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Booking Reference:{" "}
              {reservationDetails?.reservation?.idReservation}
            </p>
          </div>
        </div>
      </div>

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
      ) : !error && reservationDetails ? (
        <div className="space-y-8">
          {/* Reservation Summary */}
          <div className="bg-gray-100 rounded-lg  overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between mb-7">
                <div className="flex items-center gap-2">
                  <MapPin className="text-reservation-color h-10 w-10" />
                  <div>
                    <p className="text-xl text-gray-500">Route</p>
                    <p className="font-bold text-md">
                      {reservationDetails?.voyage?.titre}{" "}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center mb-6">
                  <span
                    className={`flex justify-center items-center px-3 py-1 rounded-full text-sm font-medium ${
                      reservationDetails?.reservation?.statutReservation ===
                      "CONFIRMER"
                        ? "bg-green-100 text-green-600 border-2 border-green-300"
                        : "bg-orange-100 text-orange-600 border-2 border-orange-300"
                    }`}>
                    <FaExclamation />
                    {reservationDetails?.reservation?.statutReservation ===
                    "CONFIRMER"
                      ? "confirmed"
                      : "waiting for confirmation"}
                  </span>
                  <span className="flex gap-0.5 justify-center items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 border-2 border-blue-300 text-reservation-color">
                    <BiStar className="w-4 h-4" />
                    {reservationDetails?.reservation?.classeVoyage ||
                      "not specified"}
                  </span>
                </div>
              </div>

              <div className="ml-10 grid grid-cols-3">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FaHouse className="text-reservation-color h-6 w-6" />
                    <div>
                      <p className="text-md text-gray-500">Agency</p>
                      <p className="font-bold">
                        {reservationDetails?.agence?.nom ||
                          "not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="text-reservation-color h-6 w-6" />
                    <div>
                      <p className="text-md text-gray-500">Bus</p>
                      <p className="font-bold">
                        {reservationDetails?.voyage?.vehicule?.idVehicule ||
                          "not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-reservation-color h-6 w-6" />
                    <div>
                      <p className="text-md text-gray-500">Departure Date</p>
                      <p className="font-bold">
                        {reservationDetails?.voyage?.dateDepartEffectif
                          ? formatDateOnly(
                              reservationDetails?.voyage?.dateDepartEffectif
                            )
                          : "not specified"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="text-reservation-color h-6 w-6" />
                    <div>
                      <p className="text-md text-gray-500">Departure time</p>
                      <p className="font-bold">
                        {reservationDetails?.voyage?.heureDepartEffectif
                          ? formatDateToTime(
                              reservationDetails?.voyage?.heureDepartEffectif
                            )
                          : "not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-reservation-color h-6 w-6" />
                    <div>
                      <p className="text-md text-gray-500">
                        Departure Location
                      </p>
                      <p className="font-bold">
                        {reservationDetails?.voyage?.lieuDepart +
                          " - " +
                          reservationDetails?.voyage?.pointDeDepart ||
                          "not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="text-reservation-color h-6 w-6" />
                    <div>
                      <p className="text-md text-gray-500">Arrival Location</p>
                      <p className="font-bold">
                        {reservationDetails?.voyage?.lieuArrive +
                          " - " +
                          reservationDetails?.voyage?.pointArrivee ||
                          "not specified"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="text-reservation-color h-6 w-6" />
                    <div>
                      <p className="text-md text-gray-500">Passengers</p>
                      <p className="font-bold">
                        {reservationDetails?.passager?.length} passenger(s)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="text-reservation-color h-6 w-6" />
                    <div>
                      <p className="text-md text-gray-500">Refund Amount</p>
                      <p className="font-bold">
                        {parseInt(reservationDetails?.reservation?.montantPaye)}{" "}
                        FCFA
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="text-reservation-color h-6 w-6" />
                    <div>
                      <p className="text-md text-gray-500">Payment Deadline</p>
                      <p className="font-bold">
                        {reservationDetails?.voyage?.dateLimiteConfirmation
                          ? formatDateOnly(
                              reservationDetails?.voyage?.dateLimiteConfirmation
                            )
                          : "not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 p-4">
              <h3 className="font-semibold text-orange-600 flex items-center  gap-2 mb-2">
                <AlertTriangle className="h-10 w-10" />
                <p className="text-xl mt-1">Cancellation Policy</p>
              </h3>
              <p className="text-md ml-10 text-justify text-orange-800">
                Cancellation policies vary by agency and take into account the
                time of year, ticket price and the time between cancellation and
                travel date. Depending on these criteria, cancellation fees may
                apply, or a coupon of varying value may be generated for future
                use.
              </p>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="bg-gray rounded-lg  overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Passenger Details</h2>
              <div className="grid grid-cols-3 gap-6">
                {reservationDetails?.passager?.map((passenger, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-3 transform transition-all duration-500">
                    <h3 className="font-semibold text-xl mb-4 flex items-center">
                      <User className="mr-2 h-10 w-10 text-reservation-color" />
                      {passenger?.nom}
                    </h3>
                    <div className="space-y-3 text-sm mb-6">
                      <p className="flex items-center">
                        <Ticket className="mr-2 h-5 w-5 text-gray-400" />
                        <span className="text-gray-500 mr-2">Seat:</span>
                        <span className="font-semibold">
                          {passenger?.placeChoisis}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <Users className="mr-2 h-5 w-5 text-gray-400" />
                        <span className="text-gray-500 mr-2">Age:</span>
                        <span className="font-semibold">{passenger?.age}</span>
                      </p>
                      <p className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
                        <span className="text-gray-500 mr-2">ID Card:</span>
                        <span className="font-semibold">
                          {passenger?.numeroPieceIdentific}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <Briefcase className="mr-2 h-5 w-5 text-gray-400" />
                        <span className="text-gray-500 mr-2">Luggage:</span>
                        <span className="font-semibold">
                          {passenger?.nbrBaggage}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <User className="mr-2 h-5 w-5 text-gray-400" />
                        <span className="text-gray-500 mr-2">Gender:</span>
                        <span className="font-semibold">
                          {passenger?.genre}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <Ticket className="mr-2 h-5 w-5 text-gray-400" />
                        <span className="text-gray-500 mr-2">
                          Ticket Price:
                        </span>
                        <span className="font-semibold">
                          {parseInt(
                            reservationDetails?.reservation?.prixTotal
                          ) /
                            parseInt(
                              reservationDetails?.reservation?.nbrPassager
                            )}{" "}
                          FCFA
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                      <button
                        onClick={() => {
                          alert("print function");
                        }}
                        disabled={
                          reservationDetails?.reservation?.statutReservation ===
                          "RESERVER"
                        }
                        className="w-full sm:w-auto px-4 py-2 bg-reservation-color text-white rounded-lg hover:bg-blue-800 transition-all duration-300 flex items-center justify-center disabled:cursor-not-allowed disabled:bg-gray-400">
                        <Printer className="mr-2 h-5 w-5" /> Print Ticket
                      </button>
                      <button
                        onClick={() => {
                          setCanOpenTripAnnulationModal(true);
                        }}
                        className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center">
                        <MdCancel className="mr-2 h-5 w-5" /> Cancel Trip
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ErrorHandler error={error} />
      )}
      <TripAnnulationModal
        trip={reservationDetails}
        isOpen={canOpenTripAnnulationModal}
        onClose={() => setCanOpenTripAnnulationModal(false)}
      />
    </div>
  );
}

