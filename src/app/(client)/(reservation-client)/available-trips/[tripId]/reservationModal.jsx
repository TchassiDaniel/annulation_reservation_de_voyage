'use client';

import React, { useState } from 'react';
import { X, CreditCard, Wallet, AlertCircle, Check, Info } from 'lucide-react';

export default function ReservationModal({ isOpen, onClose, tripDetails }) {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [paymentType, setPaymentType] = useState('full');
    const [partialAmount, setPartialAmount] = useState('');
    const [step, setStep] = useState(1);

    // Simulation des sièges du bus
    const generateBusSeats = () => {
        const seats = [];
        // 2 sièges à côté du chauffeur
        seats.push({ id: 1, status: 'available', position: 'front', row: 0 });
        seats.push({ id: 2, status: 'available', position: 'front', row: 0 });

        // 16 rangées de 4 sièges (2+2)
        for (let i = 1; i <= 16; i++) {
            seats.push({ id: i * 4 - 1, status: 'available', position: 'left', row: i });
            seats.push({ id: i * 4, status: 'available', position: 'left', row: i });
            seats.push({ id: i * 4 + 1, status: 'available', position: 'right', row: i });
            seats.push({ id: i * 4 + 2, status: 'available', position: 'right', row: i });
        }

        // Dernière rangée de 5 sièges
        seats.push({ id: 67, status: 'available', position: 'back', row: 17 });
        seats.push({ id: 68, status: 'available', position: 'back', row: 17 });
        seats.push({ id: 69, status: 'available', position: 'back', row: 17 });
        seats.push({ id: 70, status: 'available', position: 'back', row: 17 });
        seats.push({ id: 71, status: 'available', position: 'back', row: 17 });

        // Simuler quelques sièges déjà réservés
        return seats.map(seat => ({
            ...seat,
            status: Math.random() > 0.7 ? 'reserved' : 'available'
        }));
    };

    const busSeats = generateBusSeats();

    const totalPrice = selectedSeats.length * tripDetails?.price || 0;
    const minimumPayment = Math.ceil(totalPrice * 0.3); // 30% minimum requis

    const handleSeatClick = (seatId) => {
        if (busSeats[seatId - 1].status === 'reserved') return;

        setSelectedSeats(prev => {
            if (prev.includes(seatId)) {
                return prev.filter(id => id !== seatId);
            }
            return [...prev, seatId];
        });
    };

    const handlePartialAmountChange = (e) => {
        const value = e.target.value;
        if (value === '' || (Number(value) >= minimumPayment && Number(value) <= totalPrice)) {
            setPartialAmount(value);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                {/* En-tête du modal */}
                <div className="border-b p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Réservation de voyage</h2>
                        <p className="text-sm text-gray-500 mt-1">Sélectionnez vos places et procédez au paiement</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Contenu principal */}
                <div className="grid grid-cols-2 divide-x h-[600px]">
                    {/* Colonne de gauche - Formulaire */}
                    <div className="p-6 overflow-y-auto">
                        {step === 1 ? (
                            <>
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Détails du voyage</h3>
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Trajet :</span> {tripDetails?.route}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Date :</span> {tripDetails?.date}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Heure :</span> {tripDetails?.time}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Prix par siège :</span> {tripDetails?.price} FCFA
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Places sélectionnées</h3>
                                    {selectedSeats.length > 0 ? (
                                        <div className="bg-blue-50 rounded-lg p-4">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {selectedSeats.map(seatId => (
                                                    <span key={seatId} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            Siège {seatId}
                          </span>
                                                ))}
                                            </div>
                                            <p className="text-sm text-blue-600">
                                                Total : {totalPrice.toLocaleString()} FCFA
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            Veuillez sélectionner au moins une place dans le plan du bus
                                        </p>
                                    )}
                                </div>

                                {selectedSeats.length > 0 && (
                                    <button
                                        onClick={() => setStep(2)}
                                        className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Continuer vers le paiement
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-4">Options de paiement</h3>
                                    <div className="space-y-4">
                                        <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                            <input
                                                type="radio"
                                                name="paymentType"
                                                value="full"
                                                checked={paymentType === 'full'}
                                                onChange={(e) => setPaymentType(e.target.value)}
                                                className="mt-1"
                                            />
                                            <div className="ml-4">
                                                <div className="flex items-center gap-2">
                                                    <CreditCard className="h-5 w-5 text-blue-600" />
                                                    <span className="font-medium">Paiement complet</span>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Payez le montant total de {totalPrice.toLocaleString()} FCFA
                                                </p>
                                            </div>
                                        </label>

                                        <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                            <input
                                                type="radio"
                                                name="paymentType"
                                                value="partial"
                                                checked={paymentType === 'partial'}
                                                onChange={(e) => setPaymentType(e.target.value)}
                                                className="mt-1"
                                            />
                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <Wallet className="h-5 w-5 text-blue-600" />
                                                    <span className="font-medium">Paiement partiel</span>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Minimum requis : {minimumPayment.toLocaleString()} FCFA (30%)
                                                </p>
                                                {paymentType === 'partial' && (
                                                    <div className="mt-3">
                                                        <input
                                                            type="number"
                                                            value={partialAmount}
                                                            onChange={handlePartialAmountChange}
                                                            placeholder="Montant à payer"
                                                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                                    <div className="flex gap-3">
                                        <Info className="h-5 w-5 text-yellow-600" />
                                        <div className="text-sm text-yellow-800">
                                            <p className="font-medium mb-1">Important :</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Le paiement partiel doit être d'au moins 30% du montant total</li>
                                                <li>Le solde doit être réglé au plus tard 24h avant le départ</li>
                                                <li>La réservation est garantie une fois le paiement effectué</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Retour
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="flex-1 bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Procéder au paiement
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Colonne de droite - Plan du bus */}
                    <div className="p-6 bg-gray-50">
                        <h3 className="text-lg font-semibold mb-4">Sélection des places</h3>

                        {/* Légende */}
                        <div className="flex gap-4 mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-gray-200" />
                                <span className="text-sm text-gray-600">Disponible</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-blue-500" />
                                <span className="text-sm text-gray-600">Sélectionné</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-gray-400" />
                                <span className="text-sm text-gray-600">Réservé</span>
                            </div>
                        </div>

                        {/* Plan du bus */}
                        <div className="relative bg-white rounded-xl p-6 shadow-sm">
                            {/* Avant du bus */}
                            <div className="w-full h-12 bg-gray-200 rounded-t-xl mb-4 flex items-center justify-between px-4">
                                <div className="w-12 h-8 bg-gray-300 rounded flex items-center justify-center">
                                    <span className="text-xs text-gray-600">Chauffeur</span>
                                </div>
                                <div className="flex gap-1">
                                    {busSeats.slice(0, 2).map((seat) => (
                                        <button
                                            key={seat.id}
                                            onClick={() => handleSeatClick(seat.id)}
                                            disabled={seat.status === 'reserved'}
                                            className={`
                        w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-all
                        ${seat.status === 'reserved'
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : selectedSeats.includes(seat.id)
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }
                      `}
                                        >
                                            {seat.id}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sièges */}
                            <div className="grid grid-cols-4 gap-x-4 gap-y-2 max-w-md mx-auto">
                                {busSeats.slice(2, -5).map((seat, index) => (
                                    <React.Fragment key={seat.id}>
                                        <button
                                            onClick={() => handleSeatClick(seat.id)}
                                            disabled={seat.status === 'reserved'}
                                            className={`
                        w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-all
                        ${seat.status === 'reserved'
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : selectedSeats.includes(seat.id)
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }
                        ${index % 2 === 0 ? 'mr-1' : 'ml-1'}
                      `}
                                        >
                                            {seat.id}
                                        </button>
                                        {(index + 1) % 2 === 0 && index % 4 === 1 && <div className="col-span-2" />}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Dernière rangée (5 sièges) */}
                            <div className="mt-4 flex justify-center gap-1">
                                {busSeats.slice(-5).map((seat) => (
                                    <button
                                        key={seat.id}
                                        onClick={() => handleSeatClick(seat.id)}
                                        disabled={seat.status === 'reserved'}
                                        className={`
                      w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-all
                      ${seat.status === 'reserved'
                                            ? 'bg-gray-400 text-white cursor-not-allowed'
                                            : selectedSeats.includes(seat.id)
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }
                    `}
                                    >
                                        {seat.id}
                                    </button>
                                ))}
                            </div>

                            {/* Arrière du bus */}
                            <div className="w-full h-12 bg-gray-200 rounded-b-xl mt-4 flex items-center justify-center">
                                <span className="text-sm text-gray-600 font-medium">Arrière</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

