// DoubleDateInput.js

import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
const DoubleDateInput = ({ onDateRangeSelect }) => {
 const today = new Date();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    onDateRangeSelect(ranges.selection); // Pass selected date range back to parent
  };

  return (
    <DateRange
      editableDateInputs={true}
      onChange={handleSelect}
      moveRangeOnFirstSelection={false}
      ranges={dateRange}
      minDate={today}
    />
  );
};

export default DoubleDateInput;
