import outline from "./../assets/ce385016.png";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ event }) => {
  if (!event) return <p className="event-not-found">Event not found</p>; // Fallback in case event is not found

  return (
    <div className="event-card">
      <Link to={`/${event.id}`} className="event-card-link">
        <div className="event-card-content">
          <img src={outline} alt="Event outline" className="event-image" />
          <p className="event-name">{event.name}</p>
          <p className="event-concert-type">
            Concert Type: <span className="event-info">{event.concert}</span>
          </p>
          <p className="event-genre">
            Genre: <span className="event-info">{event.genre}</span>
          </p>
        </div>
      </Link>

      <div className="edit-button-container">
        <button className="edit-button">
          <Link to={`/${event.id}/edit`}>Edit Event</Link>
        </button>
      </div>
    </div>
  );
};

export default Card;
