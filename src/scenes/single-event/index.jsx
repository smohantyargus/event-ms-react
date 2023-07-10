import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import { toast } from "react-toastify";

const Event = () => {
  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:9090/event/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:9090/deleteEvent/${id}`)
      .then((response) => {
        navigate("/events");
        toast.warning("Event Deleted!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  };

  return (
    <div className="single-event">
      <h1>{event.eventTitle}</h1>
      <p>{event.eventDescription}</p>
      <p>Venue : {event.eventLocation}</p>
      <p>
        Event Timing :- {event.eventStartTime} - {event.eventEndTime}
      </p>
      <p>
        Event Link :- <a href={event.eventLink}>Open Link</a>
      </p>
      {event.eventAddInfo && <p>Additional info : {event.eventAddInfo}</p>}
      <button
        className="btn btn-primary"
        onClick={handleDelete}
        style={{
          backgroundColor: "#802f59",
          borderColor: "#802f59",
        }}
      >
        Delete Post
      </button>
    </div>
  );
};

export default Event;
