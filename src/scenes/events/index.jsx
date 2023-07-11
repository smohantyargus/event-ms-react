import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import Event from "scenes/single-event";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
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
      <ul className="event-main ag-format-container">
        <div className="ag-courses_box">
          {events.map((event) => (
            <li key={event.id} onClick={() => handleClick(event)}>
              <div className="event ag-courses_item shadow">
                {/* <h3>{event.eventTitle}</h3>
                <p>{event.eventDescription.substring(0,25)}</p> */}
                <a href="#" className="ag-courses-item_link">
                  <div className="ag-courses-item_bg"></div>

                  <div className="ag-courses-item_title">
                    {event.eventTitle}
                  </div>

                  <div className="ag-courses-item_date-box">
                    Start:
                    <span className="ag-courses-item_date">
                      {" "}
                      {event.eventStartTime}
                    </span>
                  </div>
                  <div className="ag-courses-item_date-box">
                    {event.eventLocation}
                  </div>
                  <div className="ag-courses-item_date-box">
                    {event.eventDate.substring(0, 10)}
                  </div>
                </a>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Events;
