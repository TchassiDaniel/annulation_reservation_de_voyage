"use client";
import { useState } from "react";

function TripDescriptionTab({ tripDescription }: { tripDescription: string }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeTab, setActiveTab] = useState("description");

  const switchTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="mb-8">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => switchTab("description")}
            className={`tab-btn py-4 px-8 font-medium relative border-b-2 transition-all duration-200 ease-in-out ${
              activeTab === "description" ? "active-tab" : ""
            }`}>
            Description
          </button>
          <button
            onClick={() => switchTab("politique")}
            className={`tab-btn py-4 px-8 font-medium relative border-b-2 transition-all duration-200 ease-in-out ${
              activeTab === "politique" ? "active-tab" : ""
            }`}>
            Politique de réservation
          </button>
        </nav>
      </div>

      <div className="mt-2">
        {activeTab === "description" && (
          <div
            id="description-content"
            className="tab-content bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6">Description du séjour</h2>
            <p className="text-gray-700 mb-4">{tripDescription}</p>
          </div>
        )}

        {activeTab === "politique" && (
          <div
            id="politique-content"
            className="tab-content bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6">
              Politique de réservation
            </h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Conditions de réservation
              </h3>
              <p className="text-gray-700">
                - Acompte de 30% à la réservation
                <br />
                - Solde à régler 45 jours avant le départ
                <br />- Passeport valide 6 mois après la date retour
              </p>
              <h3 className="text-xl font-semibold mt-6">
                Conditions d&apos;annulation
              </h3>
              <p className="text-gray-700">
                - Plus de 45 jours avant le départ : 150€ de frais
                <br />
                - Entre 45 et 30 jours : 30% du montant total
                <br />
                - Entre 29 et 15 jours : 50% du montant total
                <br />- Moins de 15 jours : 100% du montant total
              </p>
              <h3 className="text-xl font-semibold mt-6">Assurance voyage</h3>
              <p className="text-gray-700">
                Une assurance voyage est fortement recommandée. Nous proposons
                une assurance complète pour 85€ par personne.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TripDescriptionTab;
