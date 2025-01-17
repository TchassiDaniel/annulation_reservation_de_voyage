"use client";
import React, { useState } from "react";
import { Calendar, Timer, MapPin, MapPinHouse } from "lucide-react";
import dynamic from "next/dynamic";
//import html2pdf from "html2pdf.js";
//const DynamicComponent = dynamic(() => import("html2pdf.js"), { ssr: false });

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

  const generatePDF = async (couponId) => {
    const element = document.getElementById(`pdf-content-${couponId}`); // L'élément HTML à convertir
    const html2pdf = (await import("html2pdf.js")).default;

    const options = {
      margin: 1,
      filename: `coupon-${couponId}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    //    DynamicComponent().then((html2pdf) => {
    html2pdf().set(options).from(element).save();
    //    });
  };

  return (
    <div className="min-h-screen p-4">
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
                ? "bg-reservation-details-color text-white"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            All
          </button>

          <button
            onClick={() => setActiveTab("VALIDE")}
            className={`px-4 py-2 rounded-lg text-md font-medium transition-colors ${
              activeTab === "confirmed"
                ? "bg-reservation-details-color text-white"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            Valid
          </button>

          <button
            onClick={() => setActiveTab("EXPIRE")}
            className={`px-4 py-2 rounded-lg text-md font-medium transition-colors ${
              activeTab === "reserved"
                ? "bg-reservation-details-color text-white"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            Expired
          </button>
        </div>
      </div>

      <div className="mx-auto py-6">
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
                className="border border-blue-600 bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-reservation-color">
                      <h3 className="text-xl font-bold">
                        Coupon ID: {coupon.idCoupon}
                      </h3>
                    </div>
                    <div className="flex gap-2">
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
                  <div className="text-right">
                    <p className="text-3xl font-bold text-reservation-color">
                      {coupon.valeur.toLocaleString()} FCFA
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 mb-6 ml-10">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-reservation-color" />
                    <div>
                      <p className="text-sm text-gray-500">Agency</p>
                      <p className="font-medium">{coupon.nomAgence}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPinHouse className="h-5 w-5 text-red-500" />

                    <div>
                      <p className="text-sm text-gray-500">Destination</p>
                      <p className="font-medium">{coupon.lieuArrive}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-reservation-color" />
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">
                        {new Date(coupon.dateDebut).toLocaleDateString(
                          "en-EN",
                          {
                            dateStyle: "long",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Timer className="h-5 w-5 text-reservation-color" />
                    <div>
                      <p className="text-sm text-gray-500">End Date</p>
                      <p className="font-medium">
                        {new Date(coupon.dateFin).toLocaleDateString("en-EN", {
                          dateStyle: "long",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={generatePDF}
                    className="bg-reservation-color px-4 py-2 rounded-md text-white font-bold hover:bg-reservation-color/90 transition-all duration-300">
                    Print PDF
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Coupons;
