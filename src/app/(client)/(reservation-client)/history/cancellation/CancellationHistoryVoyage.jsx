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
      return <div>Aucun détail disponible</div>;
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-2xl w-full relative">
          <button 
            onClick={() => setSelectedReservation(null)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <NoSymbolIcon className="h-8 w-8 text-red-500 mr-3" />
            Détails de l'Annulation
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <UserIcon className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Passager</p>
                <p className="font-medium text-sm">{reservation.passagerDetails.nom}</p>
              </div>
            </div>
            
            {/* Heure de Départ */}
            <div className="flex items-center">
              <ClockIcon className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Heure de Départ</p>
                <p className="font-medium text-sm">
                  {formatTime(reservation.heureDepart)}
                </p>
              </div>
            </div>

            {/* Heure d'Arrivée */}
            <div className="flex items-center">
              <ClockIcon className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Heure d'Arrivée</p>
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
                <p className="text-gray-600 text-xs">Initiateur de l'Annulation</p>
                <p className="font-medium text-sm">
                  {reservation.initiateurAnnulation}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <IdentificationIcon className="h-6 w-6 text-purple-500 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Agence Prestataire</p>
                <p className="font-bold text-lg">
                  {reservation.agencePrestaire}
                </p>
              </div>
            </div>
            
            <div className="flex items-center col-span-full">
              <NoSymbolIcon className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Cause de l'Annulation</p>
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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Voyages Annulés</h1>
          <div className="text-xl font-bold text-red-600">Mooving Voyages</div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {historiqueData.historiques
            .filter(reservation => reservation.etatVoyage === 'annulé')
            .map((reservation) => (
              <div 
                key={reservation.idHistorique} 
                className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-l-4 border-red-500"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Réservation #{reservation.idHistorique}
                    </h2>
                    <div className="flex items-center space-x-2">
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
                  
                  <div className="grid grid-cols-2 gap-3">
                    {/* Lieu de Départ */}
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Lieu Départ</p>
                        <p className="font-medium text-xs">{reservation.lieuDepart}</p>
                      </div>
                    </div>
                    
                    {/* Heure de Départ */}
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Heure Départ</p>
                        <p className="font-medium text-xs">
                          {formatTime(reservation.heureDepart)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Lieu d'Arrivée */}
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-green-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Lieu Arrivée</p>
                        <p className="font-medium text-xs">{reservation.lieuArrivee}</p>
                      </div>
                    </div>
                    
                    {/* Heure d'Arrivée */}
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-green-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Heure Arrivée</p>
                        <p className="font-medium text-xs">
                          {formatTime(reservation.heureArrivee)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Date de Départ */}
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-teal-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Date Départ</p>
                        <p className="font-medium text-xs">{reservation.dateDepart}</p>
                      </div>
                    </div>
                    
                    {/* Initiateur d'Annulation */}
                    <div className="flex items-center col-span-2">
                      <UserCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Initiateur d'Annulation</p>
                        <p className="font-medium text-xs">
                          {reservation.initiateurAnnulation}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-center">
                    <button 
                      onClick={() => setSelectedReservation(
                        selectedReservation === reservation ? null : reservation
                      )}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-xs w-full"
                    >
                      Détails Annulation
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