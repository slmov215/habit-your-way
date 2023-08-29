import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the styles

function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>My Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
      />
      <p>Selected date: {selectedDate.toDateString()}</p>
    </div>
  );
}

export default MyCalendar;
