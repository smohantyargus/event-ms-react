import React from "react";
import EventCalendar from "scenes/event-calendar";

const UserHome = () => {
  return (
    <div className="user-home-main-container">
      <div className="user-head-banner text-center">
        <h2>Event Management System</h2>
      </div>
      <EventCalendar />
    </div>
  );
};

export default UserHome;
