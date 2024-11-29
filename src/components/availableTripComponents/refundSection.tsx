"use client";
import { useState } from "react";

const RefundSection = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isRefundVisible, setRefundVisible] = useState(false);

  const showRefundAmount = () => {
    setRefundVisible(true);
  };

  return (
    <div id="refund-section" className="text-center">
      {!isRefundVisible && (
        <button
          id="preview-refund-btn"
          onClick={showRefundAmount}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
          Prévisualiser le remboursement
        </button>
      )}
      {isRefundVisible && (
        <p
          id="refund-amount"
          className="text-2xl font-bold text-green-600 mt-4">
          1 249.50 €
        </p>
      )}
    </div>
  );
};

export default RefundSection;
