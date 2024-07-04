const FormFooter = ({ error, isSubmitting }) => {
  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        className={`mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isSubmitting}
      >
        Confirm
      </button>
    </>
  );
};

export default FormFooter;
