"use client"

import { isSameDay, isSameMonth } from "@/lib/date-utils"
import { motion } from "framer-motion"

export default function MonthView({ daysInMonth, events, currentDate, onDateClick, onEventClick, getCategoryColor }) {
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
      <div className="grid grid-cols-7 border-b bg-muted/20">
        {weekdays.map((day, index) => (
          <div
            key={day}
            className={`py-2 text-center text-sm font-medium ${
              index === 0 ? "text-secondary" : index === 6 ? "text-tertiary" : "text-primary"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 h-[calc(100%-32px)]">
        {daysInMonth.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentDate)
          const dayEvents = getEventsForDay(day)
          const isToday = isSameDay(day, new Date())

          return (
            <div
              key={index}
              className={`border-b border-r p-1 transition-colors ${
                isCurrentMonth ? "bg-background" : "bg-muted/20"
              } hover:bg-muted/30`}
              onClick={() => onDateClick(day)}
            >
              <div className="flex justify-end">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                    isToday
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : day.getDay() === 0
                        ? "text-secondary"
                        : day.getDay() === 6
                          ? "text-tertiary"
                          : ""
                  }`}
                >
                  {day.getDate()}
                </div>
              </div>

              <div className="mt-1 max-h-[80px] overflow-y-auto space-y-1">
                {dayEvents.slice(0, 3).map((event, eventIndex) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: eventIndex * 0.05 }}
                    className="text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 shadow-sm"
                    style={{
                      background: `linear-gradient(to right, ${getCategoryColor(event.categoryId)}20, ${getCategoryColor(event.categoryId)}10)`,
                      borderLeft: `3px solid ${getCategoryColor(event.categoryId)}`,
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      onEventClick(event)
                    }}
                  >
                    {event.allDay ? (
                      <span className="font-medium">{event.title}</span>
                    ) : (
                      <>
                        <span className="inline-block w-9 text-muted-foreground">
                          {new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span className="font-medium">{event.title}</span>
                      </>
                    )}
                  </motion.div>
                ))}

                {dayEvents.length > 3 && (
                  <div className="text-xs text-secondary font-medium pl-1">+{dayEvents.length - 3} more</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

