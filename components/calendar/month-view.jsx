"use client"

import { isToday, isSameDay, isSameMonth } from "@/lib/date-utils"

export default function MonthView({ daysInMonth, events, currentDate, onDateClick, onEventClick }) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Filter events for a specific day
  const getEventsForDay = (date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.start)
      return isSameDay(eventStart, date)
    })
  }

  return (
    <div className="h-full">
      <div className="grid grid-cols-7 border-b">
        {weekdays.map((day, index) => (
          <div
            key={day}
            className={`py-2 text-center font-semibold ${
              index === 0 || index === 6 ? "text-red-500" : "text-blue-500"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 h-[calc(100%-40px)]">
        {daysInMonth.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentDate)
          const dayEvents = getEventsForDay(day)

          return (
            <div
              key={index}
              className={`border-b border-r p-1 ${isCurrentMonth ? "bg-white" : "bg-gray-50"}`}
              onClick={() => onDateClick(day)}
            >
              <div
                className={`text-right p-1 ${
                  isToday(day)
                    ? "bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center ml-auto"
                    : day.getDay() === 0 || day.getDay() === 6
                      ? "text-red-500"
                      : ""
                }`}
              >
                {day.getDate()}
              </div>

              <div className="mt-1 max-h-[80px] overflow-y-auto">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1 mb-1 rounded bg-blue-100 text-blue-800 truncate cursor-pointer hover:bg-blue-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventClick(event)
                    }}
                  >
                    {new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                    {event.title}
                  </div>
                ))}

                {dayEvents.length > 3 && <div className="text-xs text-gray-500 pl-1">+{dayEvents.length - 3} more</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

