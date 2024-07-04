import { MdClose } from "react-icons/md";

const FormHeader = ({ setShowForm }) => {
  return (
    <div className="text-gray-500 flex justify-between items-center mb-4">
      <h2>New Task</h2>
      <button
        onClick={() => setShowForm(false)}
        className="text-gray-500 hover:text-gray-800 focus:outline-none"
      >
        <MdClose size={24} />
      </button>
    </div>
  );
};

export default FormHeader;
