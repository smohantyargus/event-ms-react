import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import SearchBar from "scenes/search-bar";
import api from "api";
import UserContext from "context/user/UserContext";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  let { setVisibilityTrue, setVisibilityFalse } = useContext(UserContext);

  const getAllEvents = () => {
    setVisibilityTrue();
    api
      .get("/event/all")
      .then((res) => {
        setVisibilityFalse();
        setEvents(res.data);
      })
      .catch((err) => {
        setVisibilityFalse();
        console.log(err);
      });
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") getAllEvents();
    else
      api
        .get(`/event/search/${searchTerm}`)
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
      <SearchBar onSearch={handleSearch} />
      <ul className="event-main ag-format-container">
        <div className="ag-courses_box">
          {events?.map((event) => (
            <li key={event?.id} onClick={() => handleClick(event)}>
              <div className="event ag-courses_item shadow">
                <a href="#" className="ag-courses-item_link">
                  <div className="ag-courses-item_bg"></div>

                  <div className="ag-courses-item_title">{event?.title}</div>

                  <div className="ag-courses-item_date-box">
                    Start:
                    <span className="ag-courses-item_date">
                      {" "}
                      {event?.startTime}
                    </span>
                  </div>
                  <div className="ag-courses-item_date-box">
                    {event?.location}
                  </div>
                  <div className="ag-courses-item_date-box">
                    {event?.startDate?.substring(0, 10)}
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
