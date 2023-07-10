import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import description from "../../icons/pinned-notes.png";
import address from "../../icons/map.png";
import date from "../../icons/schedule.png";
import link from "../../icons/link.png";

const Event = () => {
  const [event, setEvent] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:9090/event/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single-event">
      <h1>{event.eventTitle}</h1>
      <section>
        <p className="desc-block">
        <img src= {description} alt="description" className="desc-img"/>
        <span className="desc">
          {event.eventDescription}
        </span>
        </p>
          <br></br>
          <img  className= "address-img" src={address} alt="address"/> {event.eventLocation}
          <br></br>
          <img  className= "date-img" src={date} alt="date"/> {event.eventStartTime} - {event.eventEndTime}
          <br></br>
          <img  className="link-img" src={link} alt="link"/><a href={event.eventLink}>Open Link</a>
        
      </section>
      {event.eventAddInfo && <p>Additional info : {event.eventAddInfo}</p>}
    </div>
  );
};

export default Event;
