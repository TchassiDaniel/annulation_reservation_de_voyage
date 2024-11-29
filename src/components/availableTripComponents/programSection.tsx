const programSection = () => {
  return (
    <>
      {/* Program Section */}
      <div className="mt-8 tab-content bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">Programme</h2>
        <div className="border-l-4 border-blue-500 pl-4 mb-6">
          <h3 className="text-xl font-semibold mb-2">Jour 1-3 : Ubud</h3>
          <p className="text-gray-700">
            Découverte du cœur culturel de Bali, visite des rizières en
            terrasses, temples ancestraux.
          </p>
        </div>
        <div className="border-l-4 border-blue-500 pl-4 mb-6">
          <h3 className="text-xl font-semibold mb-2">Jour 4-7 : Nusa Dua</h3>
          <p className="text-gray-700">
            Séjour balnéaire, sports nautiques, spa et relaxation.
          </p>
        </div>
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="text-xl font-semibold mb-2">Jour 8-12 : Seminyak</h3>
          <p className="text-gray-700">
            Shopping, plages de surf, couchers de soleil spectaculaires.
          </p>
        </div>
      </div>
    </>
  );
};

export default programSection;
