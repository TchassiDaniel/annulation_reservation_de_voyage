import Link from "next/link";
import React from "react";

export default function YouAreNotAuthenticated()
{
    return (
        <div className="justify-center">
            <Link className="text-3xl font-bold m-5 text-reservation-color" href="/">Login</Link>
            You are not Authenticated
        </div>
    )
}