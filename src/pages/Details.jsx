import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";
import "./details.css";

const Details = () => {
  const { id } = useParams();
  const [concert, setConcert] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchConcertDetails();
    fetchComments();
  }, [id]); // Fetch data when 'id' changes

  const fetchConcertDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("Concert")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("Error fetching concert details:", error?.message || "No data");
        setConcert(null);
      } else {
        setConcert(data);
      }
    } catch (err) {
      console.error("Unexpected error fetching concert:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("Comments")
        .select("*")
        .eq("concert_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching comments:", error.message);
      } else {
        setComments(data || []); // Ensure comments is an array
      }
    } catch (err) {
      console.error("Unexpected error fetching comments:", err);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setErrorMessage("Comment content cannot be empty.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("Comments")
        .insert([
          {
            concert_id: id,
            content: newComment,
          },
        ])
        .select(); // Ensure the inserted data is returned

      if (error) {
        console.error("Error adding comment:", error.message);
        setErrorMessage("Failed to add comment.");
      } else if (data?.length) {
        setComments([data[0], ...comments]); // Update the state with the new comment
        setNewComment("");
        setErrorMessage("");
      } else {
        console.error("No comment data returned.");
        setErrorMessage("Failed to add comment.");
      }
    } catch (err) {
      console.error("Unexpected error adding comment:", err);
      setErrorMessage("Failed to add comment.");
    }
  };

  const upvoteConcert = async () => {
    if (!concert) return;

    try {
      const { data, error } = await supabase
        .from("Concert")
        .update({ upvotes: (concert.upvotes || 0) + 1 })
        .eq("id", id)
        .select(); // Get the updated data

      if (error) {
        console.error("Error upvoting concert:", error.message);
      } else if (data) {
        setConcert((prev) => ({ ...prev, upvotes: (prev.upvotes || 0) + 1 }));
        setSuccessMessage("Upvote added!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.error("Unexpected error upvoting concert:", err);
    }
  };

  return (
    <div className="page">
      {concert ? (
        <div className="post-card">
          <h1>{concert.name}</h1>
          <p>{concert.concert}</p>
          <p>{concert.description}</p>
          {concert.link ? (
            <a href={concert.link} target="_blank" rel="noopener noreferrer">
              External Link
            </a>
          ) : (
            <p className="no-link">No external link provided.</p>
          )}
          <div className="card-footer">
            <button onClick={upvoteConcert} className="upvote">
              Upvote 🎉 ({concert.upvotes || 0})
            </button>
            <Link to={`/edit/${concert.id}`}>
              <button className="edit">Edit Concert</button>
            </Link>
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
      ) : (
        <div className="loading-spinner">Loading concert details...</div>
      )}

      <div className="comment-card">
        <h3>Comments</h3>
        <form onSubmit={addComment} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
          />
          <button type="submit">Post Comment</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.content}</p>
              <small>{new Date(comment.created_at).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Details;
