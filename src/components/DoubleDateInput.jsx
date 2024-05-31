import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/doubleDateInput.css';

const DoubleDateInput = ({ onDateRangeSelect, disabledDates }) => {
  const today = new Date();

  const isDayReserved = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return disabledDates.some(({ startDate, endDate }) => {
      return formattedDate >= startDate && formattedDate <= endDate;
    });
  };

  const isDayInPast = (date) => {
    return date < today;
  };

  const findNearestUnreservedDay = () => {
    let nextDay = new Date(today);
    while (isDayReserved(nextDay)) {
      nextDay.setDate(nextDay.getDate() + 1);
    }
    return nextDay;
  };

  const [startDate, setStartDate] = useState(findNearestUnreservedDay());
  const [endDate, setEndDate] = useState(null);
  const [formattedDisabledDates, setFormattedDisabledDates] = useState([]);
  const [disabledMessage, setDisabledMessage] = useState('');

  useEffect(() => {
    const formattedDates = disabledDates.map(({ startDate, endDate }) => ({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    }));
    setFormattedDisabledDates(formattedDates);
  }, [disabledDates]);

  const handleSelect = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const isOverlap = formattedDisabledDates.some(({ startDate: ds, endDate: de }) => {
        return (
          (start >= ds && start <= de) ||
          (end >= ds && end <= de) ||
          (ds >= start && ds <= end) ||
          (de >= start && de <= end) ||
          (start >= ds && end <= de)
        );
      });

      if (isOverlap) {
        setDisabledMessage('La période est déjà réservée.');
        setStartDate(null);
        setEndDate(null);
      } else {
        setDisabledMessage('');
        onDateRangeSelect({ startDate: start, endDate: end });
      }
    }
  };

  const dayClassName = (date) => {
    if (isDayReserved(date)) {
      return 'react-datepicker__day--disabled-red';
    }
    if (isDayInPast(date)) {
      return 'react-datepicker__day--disabled-grey';
    }
    return '';
  };

  const excludeDates = formattedDisabledDates.flatMap(({ startDate, endDate }) => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  });

  return (
    <div className="double-date-input-container">
      <DatePicker 
        selected={startDate}
        onChange={handleSelect}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        minDate={today}
        excludeDates={excludeDates}
        dayClassName={dayClassName}
      />
      {disabledMessage && (
        <div className="alert alert-danger" role="alert">
          {disabledMessage}
        </div>
      )}
    </div>
  );
  
  
};

export default DoubleDateInput;
