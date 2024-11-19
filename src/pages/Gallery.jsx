import { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import "./gallery.css";

const Gallery = ({ searchTerm }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortOption, setSortOption] = useState("created_at"); // Default sort by created time

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("Concert").select("*");
      if (error) {
        console.error("Error fetching posts", error.message);
      } else {
        const postsWithStats = await Promise.all(
          data.map(async (post) => {
            const { count: commentCount } = await supabase
              .from("Comments")
              .select("*", { count: "exact" })
              .eq("concert_id", post.id);

            return { ...post, commentCount };
          })
        );
        setPosts(postsWithStats);
        setFilteredPosts(postsWithStats);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    let updatedPosts = [...posts];

    // Filter posts by search term
    if (searchTerm.trim()) {
      updatedPosts = updatedPosts.filter((post) =>
        post.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort posts based on the selected sort option
    updatedPosts.sort((a, b) => {
      if (sortOption === "upvotes") {
        return (b.upvotes || 0) - (a.upvotes || 0); // Sort by upvotes (descending)
      } else {
        return new Date(b.created_at) - new Date(a.created_at); // Sort by created time (descending)
      }
    });

    setFilteredPosts(updatedPosts);
  }, [searchTerm, sortOption, posts]);

  return (
    <div className="gallery-page">
      <h1 className="gallery-title">What we're having!</h1>

      {/* Sort Dropdown */}
      <div className="sort-container">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="sort-select"
        >
          <option value="created_at">Sort by Created Time</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>
      </div>

      <div className="gallery-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="gallery-card">
              <h3 className="gallery-card-title">{post.name}</h3>
              <p className="gallery-card-concert">{post.concert}</p>

              {/* Display upvotes and comment count */}
              <div className="gallery-card-stats">
                <p>Upvotes: {post.upvotes || 0}</p>
                <p>Comments: {post.commentCount || 0}</p>
              </div>

              <Link to={`/post/${post.id}`} className="view-post-link">
                View Post
              </Link>
            </div>
          ))
        ) : (
          <p className="no-posts">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
