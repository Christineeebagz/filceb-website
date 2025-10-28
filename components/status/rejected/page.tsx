// components/status/pending/page.tsx
const Rejected = () => {
  return (
    <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Icon */}

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-3">
        Application Not Approved
      </h2>

      {/* Message */}
      <div className="space-y-3 mb-6">
        <p className="text-gray-600 leading-relaxed">
          Thank you for your submission and interest. After careful review,
          we're unable to approve your application at this time.
        </p>
        <p className="text-sm text-gray-500">
          We appreciate you taking the time to apply.
        </p>
      </div>

      {/* Additional Info */}
      <div className="text-xs text-gray-400 border-t border-gray-100 pt-4">
        For questions, please contact our support team.
      </div>
    </div>
  );
};

export default Rejected;
