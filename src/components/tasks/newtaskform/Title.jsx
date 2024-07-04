const Title = ({ title, setTitle, description, setDescription }) => {
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
    </>
  );
};

export default Title;
