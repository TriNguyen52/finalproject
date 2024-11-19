const Form = (props) => {
  const { setName, setConcert, setDescription, setLink, setGenre } = props;

  return (
    <div className="form-container">
      <label htmlFor="name" className="my-4 text-3xl font-semibold">
        Event Name:
      </label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={(e) => setName(e.target.value)}
        className="text-black p-1"
        placeholder="Enter the event name"
      />

      <label htmlFor="concert" className="my-4 text-3xl font-semibold">
        Concert Type:
      </label>
      <input
        type="text"
        id="concert"
        name="concert"
        onChange={(e) => setConcert(e.target.value)}
        className="text-black p-1"
        placeholder="Enter the type of concert"
      />

      <label htmlFor="description" className="my-4 text-3xl font-semibold">
        Description:
      </label>
      <textarea
        id="description"
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        className="text-black p-1"
        placeholder="Describe the event"
      ></textarea>

      <label htmlFor="link" className="my-4 text-3xl font-semibold">
        External Link:
      </label>
      <input
        type="url"
        id="link"
        name="link"
        onChange={(e) => setLink(e.target.value)}
        className="text-black p-1"
        placeholder="Enter a link for more details"
      />

      <label htmlFor="genre" className="my-4 text-3xl font-semibold">
        Genre:
      </label>
      <select
        name="genre"
        id="genre"
        onChange={(e) => setGenre(e.target.value)}
        className="text-black p-1"
      >
        <option value="">Select A Genre</option>
        <option value="Hip-Hop">Hip-Hop</option>
        <option value="R&B">R&B</option>
        <option value="Rap">Rap</option>
        <option value="Trap">Trap</option>
        <option value="Old School">Old School</option>
        <option value="Funk">Funk</option>
        <option value="Jazz Fusion">Jazz Fusion</option>
      </select>
    </div>
  );
};

export default Form;
