import {Briefcase, Calendar, CreditCard, User, Users} from "lucide-react";
import PropTypes from 'prop-types';

export default function TravellerInfosForm ({ seatNumber, onChange, passengerData }) {

    TravellerInfosForm.propTypes = {
        seatNumber: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        passengerData: PropTypes.object.isRequired
    }

    return (
        <div className="rounded-lg border-2 border-gray-200 p-4 mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-md font-semibold text-reservation-color mb-4 flex items-center">
                <Users className="mr-2 h-6 w-6"/>
                Seat {seatNumber}
            </h3>
            <div className="space-y-4">
                <div className="flex flex-row space-x-4">
                    <div className="flex-grow mb-0">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Traveler's full name"
                                className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-reservation-color"
                                onChange={(e) => onChange(seatNumber, 'nom', e.target.value)}
                                value={passengerData.nom || ''}
                            />
                            <User className="w-4 h-4 absolute left-3 top-3.5 text-gray-400"/>
                        </div>
                    </div>
                    <div className="w-1/4">
                        <div className="relative">
                            <select
                                className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-reservation-color appearance-none"
                                onChange={(e) => onChange(seatNumber, 'genre', e.target.value)}
                                value={passengerData.genre || ''}
                            >
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <Users className="w-4 h-4 absolute left-3 top-3.5 text-gray-400"/>
                            <div
                                className="pointer-events-none absolute inset-y-0 -right-1.5 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row space-x-4">
                    <div className="w-1/3">
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="Age"
                                className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-reservation-color"
                                onChange={(e) => onChange(seatNumber, 'age', e.target.value)}
                                value={passengerData.age || ''}
                            />
                            <Calendar className="w-4 h-4  absolute left-3 top-3.5 text-gray-400"/>
                        </div>
                    </div>
                    <div className="w-1/3">
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="luggage"
                                className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-reservation-color"
                                min="0"
                                max="4"
                                onChange={(e) => onChange(seatNumber, 'nbrBaggage', e.target.value)}
                                value={passengerData.nbrBaggage || ''}
                            />
                            <Briefcase className="w-4 h-4  absolute left-3 top-3.5 text-gray-400"/>
                        </div>
                    </div>
                    <div className="w-1/3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="ID card"
                                className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-reservation-color"
                                onChange={(e) => onChange(seatNumber, 'numeroPieceIdentific', e.target.value)}
                                value={passengerData.numeroPieceIdentific || ''}
                            />
                            <CreditCard className="w-4 h-4  absolute left-3 top-3.5 text-gray-400"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}