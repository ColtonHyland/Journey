import React from "react";

const SpecificComponent = ({ specific, setSpecific }) => {
  const handleChange = (field, value) => {
    setSpecific((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h3 className="my-2 text-lg font-medium text-gray-700">Specific</h3>
      <label
        htmlFor="specificWhat"
        className="block text-sm font-medium text-gray-700"
      >
        What do I want to achieve?
      </label>
      <textarea
        id="specificWhat"
        value={specific.what}
        onChange={(e) => handleChange("what", e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
        rows="2"
        required
      ></textarea>
      <label
        htmlFor="specificWhy"
        className="block text-sm font-medium text-gray-700"
      >
        Why is this goal important?
      </label>
      <textarea
        id="specificWhy"
        value={specific.why}
        onChange={(e) => handleChange("why", e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
        rows="2"
        required
      ></textarea>
      <label
        htmlFor="specificWho"
        className="block text-sm font-medium text-gray-700"
      >
        Who is involved?
      </label>
      <textarea
        id="specificWho"
        value={specific.who}
        onChange={(e) => handleChange("who", e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
        rows="2"
        required
      ></textarea>
      <label
        htmlFor="specificWhere"
        className="block text-sm font-medium text-gray-700"
      >
        Where is it located?
      </label>
      <textarea
        id="specificWhere"
        value={specific.where}
        onChange={(e) => handleChange("where", e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
        rows="2"
        required
      ></textarea>
      <label
        htmlFor="specificResources"
        className="block text-sm font-medium text-gray-700"
      >
        Which resources or limits are involved?
      </label>
      <textarea
        id="specificResources"
        value={specific.resources}
        onChange={(e) => handleChange("resources", e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
        rows="2"
        required
      ></textarea>
    </div>
  );
};

export default SpecificComponent;
