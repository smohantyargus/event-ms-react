import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import Event from "scenes/single-event";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const getAllEvents = () => {
    axios
      .get("http://localhost:9090/getEvents")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err));
  };

  const handleClick = (event) => {
    navigate(`/event/${event.id}`);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="events-container">
      <h1>Events</h1>
      <ul className="event-main">  
        { events.map((event) => (
            <li key={event.id} onClick={() => handleClick(event)}>
              <div className="event" >
                <h3>{event.eventTitle}</h3>
                <p>{event.eventDescription.substring(0,25)}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Events;
