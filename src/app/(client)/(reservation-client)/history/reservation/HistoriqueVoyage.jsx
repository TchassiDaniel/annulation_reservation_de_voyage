'use client';
import React, { useState } from 'react';
import { 
  MapPinIcon, 
  ClockIcon, 
  StarIcon, 
  TicketIcon, 
  UserIcon, 
  IdentificationIcon,
  DocumentIcon,
  UserCircleIcon,
  CubeIcon,
  CurrencyEuroIcon,
  UsersIcon,
  XMarkIcon,
  PrinterIcon,
  LuggageIcon,
  CalendarIcon
} from '@heroicons/react/24/solid';

import historiqueData from '../../../../../data/historiquevoyage.json';

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
              padding: 20px;
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
              border-bottom: 2px dashed #e0e0e0;
              padding-bottom: 15px;
              margin-bottom: 20px;
            }
            .ticket-logo {
              font-size: 1.5rem;
              font-weight: bold;
              color: #3b82f6;
            }
            .passenger-section {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 15px;
              margin-bottom: 20px;
              background-color: #f0f9ff;
              padding: 20px;
              border-radius: 10px;
            }
            .passenger-detail {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .passenger-detail-icon {
              background-color: #3b82f6;
              color: white;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 10px;
            }
            .journey-section {
              display: flex;
              flex-direction: column;
              gap: 20px;
              margin-bottom: 20px;
              border-top: 2px dashed #e0e0e0;
              padding-top: 20px;
            }
            .journey-point {
              display: flex;
              align-items: center;
              gap: 15px;
              background-color: #f8fafc;
              padding: 15px;
              border-radius: 10px;
            }
            .journey-point-icon {
              background-color: #3b82f6;
              color: white;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.5rem;
            }
            .ticket-footer {
              text-align: center;
              margin-top: 20px;
              padding-top: 15px;
              border-top: 2px dashed #e0e0e0;
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
                <div class="passenger-detail-icon">👤</div>
                <p class="text-sm text-gray-600">Nom</p>
                <p class="font-semibold text-lg">${selectedReservation.passagerDetails.nom}</p>
              </div>
              
              <div class="passenger-detail">
                <div class="passenger-detail-icon">🆔</div>
                <p class="text-sm text-gray-600">Carte ID</p>
                <p class="font-semibold text-lg">${selectedReservation.passagerDetails.carteID}</p>
              </div>
              
              <div class="passenger-detail">
                <div class="passenger-detail-icon">👵</div>
                <p class="text-sm text-gray-600">Âge</p>
                <p class="font-semibold text-lg">${selectedReservation.passagerDetails.age} ans</p>
              </div>
              
              <div class="passenger-detail">
                <div class="passenger-detail-icon">👫</div>
                <p class="text-sm text-gray-600">Genre</p>
                <p class="font-semibold text-lg">${selectedReservation.passagerDetails.genre}</p>
              </div>
              
              <div class="passenger-detail">
                <div class="passenger-detail-icon">💺</div>
                <p class="text-sm text-gray-600">Siège</p>
                <p class="font-semibold text-lg">${selectedReservation.passagerDetails.siege}</p>
              </div>
              
              <div class="passenger-detail">
                <div class="passenger-detail-icon">🧳</div>
                <p class="text-sm text-gray-600">Bagages</p>
                <p class="font-semibold text-lg">${selectedReservation.passagerDetails.bagages} bagage(s)</p>
              </div>
            </div>
            
            <div class="journey-section">
              <div class="journey-point">
                <div class="journey-point-icon">🚏</div>
                <div class="flex-grow">
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
                <div class="journey-point-icon">🏁</div>
                <div class="flex-grow">
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
                Prix du Billet: ${selectedReservation.passagerDetails.prixBillet} FCFA
              </p>
              <p class="text-xs text-gray-500 mt-2">Merci de voyager avec Mooving Voyages</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(ticketContent);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const renderPassengerDetails = (passager) => {
    if (!passager) {
      return <div>Aucun détail de passager disponible</div>;
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full relative">
          <div className="absolute top-4 left-4 text-2xl font-bold text-blue-600">
            Mooving Voyages
          </div>
          <button 
            onClick={() => setSelectedReservation(null)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>

          <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <UserCircleIcon className="h-10 w-10 text-blue-500 mr-3" />
            Détails du Passager
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <UserIcon className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Nom</p>
                <p className="font-medium text-lg">{passager.nom || 'Non renseigné'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <IdentificationIcon className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Carte ID</p>
                <p className="font-medium text-lg">{passager.carteID || 'Non renseigné'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Âge</p>
                <p className="font-medium text-lg">{passager.age ? `${passager.age} ans` : 'Non renseigné'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <DocumentIcon className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Bagages</p>
                <p className="font-medium text-lg">{passager.bagages || 0} bagage(s)</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <UsersIcon className="h-8 w-8 text-pink-500 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Genre</p>
                <p className="font-medium text-lg">{passager.genre || 'Non renseigné'}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <CubeIcon className="h-8 w-8 text-teal-500 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Siège</p>
                <p className="font-medium text-lg">{passager.siege || 'Non attribué'}</p>
              </div>
            </div>
            
            <div className="flex items-center col-span-full">
              <CurrencyEuroIcon className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Prix du Billet</p>
                <p className="font-bold text-xl">
                  {passager.prixBillet ? `${passager.prixBillet} FCFA` : 'Non renseigné'}
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={printTicket}
            className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition text-lg flex items-center justify-center"
          >
            <PrinterIcon className="h-6 w-6 mr-2" />
            Imprimer le Billet
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Historique des Réservations</h1>
          <div className="text-2xl font-bold text-blue-600">Mooving Voyages</div>
        </div>
        
        <div className="grid gap-6">
          {historiqueData.historiques.map((reservation) => (
            <div 
              key={reservation.idHistorique} 
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Réservation #{reservation.idHistorique}
                  </h2>
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      reservation.statusHistorique === 'ANNULÉ'
                        ? 'bg-red-100 text-red-800'
                        : reservation.statusHistorique === 'EN_ATTENTE'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {reservation.statusHistorique}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Lieu de Départ */}
                  <div className="flex items-center">
                    <MapPinIcon className="h-6 w-6 text-blue-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Lieu de Départ</p>
                      <p className="font-medium">{reservation.lieuDepart}</p>
                    </div>
                  </div>
                  
                  {/* Quartier de Départ */}
                  <div className="flex items-center">
                    <MapPinIcon className="h-6 w-6 text-indigo-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Quartier de Départ</p>
                      <p className="font-medium">{reservation.quartierDepart}</p>
                    </div>
                  </div>
                  
                  {/* Lieu d'Arrivée */}
                  <div className="flex items-center">
                    <MapPinIcon className="h-6 w-6 text-green-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Lieu d'Arrivée</p>
                      <p className="font-medium">{reservation.lieuArrivee}</p>
                    </div>
                  </div>
                  
                  {/* Quartier d'Arrivée */}
                  <div className="flex items-center">
                    <MapPinIcon className="h-6 w-6 text-emerald-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Quartier d'Arrivée</p>
                      <p className="font-medium">{reservation.quartierArrivee}</p>
                    </div>
                  </div>
                  
                  {/* Date de Départ */}
                  <div className="flex items-center">
                    <CalendarIcon className="h-6 w-6 text-teal-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Date de Départ</p>
                      <p className="font-medium">{reservation.dateDepart}</p>
                    </div>
                  </div>
                  
                  {/* Heure de Départ */}
                  <div className="flex items-center">
                    <ClockIcon className="h-6 w-6 text-purple-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Heure de Départ</p>
                      <p className="font-medium">
                        {new Date(reservation.heureDepart).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Heure d'Arrivée */}
                  <div className="flex items-center">
                    <ClockIcon className="h-6 w-6 text-green-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Heure d'Arrivée</p>
                      <p className="font-medium">
                        {new Date(reservation.heureArrivee).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Classe de Voyage */}
                  <div className="flex items-center">
                    <TicketIcon className="h-6 w-6 text-orange-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Classe de Voyage</p>
                      <p className="font-medium">{reservation.classeVoyage}</p>
                    </div>
                  </div>
                  
                  {/* Statut VIP */}
                  <div className="flex items-center">
                    <StarIcon className="h-6 w-6 text-yellow-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Statut VIP</p>
                      <p className="font-medium">
                        {reservation.classeVoyage === 'VIP' ? 'Oui' : 'Non'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Nombre de Bagages */}
                  <div className="flex items-center">
                    <DocumentIcon className="h-6 w-6 text-green-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Nombre de Bagages</p>
                      <p className="font-medium">
                        {reservation.passagerDetails.bagages} bagage(s)
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <button 
                    onClick={() => setSelectedReservation(
                      selectedReservation === reservation ? null : reservation
                    )}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm"
                  >
                    Voir Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedReservation && 
        renderPassengerDetails(selectedReservation.passagerDetails)
      }
    </div>
  );
}