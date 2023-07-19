import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './index.css';
import api from 'api';

const EventCalendar = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        api
        .get("/event/all")
        .then((res) => {
            const newEvents = res.data.map((event) => ({
                id: event.id,
                title: event.title,
                start: new Date(event.startDate),
                end: new Date(event.endDate),
              })); 
          setEvents(newEvents);
        })
        .catch((err) => {
          console.log(err);
        });
        
    },[]);
    
    const localizer = momentLocalizer(moment);
    return (
        <div className='calendar-main'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    )
}

export default EventCalendar;