"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface DateRangeProps {
  value: [Date | null, Date | null];
  onChange: (dates: [Date | null, Date | null]) => void;
}

const DateRange = ({ value, onChange }: DateRangeProps) => {
  const [startDate, endDate] = value;

  return (
    <div className="flex items-end gap-2 w-full">
      {/* Start date */}
      <div className="flex flex-col w-full">
        <label className="mb-1 text-xs font-medium text-gray-600">Start date</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => {
            const safeEnd = endDate && date && endDate < date ? null : endDate;
            onChange([date, safeEnd]);
          }}
          maxDate={endDate ?? new Date()}
          dateFormat="dd-MM-yyyy"
          className="rounded-sm border border-gray-300 bg-white px-2 py-1.5 text-sm focus:border-primary w-full focus:outline-none"
          placeholderText="Start date"
          showPopperArrow={false}
        />
      </div>

      <span className="mb-2 text-gray-500">—</span>

      {/* End date */}
      <div className="flex flex-col w-full">
        <label className="mb-1 text-xs font-medium text-gray-600">End date</label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => onChange([startDate, date])}
          minDate={startDate ?? undefined}
          maxDate={new Date()}
          dateFormat="dd-MM-yyyy"
          popperPlacement="bottom-end"
          className="right-2 rounded-sm border border-gray-300 bg-white px-2 py-1.5 text-sm focus:border-primary w-full focus:outline-none"
          placeholderText="End date"
          showPopperArrow={false}
        />
      </div>
    </div>
  );
};

export default DateRange;
