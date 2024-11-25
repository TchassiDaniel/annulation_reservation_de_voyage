import RefundSection from "@/components/availableTripComponents/refundSection";

const boutonSection = () => {
  return (
    <>
      <div className="flex flex-col items-center space-y-6">
        {/* Buttons Section */}
        <div id="action-buttons" className="flex space-x-4">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors">
            Réserver
          </button>
          {/* <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition-colors">
              Confirmer
            </button>
            <button className="bg-red-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-red-700 transition-colors">
              Annuler
            </button> */}
        </div>

        {<RefundSection />}
      </div>
    </>
  );
};

export default boutonSection;
