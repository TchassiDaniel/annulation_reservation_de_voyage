"use client";

import { useEffect, useState } from "react";
import TripDescriptionTab from "@/components/availableTripComponents/tripDescriptionTab";
import BoutonSection from "@/components/availableTripComponents/boutonSection";
import TripImageCarousel from "@/components/availableTripComponents/TripImageCarousel";
import axios from "axios";

export default function RenderOneTrip({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const [tripId, setTripId] = useState<string | null>(null);
  const [, setTrip] = useState(null);

  // Récupération des paramètres
  useEffect(() => {
    params.then((resolvedParams) => {
      setTripId(resolvedParams.tripId);
    });
  }, [params]);

  // Récupération des données du voyage
  useEffect(() => {
    if (tripId) {
      async function fetchVoyagebyId() {
        try {
          const response = await axios.get(
            `http://backend-reseau.ddns.net:8085/api/voyage/${tripId}`
          );
          setTrip(response.data);
          //console.log(response.data);
        } catch (error) {
          console.log("erreur lors du chargement d'un voyage by id", error);
        }
      }
      fetchVoyagebyId();
    }
  }, [tripId]);

  const Trip = {
    idVoyage: "99124",
    titre: "m1-Douala-Yaounde",
    images: [
      "Dreamland_Beach__Bali.webp",
      "Bali_Temple.webp", // Add additional images here
      "Bali_Landscape.webp", // Example of multiple images
    ],
    description:
      "Partez à la découverte de Bali, une île paradisiaque où nature luxuriante et culture ancestrale se rencontrent. Ce voyage vous permettra d;explorer les plus beaux temples, de vous détendre sur des plages de sable fin, et de vous immerger dans la culture balinaise.",
    dateDepartPrevu: "Douala - Yaounde",
    nbPlaceRestante: "23",
    nbrPlaceReservable: "70",
    lieuArrive: "Douala",
    prix: "7800",
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Carousel */}
      <TripImageCarousel images={Trip.images} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Destination</h3>
            <p>{Trip.lieuArrive}</p>
            <p className="text-gray-600">Départ le {Trip.dateDepartPrevu}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Prix</h3>
            <p className="text-2xl text-green-600">{Trip.prix} XFA</p>
            <p className="text-gray-600">par personne</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Points forts</h3>
            <p>Voyages paisible, culture locale</p>
            <p className="text-gray-600">Pension complète</p>
          </div>
        </div>

        <BoutonSection />
        <TripDescriptionTab tripDescription={Trip.description} />
      </div>
    </div>
  );
}
