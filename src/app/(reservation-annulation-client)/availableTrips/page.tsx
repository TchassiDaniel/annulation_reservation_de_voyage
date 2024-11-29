import {Button} from "@/components/ui/button";
import busImage from "../../../../public/busImage.png";
import Image from "next/image";
import {ViewDetailsButton} from "@/components/availableTripComponents/viewDetailsButton";

export default function Trips()
{
    const Trip =
        [
            {
                tripId: "99124",
                image: busImage,
                title: "GENERAL VOYAGES",
                destination: "Douala - Yaounde",
                seats: "23/70"
            },
            {
                tripId: "93424",
                image: busImage,
                title: "GENERAL VOYAGES",
                destination: "Douala - Yaounde",
                seats: "23/70"
            },
            {
                tripId: "95424",
                image: busImage,
                title: "GENERAL VOYAGES",
                destination: "Douala - Yaounde",
                seats: "23/70"
            },
            {
                tripId: "92324",
                image: busImage,
                title: "GENERAL VOYAGES",
                destination: "Douala - Yaounde",
                seats: "23/70"
            },
            {
                tripId: "93424",
                image: busImage,
                title: "GENERAL VOYAGES",
                destination: "Douala - Yaounde",
                seats: "23/70"
            },
            {
                tripId: "99344",
                image: busImage,
                title: "GENERAL VOYAGES",
                destination: "Douala - Yaounde",
                seats: "21/50"
            },
            {
                tripId: "99124",
                image: busImage,
                title: "GENERAL VOYAGES",
                destination: "Douala - Yaounde",
                seats: "23/70"
            },
            {
                tripId: "99344",
                image: busImage,
                title: "MUSANGO VOYAGES",
                destination: "Douala - Yaounde",
                seats: "26/70"
            },
            {
                tripId: "99344",
                image: busImage,
                title: "FINEX VOYAGES",
                destination: "BUEA - YAOUNDE",
                seats: "10/70"
            },
        ]



    return (
      <>
        <div className="h-24 bg-gradient-to-r from-blue-300 to-reservation-color"></div>
        <div className="flex flex-col">
          <div className="flex flex-col ml-5 mt-8">
            <h1 className="text-3xl font-bold">All Available Journey</h1>
            <p className="mt-5 text-md">
              We provide you a least of available journey
            </p>

            <div className="flex gap-5 mt-4">
              <Button size="primary" variant="primary">
                Douala
              </Button>

              <Button size="primary" variant="primary">
                Yaounde
              </Button>

              <Button size="primary" variant="primary">
                Limbe
              </Button>
            </div>
          </div>

          <div className="mt-8 ml-5 mr-5">
            <div className="grid grid-cols-3 gap-6">
              {Trip.map((trip, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col shadow-lg hover:shadow-2xl rounded-xl border-2 w-[350px] h-[300px]">
                    <Image
                      src={trip.image}
                      alt={"image du voyage"}
                      className="w-full h-48"
                    />
                    <h2 className="mt-6 text-xl font-bold ml-4">
                      {trip.title}
                    </h2>
                    <p className=" mt-2 ml-4 text-md">{trip.destination}</p>
                    <div className="flex justify-between mr-4 ml-2">
                      <p className="text-gray-500 mt-3 ml-2 mb-5">
                        Seats:{" " + trip.seats}
                      </p>
                      <ViewDetailsButton tripId={trip.tripId} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
}