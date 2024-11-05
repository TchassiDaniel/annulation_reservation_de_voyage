interface TripProps {
    params: { tripId: string };
}

export default function RenderOneTrip({ params }: TripProps) {
    return (
        <div className="min-h-screen">
            {" "+ params.tripId}
        </div>
    );
}
