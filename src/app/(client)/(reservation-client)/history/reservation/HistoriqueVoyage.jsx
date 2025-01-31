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
  XMarkIcon
} from '@heroicons/react/24/solid';

import historiqueData from '../../../../../data/historiquevoyage.json';

export default function HistoriqueVoyage() {
  const [selectedReservation, setSelectedReservation] = useState(null);

  const renderPassengerDetails = (passager) => {
    if (!passager) {
      return <div>Aucun détail de passager disponible</div>;
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full relative">
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
                <p className="font-medium text-lg">{passager.bagages || 0}</p>
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
            onClick={() => window.print()}
            className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition text-lg"
          >
            Imprimer le Billet
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Historique des Réservations</h1>
        
        <div className="grid gap-6">
          {historiqueData.historiques.map((reservation) => (
            <div 
              key={reservation.idHistorique} 
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Réservation #{reservation.idReservation}
                  </h2>
                  <span 
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      reservation.statusHistorique === 'ANNULER_PAR_AGENCE_APRES_RESERVATION'
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
                  <div className="flex items-center">
                    <MapPinIcon className="h-6 w-6 text-blue-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Lieu de Départ</p>
                      <p className="font-medium">{reservation.lieuDepart}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPinIcon className="h-6 w-6 text-green-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Lieu d'Arrivée</p>
                      <p className="font-medium">{reservation.lieuArrivee}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <ClockIcon className="h-6 w-6 text-purple-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Heure de Départ</p>
                      <p className="font-medium">
                        {new Date(reservation.heureDepart).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <TicketIcon className="h-6 w-6 text-orange-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Classe de Voyage</p>
                      <p className="font-medium">{reservation.classeVoyage}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <StarIcon className="h-6 w-6 text-yellow-500 mr-2" />
                    <div>
                      <p className="text-gray-600">Statut VIP</p>
                      <p className="font-medium">
                        {reservation.estVIP ? 'Oui' : 'Non'}
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
                    Voir détail
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