import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

const Event = () => {

    const[event, setEvent] = useState({});
    const { id} = useParams();
    useEffect(() => {
        axios.get(`http://localhost:9090/event/${id}`)
            .then((res) => setEvent(res.data))
            .catch((err) => console.log(err));
    },[]);

    return (
    <div className="single-event">
        <h1>{event.eventTitle}</h1>
        <p>{event.eventDescription}</p>
        <p>Venue : {event.eventLocation}</p>
        <p>Event Timing :- {event.eventStartTime} - {event.eventEndTime}</p>
        <p>Event Link :- <a href= {event.eventLink}>Open Link</a></p>
        { event.eventAddInfo && <p>Additional info : {event.eventAddInfo}</p>}
    </div>
    )
}

export default Event;