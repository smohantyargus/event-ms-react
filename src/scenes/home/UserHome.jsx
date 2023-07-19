import React from "react";
import EventCalendar from "scenes/event-calendar";

const UserHome = () => {
  return (
    <div className="user-home-main-container">
      <div className="user-head-banner">
        <h2>
          <span className="user-argusoft-banner">Argusoft</span> Event
          Management System
        </h2>
      </div>
      {/* <div className="user-head-welcome">
        <h4>Welcome!</h4>
      </div>
      <h5>To view all events click Events in navbar</h5> */}

       <EventCalendar  />
    </div>
  );
};

export default UserHome;
