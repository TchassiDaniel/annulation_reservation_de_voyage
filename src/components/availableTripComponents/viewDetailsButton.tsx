"use client";


import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export function ViewDetailsButton ({tripId}: {tripId: string})
{
    const router = useRouter();

    return (
        <Button variant="tertiary"
                onClick= { ()=> { router.push(`/availableTrips/${tripId}`) }}>
            View Details
        </Button>
    );
}