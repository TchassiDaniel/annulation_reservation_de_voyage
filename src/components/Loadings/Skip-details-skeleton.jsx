export default function TripDetailsSkeleton  () {
    return (
        <div className="animate-pulse p-4">
            {/* Hero Section */}
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-reservation-color/70"></div>
                {/* Navigation Arrows */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                    <div className="w-10 h-10 rounded-full bg-white/20"></div>
                    <div className="w-10 h-10 rounded-full bg-white/20"></div>
                </div>
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
                    <div className="h-10 w-72 bg-white/20 rounded mb-2"></div>
                    <div className="h-6 w-48 bg-white/20 rounded"></div>
                </div>
                {/* Book Now Button */}
                <div className="absolute bottom-6 right-6">
                    <div className="w-32 h-12 rounded-lg bg-gradient-to-r from-blue-200 to-reservation-color/70"></div>
                </div>
                {/* Slider Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-white/40"></div>
                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                </div>
            </div>

            {/* Trip Details Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                    {/* Travel Details */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Travel Date */}
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 rounded bg-gradient-to-r from-blue-200 to-reservation-color/70"></div>
                            <div>
                                <div className="h-4 w-24 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded mb-2"></div>
                                <div className="h-5 w-32 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                            </div>
                        </div>

                        {/* Departure Time */}
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 rounded bg-gradient-to-r from-blue-200 to-reservation-color/70"></div>
                            <div>
                                <div className="h-4 w-24 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded mb-2"></div>
                                <div className="h-5 w-32 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 rounded bg-gradient-to-r from-blue-200 to-reservation-color/70"></div>
                            <div>
                                <div className="h-4 w-24 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded mb-2"></div>
                                <div className="h-5 w-32 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                            </div>
                        </div>

                        {/* Seats */}
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 rounded bg-gradient-to-r from-blue-200 to-reservation-color/70"></div>
                            <div>
                                <div className="h-4 w-24 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded mb-2"></div>
                                <div className="h-5 w-32 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Reservation Policy */}
                    <div className="pt-6 border-t">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 rounded bg-gradient-to-r  from-blue-200 to-reservation-color/70"></div>
                            <div className="h-6 w-48 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded bg-gradient-to-r from-blue-200 to-reservation-color/70"></div>
                            <div className="h-5 w-64 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Price and Additional Info */}
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
                    {/* Price */}
                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded from-blue-200 to-reservation-color/70"></div>
                        <div>
                            <div className="h-4 w-16 bg-gradient-to-r  from-blue-200 to-reservation-color/70 rounded mb-2"></div>
                            <div className="h-8 w-48 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                        </div>
                    </div>

                    {/* Trip Class */}
                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded bg-gradient-to-r from-blue-200 to-reservation-color/70"></div>
                        <div>
                            <div className="h-4 w-24 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded mb-2"></div>
                            <div className="h-5 w-16 bg-gradient-to-r from-blue-200 to-reservation-color/70 rounded"></div>
                        </div>
                    </div>

                    {/* Departure Location */}
                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded from-blue-200 to-reservation-color/70"></div>
                        <div>
                            <div className="h-4 w-32 bg-gradient-to-r  from-blue-200 to-reservation-color/70 rounded mb-2"></div>
                            <div className="h-5 w-24 bg-gradient-to-r  from-blue-200 to-reservation-color/70 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



