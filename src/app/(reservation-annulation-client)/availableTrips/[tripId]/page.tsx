import Image from "next/image";
import TripDescriptionTab from "@/components/availableTripComponents/tripDescriptionTab";
import BoutonSection from "@/components/availableTripComponents/boutonSection";

interface TripProps {
  params: { tripId: string };
}

export default function RenderOneTrip({}: TripProps) {
  const Trip = {
    idVoyage: "99124",
    titre: "m1-Douala-Yaounde",
    image: "Dreamland_Beach__Bali.webp",
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
      {/* Hero Section */}
      <div className="relative h-96 ml-2">
        <Image
          src={`/${Trip.image}`}
          alt="Plage de Bali"
          className="w-full h-full object-cover"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4 text-shadow">
              Découvrez Bali
            </h1>
            <p className="text-xl text-shadow">
              L&apos;île des Dieux vous attend
            </p>
          </div>
        </div>
      </div>

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

        <TripDescriptionTab tripDescription={Trip.description} />
        <BoutonSection />
      </div>
    </div>
  );
}
