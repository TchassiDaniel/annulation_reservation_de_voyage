import React, { useState } from "react";
import { XCircle } from "lucide-react";
import axiosInstance from "@/Utils/AxiosInstance";
import { X } from "lucide-react";

export default function TripAnnulationModal({ isOpen, onClose, trip }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [selectedCause, setSelectedCause] = useState("");
  const [customCause, setCustomCause] = useState("");
  const refundAmount = 3000;

  if (!isOpen) return null;

  const handleCauseChange = (e) => {
    setSelectedCause(e.target.value);
  };

  const handleCustomCauseChange = (e) => {
    setCustomCause(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logique pour soumettre le formulaire
    setIsConfirming(true);
    try {
      const response = await axiosInstance.post(
        `/reservation/annuler/${trip.id}`,
        {
          idUser: trip.idUser,
          idVoyage: trip.idVoyage,
        }
      );
      if (response.status === 201) {
        onClose();
        setIsConfirming(false);
      }
    } catch (error) {
      console.log(error);
      setIsConfirming(false);
    }
  };

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
    </div>
  );
}
