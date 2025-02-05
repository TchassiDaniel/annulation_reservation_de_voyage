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
  CalendarIcon
} from '@heroicons/react/24/solid';

import historiqueData from '@/data/historiquevoyage.json';

export default function HistoriqueVoyage() {
  const [selectedReservation, setSelectedReservation] = useState(null);

  const printTicket = () => {
    if (!selectedReservation) return;

    const printWindow = window.open('', '_blank');
    
    const ticketContent = `
      <html>
        <head>
          <title>Billet de Voyage - Mooving Voyages</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              background-color: #f4f4f4;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              padding: 0;
            }
            .ticket-container {
              background-color: white;
              border-radius: 16px;
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
              max-width: 600px;
              width: 100%;
              padding: 30px;
              border: 3px solid #3b82f6;
              position: relative;
              overflow: hidden;
            }
            .ticket-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
            }
            .ticket-logo {
              font-size: 1.5rem;
              font-weight: bold;
              color: #3b82f6;
            }
            .passenger-section {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 15px;
              margin-bottom: 20px;
              background-color: #f0f9ff;
              padding: 20px;
              border-radius: 10px;
            }
            .passenger-detail {
              text-align: center;
              padding: 10px;
              background-color: white;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .journey-section {
              border-top: 2px dashed #e0e0e0;
              padding-top: 20px;
              margin-bottom: 20px;
            }
            .journey-point {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 15px;
            }
            .ticket-footer {
              text-align: center;
              border-top: 2px dashed #e0e0e0;
              padding-top: 15px;
            }
            @media print {
              body { margin: 0; padding: 10px; }
              .ticket-container { max-width: 100%; padding: 10px !important; }
            }
            @media screen and (max-width: 600px) {
              .ticket-container { 
                padding: 15px; 
                border-radius: 8px; 
              }
              .passenger-section { 
                grid-template-columns: repeat(2, 1fr) !important; 
                gap: 10px !important; 
              }
            }
          </style>
        </head>
        <body>
          <div class="ticket-container">
            <div class="ticket-header">
              <div class="ticket-logo">Mooving Voyages</div>
              <div>
                <h1 class="text-2xl font-bold text-gray-800">Billet de Voyage</h1>
                <p class="text-sm text-gray-600">Réservation #${selectedReservation.idHistorique}</p>
              </div>
            </div>
            
            <div class="passenger-section">
              <div class="passenger-detail">
                <p class="text-sm text-gray-600">Nom</p>
                <p class="font-semibold text-lg">${selectedReservation.passagerDetails.nom}</p>
              </div>
              <div class="passenger-detail">
                <p class="text-sm text-gray-600">Carte ID</p>
                <p class="font-semibold text-lg">${selectedReservation.passagerDetails.carteID}</p>
              </div>
              <div class="passenger-detail">
                <p class="text-sm text-gray-600">Âge</p>
                <p class="font-semibold text-lg">${selectedReservation.passagerDetails.age} ans</p>
              </div>
              <div class="passenger-detail">
                <p class="text-sm text-gray-600">Genre</p>
                <p class="font-semibold text-lg">${selectedReservation.passagerDetails.genre}</p>
              </div>
              <div class="passenger-detail">
                <p class="text-sm text-gray-600">Siège</p>
                <p class="font-semibold text-lg">${selectedReservation.passagerDetails.siege}</p>
              </div>
              <div class="passenger-detail">
                <p class="text-sm text-gray-600">Prix du Billet</p>
                <p class="font-semibold text-lg">${selectedReservation.passagerDetails.prixBillet} FCFA</p>
              </div>
            </div>
            
            <div class="journey-section">
              <div class="journey-point">
                <div>
                  <h3 class="text-lg font-bold text-blue-700">Départ</h3>
                  <p class="text-xl font-semibold">${selectedReservation.lieuDepart}</p>
                  <p class="text-sm text-gray-600">Quartier: ${selectedReservation.quartierDepart}</p>
                  <p class="text-xs text-gray-500">${selectedReservation.dateDepart}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-600">Heure</p>
                  <p class="font-bold">${new Date(selectedReservation.heureDepart).toLocaleTimeString()}</p>
                </div>
              </div>
              
              <div class="journey-point">
                <div>
                  <h3 class="text-lg font-bold text-green-700">Arrivée</h3>
                  <p class="text-xl font-semibold">${selectedReservation.lieuArrivee}</p>
                  <p class="text-sm text-gray-600">Quartier: ${selectedReservation.quartierArrivee}</p>
                  <p class="text-xs text-gray-500">${new Date(selectedReservation.heureArrivee).toLocaleDateString()}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-600">Heure</p>
                  <p class="font-bold">${new Date(selectedReservation.heureArrivee).toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
            
            <div class="ticket-footer">
              <p class="text-lg font-bold text-blue-700">
                Statut du Voyage: ${selectedReservation.statusVoyage}
              </p>
              <p class="text-xs text-gray-500 mt-2">Merci de voyager avec Mooving Voyages</p>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(ticketContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const renderPassengerDetails = (passager) => {
    if (!passager) {
      return <div>Aucun détail de passager disponible</div>;
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
          <div className="absolute top-4 left-4 text-xl font-bold text-blue-600">
            Mooving Voyages
          </div>
          <button 
            onClick={() => setSelectedReservation(null)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <UserCircleIcon className="h-8 w-8 text-blue-500 mr-3" />
            Détails du Passager
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <UserIcon className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Nom</p>
                <p className="font-medium text-sm">{passager.nom || 'Non renseigné'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <IdentificationIcon className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Carte ID</p>
                <p className="font-medium text-sm">{passager.carteID || 'Non renseigné'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <ClockIcon className="h-6 w-6 text-purple-500 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Âge</p>
                <p className="font-medium text-sm">{passager.age ? `${passager.age} ans` : 'Non renseigné'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <UsersIcon className="h-6 w-6 text-pink-500 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Genre</p>
                <p className="font-medium text-sm">{passager.genre || 'Non renseigné'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <CubeIcon className="h-6 w-6 text-teal-500 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Siège</p>
                <p className="font-medium text-sm">{passager.siege || 'Non attribué'}</p>
              </div>
            </div>
            
            <div className="flex items-center col-span-full">
              <CurrencyEuroIcon className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-gray-600 text-xs">Prix du Billet</p>
                <p className="font-bold text-lg">
                  {passager.prixBillet ? `${passager.prixBillet} FCFA` : 'Non renseigné'}
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={printTicket}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm flex items-center justify-center"
          >
            <PrinterIcon className="h-5 w-5 mr-2" />
            Imprimer le Billet
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-2">
      <div className="mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl text-reservation-color font-bold  mb-4 sm:mb-0">
            Reservation History
          </h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {historiqueData.historiques
            .filter(reservation => reservation.etatVoyage !== 'annulé')
            .map((reservation) => (
              <div 
                key={reservation.idHistorique} 
                className="bg-gray-100 shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="p-4">
                  <div className="flex  justify-between  mb-3">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
                      Réservation #{reservation.idHistorique}
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
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reservation.etatVoyage === 'en cours' ? 'bg-blue-100 text-blue-800' :
                          reservation.etatVoyage === 'en attente' ? 'bg-yellow-100 text-yellow-800' :
                          reservation.etatVoyage === 'terminé' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {reservation.etatVoyage}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-7">
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Lieu Départ</p>
                        <p className="font-medium text-xs">{reservation.lieuDepart}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-indigo-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Quartier Départ</p>
                        <p className="font-medium text-xs">{reservation.quartierDepart}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-green-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Lieu Arrivée</p>
                        <p className="font-medium text-xs">{reservation.lieuArrivee}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-emerald-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Quartier Arrivée</p>
                        <p className="font-medium text-xs">{reservation.quartierArrivee}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-teal-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Date Départ</p>
                        <p className="font-medium text-xs">{reservation.dateDepart}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-purple-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Heure Départ</p>
                        <p className="font-medium text-xs">
                          {new Date(reservation.heureDepart).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-green-500 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Heure Arrivée</p>
                        <p className="font-medium text-xs">
                          {new Date(reservation.heureArrivee).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center col-span-2">
                      <CurrencyEuroIcon className="h-5 w-5 text-green-600 mr-2" />
                      <div>
                        <p className="text-xs text-gray-600">Prix Billet</p>
                        <p className="font-medium text-xs">
                          {reservation.passagerDetails.prixBillet} FCFA
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-center">
                    <button 
                      onClick={() => setSelectedReservation(
                        selectedReservation === reservation ? null : reservation
                      )}
                      className="bg-reservation-color text-white px-4 py-2 font-semibold rounded-lg hover:bg-blue-700 transition text-sm lg:text-md"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        
        {selectedReservation && renderPassengerDetails(selectedReservation.passagerDetails)}
      </div>
    </div>
  );
}