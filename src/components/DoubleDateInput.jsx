import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../styles/doubleDateInput.css'
const DoubleDateInput = ({ onDateRangeSelect, disabledDates }) => {
  const today = new Date();
  const isDayReserved = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return disabledDates.some(({ startDate, endDate }) => {
      return formattedDate >= startDate && formattedDate <= endDate;
    });
  };
  const findNearestUnreservedDay = () => {
    let nextDay = new Date(today);
    while (isDayReserved(nextDay)) {
      nextDay.setDate(nextDay.getDate() + 1);
    }
    return [{ startDate: nextDay, endDate: nextDay, key: 'selection' }];
  };
  const [dateRange, setDateRange] = useState(findNearestUnreservedDay());
  const [formattedDisabledDates, setFormattedDisabledDates] = useState([]);
  const [disabledMessage, setDisabledMessage] = useState('');
  useEffect(() => {
    const formattedDates = disabledDates.map(({ startDate, endDate }) => ({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      key: 'disabled'
    }));
    setFormattedDisabledDates(formattedDates);
  }, [disabledDates]);

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
  
    const isOverlap = formattedDisabledDates.some(({ startDate: ds, endDate: de }) => {
      const startYear = startDate.getFullYear();
      const startMonth = startDate.getMonth();
      const startDay = startDate.getDate();
    
      const endYear = endDate.getFullYear();
      const endMonth = endDate.getMonth();
      const endDay = endDate.getDate();
    
      const dsYear = ds.getFullYear();
      const dsMonth = ds.getMonth();
      const dsDay = ds.getDate();
    
      const deYear = de.getFullYear();
      const deMonth = de.getMonth();
      const deDay = de.getDate()+1;
    
      return (
        (startYear >= dsYear && startYear <= deYear && startMonth >= dsMonth && startMonth <= deMonth && startDay >= dsDay && startDay <= deDay) ||
        (endYear >= dsYear && endYear <= deYear && endMonth >= dsMonth && endMonth <= deMonth && endDay >= dsDay && endDay <= deDay) ||
        (dsYear >= startYear && dsYear <= endYear && dsMonth >= startMonth && dsMonth <= endMonth && dsDay >= startDay && dsDay <= endDay) ||
        (deYear >= startYear && deYear <= endYear && deMonth >= startMonth && deMonth <= endMonth && deDay >= startDay && deDay <= endDay) ||
        (startYear >= dsYear && endYear <= deYear && startMonth >= dsMonth && endMonth <= deMonth && startDay >= dsDay && endDay <= deDay)
      );
    });
    if (isOverlap) {
      setDisabledMessage('Cette date est déjà réservée.');
    } else {
      setDisabledMessage('');
      onDateRangeSelect(ranges.selection);
    }
  
    if (!isOverlap) {
      setDateRange([ranges.selection]);
      onDateRangeSelect(ranges.selection); 
    }
  };
  
  const renderCell = (dateItem) => {
    // Check if the date is disabled
    const isDisabled = formattedDisabledDates.some(({ startDate, endDate }) => {
      return (
        dateItem.isSame(startDate, 'day') ||
        dateItem.isSame(endDate, 'day') ||
        (dateItem.isAfter(startDate, 'day') && dateItem.isBefore(endDate, 'day'))
      );
    });

    const className = isDisabled ? ' rdrDayDisabled' : '';

    return (
      <div
        className={`rdrDay ${className}`}
      >
        {dateItem.format('D')}
      </div>
    );
  };
  

  return (
    <div>
    <DateRange
      editableDateInputs={true}
      onChange={handleSelect}
      moveRangeOnFirstSelection={false}
      ranges={dateRange}
      minDate={today}
      disabledDates={disabledDates}
      renderDay={renderCell}
      
    />
    {disabledMessage}
    </div>
  );
};

export default DoubleDateInput;
