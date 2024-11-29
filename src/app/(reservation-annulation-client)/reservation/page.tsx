"use client"; // Directive obligatoire pour utiliser les hooks React

import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const trips = [
  {
    idVoyage: "1",
    titre: "Maroua-Yaounde",
    prix: "35,000 XAF",
    dateDepartPrevu: "2024-11-25 20:00",
    description: "Un voyage VIP",
    state: "Not Payed",
  },

  {
    idVoyage: "2",
    titre: "Douala-Yaounde",
    prix: "7,000 XAF",
    dateDepartPrevu: "2023-11-25 13:00",
    description: "Un voyage classique",
    state: "Payed",
  },
  {
    idVoyage: "3",
    titre: "Douala-Yaounde",
    prix: "7,000 XAF",
    dateDepartPrevu: "2023-11-25 22:30",
    description: "Un voyage classique",
    state: "Payed",
  },
  {
    idVoyage: "4",
    titre: "Bertoua-Yaounde",
    prix: "5,000 XAF",
    dateDepartPrevu: "2023-12-17 19:00",
    description: "Un voyage classique",
    state: "Payed",
  },
  {
    idVoyage: "5",
    titre: "Douala-Bafoussam",
    prix: "8,000 XAF",
    dateDepartPrevu: "2023-11-26 14:00",
    description: "VIP",
    state: "Payed",
  },
  {
    idVoyage: "6",
    titre: "Yaounde-Douala",
    prix: "6,000 XAF",
    dateDepartPrevu: "2023-11-25 15:00",
    description: "Un voyage rapide",
    state: "Not Payed",
  },
];

export default function HomePage() {
  const [filterState, setFilterState] = useState("All"); // État du filtre
  const [searchQuery, setSearchQuery] = useState(""); // État pour la recherche
  const [searchDate, setSearchDate] = useState(""); // Recherche par date

  // Filtrer les données selon les critères
  const filteredTrips = trips.filter((trip) => {
    // Filtrage par état
    const stateMatch =
      filterState === "All" || trip.state.toLowerCase() === filterState.toLowerCase();

    // Filtrage par ville (titre)
    const searchMatch = trip.titre.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtrage par date
    const dateMatch = searchDate === "" || trip.dateDepartPrevu.startsWith(searchDate);

    return stateMatch && searchMatch && dateMatch;
  });

  return (
    <div className="py-8 min-h-screen">
      {/* Barre de recherche et filtres */}
      <div className="flex flex-row justify-between items-center mx-8 mb-4">
        {/* Barre de recherche à droite */}
        <div className="flex space-x-4">
          {/* Filtres */}
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="All">Filtrer par état...</option>
            <option value="Payed">Payed</option>
            <option value="Not Payed">Not Payed</option>
          </select>

          {/* Recherche par date */}
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="border rounded px-4 py-2"
          />
        </div>

        {/* Recherche par ville */}
        <input
          type="text"
          placeholder="Rechercher par ville..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-4 py-2"
        />
      </div>

      {/* Tableau des données */}
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr className="text-left text-gray-500 bg-gray-200 border-b">
            <th className="p-4">ID</th>
            <th className="p-4">Ville</th>
            <th className="p-4">Prix</th>
            <th className="p-4">Date/Heure</th>
            <th className="p-4">Description</th>
            <th className="p-4">État</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "border-b-2" : "border-b-2 bg-gray-50"
                }
              >
                <td className="p-4">{trip.idVoyage}</td>
                <td className="p-4 font-semibold">{trip.titre}</td>
                <td className="p-4 text-gray-700 font-medium">
                  <span className="px-2 py-1 text-blue-600 rounded-full">
                    {trip.prix}
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-gray-200 rounded-full">
                    {trip.dateDepartPrevu}
                  </span>
                </td>
                <td className="p-4">{trip.description}</td>
                <td className="p-4">
                  <span
                    className={
                      trip.state === "Payed"
                        ? "text-green-500 hover:text-green-700 border-2 border-green-500 rounded-full px-2"
                        : "text-red-500 hover:text-red-700 border-2 border-red-500 rounded-full px-2"
                    }
                  >
                    {trip.state}
                  </span>
                </td>
                <td className="p-4 flex space-x-4">
                  <FaTrash
                    className="ml-8"
                    data-tip="Supprimer"
                    style={{
                      fontSize: "18px",
                      cursor: "pointer",
                      color: "red",
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="p-4 text-center text-gray-500">
                Aucun voyage ne correspond à vos critères.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
