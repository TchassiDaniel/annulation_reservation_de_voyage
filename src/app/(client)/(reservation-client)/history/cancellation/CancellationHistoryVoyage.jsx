'use client';
import React, { useState } from 'react';
import {
  MapPinIcon, 
  ClockIcon, 
  UserIcon, 
  IdentificationIcon,
  UserCircleIcon,
  CubeIcon,
  CurrencyEuroIcon,
  UsersIcon,
  XMarkIcon,
  PrinterIcon,
  CalendarIcon,
  NoSymbolIcon,
  PhoneIcon
} from '@heroicons/react/24/solid';

import historiqueData from '@/data/historiquevoyage.json';

export default function CancellationHistoryVoyage() {
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Fonction pour formater l'heure
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderAnnulationDetails = (reservation) => {
    if (!reservation) {
      return <div>No details available</div>;
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
          <button 
            onClick={() => setSelectedReservation(null)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <NoSymbolIcon className="h-8 w-8 text-red-500 mr-3" />
            Cancellation Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <UserIcon className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Passenger</p>
                <p className="font-medium text-sm">{reservation.passagerDetails.nom}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <ClockIcon className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Departure Time</p>
                <p className="font-medium text-sm">
                  {formatTime(reservation.heureDepart)}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <ClockIcon className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Arrival Time</p>
                <p className="font-medium text-sm">
                  {formatTime(reservation.heureArrivee)}
                </p>
              </div>
            </div>
            
            {reservation.initiateurAnnulation === 'Agence' && (
              <div className="flex items-center">
                <PhoneIcon className="h-6 w-6 text-green-500 mr-3" />
                <div>
                  <p className="text-gray-600 text-xs">Contact</p>
                  <p className="font-medium text-sm">
                    {reservation.contact}
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <UserCircleIcon className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Cancellation Initiator</p>
                <p className="font-medium text-sm">
                  {reservation.initiateurAnnulation}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <IdentificationIcon className="h-6 w-6 text-purple-500 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Service Provider Agency</p>
                <p className="font-bold text-lg">
                  {reservation.agencePrestaire}
                </p>
              </div>
            </div>
            
            <div className="flex items-center col-span-full">
              <NoSymbolIcon className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Cause of Cancellation</p>
                <p className="font-medium text-sm">
                  {reservation.causeAnnulation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-xl sm:text-3xl font-bold text-reservation-color mb-4 sm:mb-0">
            Canceled Trips
          </h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {historiqueData.historiques
            .filter(reservation => reservation.etatVoyage === 'annulé')
            .map((reservation) => (
              <div 
                key={reservation.idHistorique} 
                className="bg-gray-100 shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-red-500"
              >
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
                      Reservation #{reservation.idHistorique}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reservation.statusVoyage === 'VIP'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {reservation.statusVoyage}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {reservation.etatVoyage}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Depart Location</p>
                        <p className="font-medium text-xs">{reservation.lieuDepart}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Departure Time</p>
                        <p className="font-medium text-xs">
                          {formatTime(reservation.heureDepart)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-green-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Arrival Location</p>
                        <p className="font-medium text-xs">{reservation.lieuArrivee}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-green-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Arrival Time</p>
                        <p className="font-medium text-xs">
                          {formatTime(reservation.heureArrivee)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-teal-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Date Départ</p>
                        <p className="font-medium text-xs">{reservation.dateDepart}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center col-span-2">
                      <UserCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Cancellation Initiator</p>
                        <p className="font-medium text-xs">
                          {reservation.initiateurAnnulation}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 flex justify-center">
                    <button 
                      onClick={() => setSelectedReservation(
                        selectedReservation === reservation ? null : reservation
                      )}
                      className="bg-red-500 text-white font-semibold px-3 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                    >
                      Cancellation Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        
        {selectedReservation && renderAnnulationDetails(selectedReservation)}
      </div>
    </div>
  );
}