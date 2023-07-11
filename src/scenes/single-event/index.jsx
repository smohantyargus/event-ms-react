import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import description from "../../icons/pinned-notes.png";
import address from "../../icons/map.png";
import date from "../../icons/schedule.png";
import link from "../../icons/link.png";
import info from "../../icons/info.png";
import { toast } from "react-toastify";
import UserContext from "context/user/UserContext";

const Event = () => {
  const [event, setEvent] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useContext(UserContext);
  const adminAuth = user.role === "admin";

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
        // console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  };

  return (
    <div className="single-event">
      <h1>{event.eventTitle}</h1>
      <section>
        <p className="desc-block">
          <img src={description} alt="description" className="desc-img" />
          <span className="desc">{event.eventDescription}</span>
        </p>
        <p>
        <img className="address-img" src={address} alt="address" />{" "}
        {event.eventLocation}
        </p>
        <p>
        <img className="date-img" src={date} alt="date" />{" "}
        {event.eventStartTime} - {event.eventEndTime}
        <br></br>
        </p>
        <p>
        <img className="link-img" src={link} alt="link" />
        <a href={event.eventLink}>Open Link</a>
        </p>
        {event.eventAddInfo && <p><img className = "info-img" src= {info} alt="additional info"/>    {event.eventAddInfo}</p>}
      </section>
      
      {adminAuth ? (
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
      ) : (
        <></>
      )}
    </div>
  );
};

export default Event;
