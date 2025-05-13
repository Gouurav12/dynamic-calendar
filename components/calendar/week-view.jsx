"use client"

import { useState, useEffect } from "react"
import { isSameDay, getWeekDays } from "@/lib/date-utils"

export default function WeekView({ currentDate, events, onTimeSlotClick, onEventClick }) {
  const [weekDays, setWeekDays] = useState([])
  const hours = Array.from({ length: 24 }, (_, i) => i)

  useEffect(() => {
    setWeekDays(getWeekDays(currentDate))
  }, [currentDate])

  // Filter events for a specific day
  const getEventsForDay = (date) => {
    return events.filter((event) => {
      const eventStart = new Date(event.start)
      return isSameDay(eventStart, date)
    })
  }

  // Position event based on time
  const getEventPosition = (event) => {
    const start = new Date(event.start)
    const end = new Date(event.end)

    const startHour = start.getHours() + start.getMinutes() / 60
    const endHour = end.getHours() + end.getMinutes() / 60
    const duration = endHour - startHour

    return {
      top: `${startHour * 60}px`,
      height: `${duration * 60}px`,
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b">
        <div className="w-16 shrink-0"></div>
        {weekDays.map((day, index) => (
          <div key={index} className="flex-1 text-center py-2 font-semibold">
            <div className={isSameDay(day, new Date()) ? "text-blue-600" : ""}>
              {day.toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div
              className={`text-lg ${
                isSameDay(day, new Date())
                  ? "bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto"
                  : ""
              }`}
            >
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-1 overflow-y-auto">
        <div className="w-16 shrink-0 border-r">
          {hours.map((hour) => (
            <div key={hour} className="h-[60px] border-b text-xs text-right pr-2 text-gray-500">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>
          ))}
        </div>

        <div className="flex flex-1">
          {weekDays.map((day, dayIndex) => {
            const dayEvents = getEventsForDay(day)

            return (
              <div key={dayIndex} className="flex-1 relative border-r">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="h-[60px] border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      const newDate = new Date(day)
                      newDate.setHours(hour, 0, 0, 0)
                      onTimeSlotClick(newDate)
                    }}
                  ></div>
                ))}

                {dayEvents.map((event) => {
                  const style = getEventPosition(event)

                  return (
                    <div
                      key={event.id}
                      className="absolute left-0 right-0 mx-1 p-1 bg-blue-100 text-blue-800 border border-blue-300 rounded text-xs overflow-hidden"
                      style={style}
                      onClick={(e) => {
                        e.stopPropagation()
                        onEventClick(event)
                      }}
                    >
                      <div className="font-semibold truncate">{event.title}</div>
                      <div className="truncate text-[10px]">
                        {new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -
                        {new Date(event.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

