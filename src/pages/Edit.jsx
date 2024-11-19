import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import "./create.css"; // Use your create.css or add specific styles for edit page

const Edit = () => {
  const { id } = useParams(); // To get the concert id from the URL params
  const [name, setName] = useState("");
  const [concert, setConcert] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [genre, setGenre] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchConcertDetails();
  }, [id]);

  // Function to fetch the concert details for editing
  const fetchConcertDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("Concert")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching concert details:", error.message);
      } else {
        setName(data.name);
        setConcert(data.concert);
        setDescription(data.description);
        setLink(data.link);
        setGenre(data.genre);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  // Function to handle the concert update
  const updateConcert = async (e) => {
    e.preventDefault();

    // Front-end validation
    if (!name.trim() || !concert.trim()) {
      setErrorMessage("Name and Concert fields are required.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("Concert")
        .update({ name, concert, description, link, genre })
        .eq("id", id);

      if (error) {
        console.error("Error updating concert:", error.message);
        setErrorMessage("Failed to update concert.");
      } else {
        alert("Concert updated successfully!");
        navigate(`/post/${id}`); // Redirect to the concert details page after update
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("Failed to update concert.");
    }
  };

  // Function to handle the concert deletion
  const deleteConcert = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this concert?");
    if (!confirmDelete) return;

    try {
      const { data, error } = await supabase
        .from("Concert")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting concert:", error.message);
      } else {
        alert("Concert deleted successfully!");
        navigate("/home"); // Redirect to home after deletion
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div className="create-page">
      <div className="card">
        <h1>Edit Concert</h1>
        <form onSubmit={updateConcert} className="create-form">
          {/* Name Input */}
          <label>
            Event Name: <span style={{ color: "red" }}>*</span>
            <input
              type="text"
              placeholder="Enter event name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          {/* Concert Type Input */}
          <label>
            Concert Type: <span style={{ color: "red" }}>*</span>
            <input
              type="text"
              placeholder="Enter concert type"
              value={concert}
              onChange={(e) => setConcert(e.target.value)}
              required
            />
          </label>

          {/* Description Input */}
          <label>
            Description:
            <textarea
              placeholder="Add event details (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          {/* Link Input */}
          <label>
            External Link:
            <input
              type="url"
              placeholder="Enter URL (optional)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </label>

          {/* Genre Input */}
          <label>
            Genre:
            <input
              type="text"
              placeholder="Enter genre (optional)"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </label>

          {/* Update Button */}
          <button type="submit" className="create-button">
            Update Concert 🎉
          </button>

          {/* Error Message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>

        {/* Delete Button */}
        <button onClick={deleteConcert} className="delete-button">
          Delete Concert ❌
        </button>
      </div>
    </div>
  );
};

export default Edit;
