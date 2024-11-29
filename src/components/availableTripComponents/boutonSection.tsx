const BoutonSection = () => {
  return (
    <>
      <div className="flex flex-col items-center space-y-6">
        {/* Buttons Section */}
        <div id="action-buttons" className="flex space-x-4">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors">
            Réserver
          </button>
        </div>
      </div>
    </>
  );
};

export default BoutonSection;
