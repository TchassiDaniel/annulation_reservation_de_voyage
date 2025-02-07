"use client";
import React, { useState, useEffect } from "react";
import { XCircle } from "lucide-react";
import axiosInstance from "@/Utils/AxiosInstance";
import { X } from "lucide-react";
import SuccessModal from "@/components/Modals/SuccessModal";

export default function TripAnnulationModal({ isOpen, onClose, trip }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [selectedCause, setSelectedCause] = useState("");
  const [customCause, setCustomCause] = useState("");
  const [selectedPassengers, setSelectedPassengers] = useState([]);
  const [cancelAll, setCancelAll] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const openSuccessModal = (message) => {
    setSuccessMessage(message);
    setIsSuccessModalOpen(true);
  };

  const refundAmount =
    ((trip?.reservation?.montantPaye ?? 0) / trip?.passager?.length ?? 1) *
    0.74 *
    selectedPassengers.length;
  const reservation = {
    idReservation: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    dateReservation: "2025-01-10T14:23:39.491Z",
    dateConfirmation: "2025-01-11T14:23:39.491Z",
    nbrPassager: 2,
    montantPaye: 6000,
    prixTotal: 12000,
    statutReservation: "RESERVER",
    idUser: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    idVoyage: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    passager: [
      {
        idPassager: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        numeroPieceIdentific: "123456789",
        nom: "John Doe",
        genre: "M",
        age: 30,
        nbrBaggage: 2,
        idReservation: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        placeChoisis: 1,
      },
      {
        idPassager: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
        numeroPieceIdentific: "987654321",
        nom: "Jane Doe",
        genre: "F",
        age: 28,
        nbrBaggage: 1,
        idReservation: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        placeChoisis: 2,
      },
    ],
    voyage: {
      idVoyage: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      titre: "Trip to Douala",
      description: "A wonderful trip to Douala",
      dateDepartPrev: "2025-01-15T14:23:39.491Z",
      lieuDepart: "Yaoundé",
      dateDepartEffectif: "2025-01-15T14:23:39.491Z",
      dateArriveEffectif: "2025-01-15T18:23:39.491Z",
      lieuArrive: "Douala",
      heureDepartEffectif: "2025-01-15T14:23:39.491Z",
      pointDeDepart: "Point A",
      pointArrivee: "Point C",
      dureeVoyage: {
        seconds: 14400,
        zero: false,
        nano: 0,
        negative: false,
        units: [],
      },
      heureArrive: "2025-01-15T18:23:39.491Z",
      nbrPlaceReservable: 50,
      nbrPlaceReserve: 20,
      nbrPlaceConfirm: 15,
      nbrPlaceRestante: 30,
      datePublication: "2025-01-01T14:23:39.491Z",
      dateLimiteReservation: "2025-01-14T14:23:39.491Z",
      dateLimiteConfirmation: "2025-01-14T14:23:39.491Z",
      statusVoyage: "CONFIRMER",
      smallImage: "small.jpg",
      bigImage: "big.jpg",
    },
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedCause("");
      setSelectedPassengers([]);
      setCancelAll(false);
    }
  }, [isOpen]);

  const handleCauseChange = (e) => {
    setSelectedCause(e.target.value);
  };

  const handleCustomCauseChange = (e) => {
    setCustomCause(e.target.value);
  };

  const handlePassengerChange = (id) => {
    setSelectedPassengers((prev) =>
      prev.includes(id)
        ? prev.filter((passengerId) => passengerId !== id)
        : [...prev, id]
    );
  };

  const handleCancelAllChange = () => {
    setCancelAll((prev) => !prev);
    if (!cancelAll) {
      setSelectedPassengers(trip.passager.map((p) => p.idPassager));
    } else {
      setSelectedPassengers([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirming(true);

    const causeAnnulation =
      selectedCause === "other" ? customCause : selectedCause;
    const origineAnnulation = "user";
    try {
      const response = await axiosInstance.post(`/reservation/annuler`, {
        causeAnnulation: causeAnnulation,
        origineAnnulation: origineAnnulation,
        idReservation: trip.reservation.idReservation,
        idPassagers: selectedPassengers,
        canceled: true,
      });
      if (response.status === 200 || response.status === 201) {
        onClose();
        setIsConfirming(false);
        openSuccessModal("successfully Canceled!");
      }
    } catch (error) {
      console.log(error);
      setIsConfirming(false);
      console.log({
        causeAnnulation: causeAnnulation,
        origineAnnulation: origineAnnulation,
        idReservation: trip.reservation.idReservation,
        idPassagers: selectedPassengers,
        canceled: true,
      });
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-2 ml-16">
            <div className="bg-red-200 p-2 rounded-full">
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-3xl font-bold text-red-500 mt-1">
              Cancel Reservation
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500">
            <X className="h-7 w-7" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Passengers to Cancel
            </label>
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              {trip.passager.map((passenger) => (
                <div
                  key={passenger.idPassager}
                  className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`passenger-${passenger.idPassager}`}
                    name="passenger"
                    value={passenger.idPassager}
                    checked={selectedPassengers.includes(passenger.idPassager)}
                    onChange={() => handlePassengerChange(passenger.idPassager)}
                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`passenger-${passenger.idPassager}`}
                    className="text-gray-700">
                    {passenger.nom}
                  </label>
                </div>
              ))}
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  openSuccessModal
                  id="cancel-all"
                  name="cancel-all"
                  checked={cancelAll}
                  onChange={handleCancelAllChange}
                  className="mr-2 h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="cancel-all" className="text-red-700 font-bold">
                  Cancel Entire Trip
                </label>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cause">
              Cause of Cancellation
            </label>
            <select
              id="cause"
              value={selectedCause}
              onChange={handleCauseChange}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select a cause</option>
              <option value="personal">Personal reasons</option>
              <option value="health">Health issues</option>
              <option value="schedule">Schedule conflict</option>
              <option value="other">Other</option>
            </select>
          </div>
          {selectedCause === "other" && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="customCause">
                Custom Cause
              </label>
              <input
                id="customCause"
                type="text"
                value={customCause}
                onChange={handleCustomCauseChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Refund Amount
            </label>
            <p className="text-red-500 text-lg font-medium">
              {refundAmount} FCFA
            </p>
          </div>
          <p className="text-lg font-medium text-gray-700">
            Are you sure you want to cancel your reservation for this trip?
          </p>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
              No
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">
              {isConfirming ? "Confirming..." : "Yes"}
            </button>
          </div>
        </form>
      </div>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        canOpenSuccessModal={setIsSuccessModalOpen}
        message={successMessage}
      />
    </div>
  );
}
