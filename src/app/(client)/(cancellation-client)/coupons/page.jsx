"use client";
import React, { useState, useRef } from "react";
import { Calendar, Timer, MapPin, MapPinHouse, Printer } from "lucide-react";

const Coupons = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState({});
  const coupons = [
    {
      idCoupon: "C-1",
      dateDebut: "2025-01-08T14:23:39.491Z",
      dateFin: "2025-01-15T14:23:39.491Z",
      statusCoupon: "VALIDE",
      valeur: 1000,
      idHistorique: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      nomAgence: "EXPRESS-VOYAGE",
      lieuArrive: "Douala",
    },
    {
      idCoupon: "C-2",
      dateDebut: "2025-02-13T14:23:39.491Z",
      dateFin: "2025-02-20T14:23:39.491Z",
      statusCoupon: "EXPIRE",
      valeur: 500,
      idHistorique: "4fa85f64-5717-4562-b3fc-2c963f66afa7",
      nomAgence: "BUCCA-VOYAGE",
      lieuArrive: "Edea",
    },
  ];

  const printCoupon = (couponId) => {
    // Récupérer l'élément du coupon
    const couponElement = document.getElementById(`pdf-content-${couponId}`);

    // Créer une nouvelle fenêtre d'impression
    const printWindow = window.open("", "", "height=600,width=800");

    // Ajouter les styles Tailwind et personnalisés
    printWindow.document.write(`
    <html>
      <head>
        <title>Coupon de Remboursement</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @media print {
            body {
              margin: 0;
              padding: 20px;
            }
            .print-container {
              max-width: 600px;
              margin: 0 auto;
              border: 2px solid #2563eb;
              padding: 20px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
          }
        </style>
      </head>
      <body class="bg-gray-100 p-6">
        <div class="print-container bg-white rounded-xl shadow-lg border-2 border-blue-600 p-6">
          ${couponElement.innerHTML}
        </div>
      </body>
    </html>
  `);

    printWindow.document.close();

    // Attendre un court instant pour s'assurer que le contenu est chargé
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-gray-100 rounded-lg">
        <div className="mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-reservation-color">
            My Coupons
          </h1>
          <p className="mt-2 text-md font-medium">
            Manage your coupons and track their validity.
          </p>
        </div>
      </div>

      <div className="mx-auto py-6">
        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg text-md font-medium transition-colors ${
              activeTab === "all"
                ? "bg-reservation-color text-white"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            All
          </button>

          <button
            onClick={() => setActiveTab("VALIDE")}
            className={`px-4 py-2 rounded-lg text-md font-medium transition-colors ${
              activeTab === "VALIDE"
                ? "bg-reservation-color text-white"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            Valid
          </button>

          <button
            onClick={() => setActiveTab("EXPIRE")}
            className={`px-4 py-2 rounded-lg text-md font-medium transition-colors ${
              activeTab === "EXPIRE"
                ? "bg-reservation-color text-white"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            Expired
          </button>
        </div>
      </div>

      <div className="mx-auto">
        <div className="space-y-4">
          {coupons
            .filter(
              (coupon) =>
                activeTab === "all" || coupon.statusCoupon === activeTab
            )
            .map((coupon) => (
              <div
                key={coupon.idCoupon}
                id={`pdf-content-${coupon.idCoupon}`}
                className="border-2 border-blue-600 bg-white rounded-xl p-6 shadow-md">
                <div className="text-center mb-3">
                  <h2 className="text-2xl font-bold text-blue-800">
                    Coupon de Remboursement
                  </h2>
                  <p className="text-gray-600">Annulation de Voyage</p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Coupon ID</p>
                    <p className="font-bold text-blue-800">{coupon.idCoupon}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        coupon.statusCoupon === "VALIDE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                      {coupon.statusCoupon}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Agency</p>
                    <MapPin className="h-5 w-5 text-blue-600 inline-block mr-2" />
                    <span>{coupon.nomAgence}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Destination</p>
                    <MapPinHouse className="h-5 w-5 text-red-500 inline-block mr-2" />
                    <span>{coupon.lieuArrive}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Date de Debut</p>
                    <Calendar className="h-5 w-5 text-blue-600 inline-block mr-2" />
                    <span className="font-medium">
                      {new Date(coupon.dateDebut).toLocaleDateString("fr-FR", {
                        dateStyle: "long",
                      })}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date de Fin</p>
                    <Timer className="h-5 w-5 text-blue-600 inline-block mr-2" />
                    <span className="font-medium">
                      {new Date(coupon.dateFin).toLocaleDateString("fr-FR", {
                        dateStyle: "long",
                      })}
                    </span>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <p className="text-2xl font-bold text-blue-800">
                    Montant du Remboursement
                  </p>
                  <p className="text-3xl font-extrabold text-green-600">
                    {coupon.valeur.toLocaleString()} FCFA
                  </p>
                </div>
                <div className="mt-6 flex justify-center">
                  {coupon.statusCoupon === "VALIDE" && (
                    <div className="mt-5 flex justify-end">
                      <button
                        onClick={() => printCoupon(coupon.idCoupon)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-300 shadow-md flex items-center">
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          ;
        </div>
      </div>
    </div>
  );
};

export default Coupons;
