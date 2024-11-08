import React from "react";

const trips = [
  {
    idVoyage: "1",
    titre: "m1-Douala-Yaounde",
    prix: "7,000 XAF",
    dateDepartPrevu: "Wed 1:00pm",
    description: "un voyage classique",
    state: "Payed",
  },
  {
    idVoyage: "2",
    titre: "m2-Douala-Yaounde",
    prix: "8,000 XAF",
    dateDepartPrevu: "Wed 1:00pm",
    description: "un voyage classique",
    state: "Payed",
  },
  {
    idVoyage: "3",
    titre: "m3-Douala-Yaounde",
    prix: "6,000 XAF",
    dateDepartPrevu: "Wed 1:00pm",
    description: "un voyage classique",
    state: "not Payed",
  },
];

export default function HomePage() {
  return (
    <div className="py-8 min-h-screen">
      <div className="flex flex-row justify-between mb-8">
        <h1 className="text-3xl font-bold ml-8">Sheduled Trips</h1>
        <button className="mr-8 px-4 border rounded">View all</button>
      </div>
      <div className="flex mx-8 justify-between items-center border-b-2">
        <div className="flex space-x-4 pb-1">
          <button className="text-blue-500 border-b-4 border-sky-500">
            All
          </button>
          <button>Already Refunded</button>
          <button>Refunded</button>
        </div>
      </div>
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr className="text-left text-gray-500 bg-gray-200 border-b">
            <th className="p-4">ID</th>
            <th className="p-4">Title</th>
            <th className="p-4">Transport Fees</th>
            <th className="p-4">Date/Time</th>
            <th className="p-4">Refunded Amount</th>
            <th className="p-4">State</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip, index) => (
            <tr
              key={index}
              className={
                trip.state === "Payed"
                  ? " border-b-2 bg-green-50"
                  : "border-b-2 bg-red-50"
              }>
              {/* className={
                index % 2 === 0 ? " border-b-2" : "border-b-2 bg-green-50"
              }> */}
              <td className="p-4">{trip.idVoyage}</td>
              <td className="p-4  font-semibold">{trip.titre}</td>
              <td className="p-4 text-gray-700 font-medium">
                <span className="px-2 py-1  text-blue-600  rounded-full">
                  {trip.prix}
                </span>
              </td>
              <td className="p-4 ">
                <span className="px-2 py-1 bg-gray-200 rounded-full">
                  {trip.dateDepartPrevu}
                </span>
              </td>
              <td className="p-4">{trip.description}</td>
              <td className="p-4">
                {/* <span className="px-2 py-1 text-green-600 rounded-full"> */}
                <span
                  className={
                    trip.state === "Payed"
                      ? "text-green-500 hover:text-green-700 border-2 border-green-500 rounded-full px-2"
                      : "text-red-500 hover:text-red-700 border-2 border-red-500 rounded-full px-2"
                  }>
                  {trip.state}
                </span>
              </td>
              <td className="p-4 flex space-x-4">
                <button className="text-green-500 hover:text-green-600">
                  <i className="fas fa-eye"></i>
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
