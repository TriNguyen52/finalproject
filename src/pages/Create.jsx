import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import "./create.css";

const Create = () => {
  const [name, setName] = useState("");
  const [concert, setConcert] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [genre, setGenre] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // For success messages
  const navigate = useNavigate();

  const createPost = async (e) => {
    e.preventDefault();

    // Front-end validation
    if (!name.trim() || !concert.trim()) {
      setErrorMessage("Name and Concert fields are required.");
      setSuccessMessage(""); // Clear success message on error
      return;
    }

    setErrorMessage(""); // Clear error message before submitting

    // Insert new post into Supabase
    const { data, error } = await supabase.from("Concert").insert({
      name,
      concert,
      description,
      link,
      genre,
    });

    if (error) {
      console.error("Error inserting post:", error.message);
      setErrorMessage("Failed to create post: " + error.message);
      setSuccessMessage(""); // Clear success message on error
    } else {
      setErrorMessage(""); // Clear error message on success
      setSuccessMessage("Post created successfully!");
      setTimeout(() => {
        navigate("/gallery"); // Redirect to gallery page after a short delay
      }, 1000);
    }
  };

  return (
    <div className="create-page">
      <div className="card">
        <h1 className="create-title">Create a New Event</h1>
        <form onSubmit={createPost} className="create-form">
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

          {/* Submit Button */}
          <button type="submit" className="create-button">
            Create Post 🎉
          </button>

          {/* Success and Error Messages */}
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Create;
