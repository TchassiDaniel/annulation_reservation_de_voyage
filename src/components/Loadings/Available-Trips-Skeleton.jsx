const AvailableTripsLoadingSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-xl overflow-hidden shadow-sm border animate-pulse">
                    {/* Image container avec badge VIP */}
                    <div className="relative">
                        <div className="h-48 bg-gradient-to-r from-blue-200 to-reservation-color/70"></div>
                        <div className="absolute top-2 right-2 w-12 h-6 bg-white/80 rounded-full"></div>
                    </div>

                    <div className="p-4 space-y-4">
                        {/* Type et Prix */}
                        <div className="flex justify-between items-start">
                            <div className="w-24 h-6 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                            <div className="text-right">
                                <div className="w-32 h-6 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                                <div className="w-20 h-4 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded mt-1"></div>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <div key={star} className="w-4 h-4 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                            ))}
                            <div className="w-8 h-4 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded ml-2"></div>
                        </div>

                        {/* Départ et Durée */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-200 to-reservation-color/70"></div>
                                <div className="w-36 h-5 bg-gradient-to-r from-blue-200 to-indigo-500rounded"></div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-200 to-reservation-color/70"></div>
                                <div className="w-24 h-5 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                            </div>
                        </div>

                        {/* Available Seats */}
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-200 to-reservation-color/70"></div>
                            <div className="w-28 h-5 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                        </div>

                        {/* Amenities */}
                        <div className="flex space-x-4">
                            {[1, 2, 3].map((amenity) => (
                                <div key={amenity} className="w-16 h-6 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                            ))}
                        </div>

                        {/* Route et Bouton */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-200 to-reservation-color/70 "></div>
                                <div className="w-20 h-5 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                                <div className="w-4 h-4 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                                <div className="w-20 h-5 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                            </div>
                            <div className="w-24 h-10 bg-gradient-to-r from-blue-200 to-reservation-color/60 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AvailableTripsLoadingSkeleton

