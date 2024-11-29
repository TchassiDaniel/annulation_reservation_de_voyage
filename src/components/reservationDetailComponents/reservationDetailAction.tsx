"use client";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ReservationDetailAction = ({
  reservationId,
}: {
  reservationId: string;
}) => {
  const router = useRouter();
  return (
    <FaEye
      className="ml-8"
      data-tip="Voir" // Texte au survol
      style={{
        fontSize: "18px",
        cursor: "pointer",
        color: "blue",
      }}
      onClick={() => {
        router.push(`/scheduledTrips/${reservationId}`);
      }}
    />
  );
};

export default ReservationDetailAction;
