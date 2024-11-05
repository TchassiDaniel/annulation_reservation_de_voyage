"use client";


import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export function ViewDetailsButton ()
{
    const router = useRouter();

    return (
        <Button variant="tertiary"
                onClick= { ()=> { router.push("/availableTrips/trips") }}>
            View Details
        </Button>
    );
}