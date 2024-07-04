const TitleDescription = ({ title, setTitle, description, setDescription }) => {
  return (
    <>
      <input
        type="text"
        id="title"
        placeholder="Task name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        required
      />
      <textarea
        id="description"
        placeholder="Task details"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        rows="3"
      />
    </>
  );
};

export default TitleDescription;
