// components/status/pending/page.tsx
const Pending = () => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Application Under Review</h2>
      <p className="text-lg mb-4">
        Thank you for submitting your registration! Your application is
        currently under review.
      </p>
      <p className="text-gray-600">
        You will be notified once your application has been approved.
      </p>
    </div>
  );
};

export default Pending;
