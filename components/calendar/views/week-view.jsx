"use client"

import { useState, useEffect } from "react"
import { isSameDay } from "@/lib/date-utils"
import { motion } from "framer-motion"
import { MapPin, Clock } from "lucide-react"

export default function WeekView({ weekDays, events, onTimeSlotClick, onEventClick, getCategoryColor }) {
  const hours = Array.from({ length: 24 }, (_, i) => i)

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

  // Current time indicator
  const [currentTimePosition, setCurrentTimePosition] = useState(0)

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      setCurrentTimePosition(hours * 60 + minutes)
    }

    updateCurrentTime()
    const interval = setInterval(updateCurrentTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b bg-muted/20">
        <div className="w-16 shrink-0"></div>
        {weekDays.map((day, index) => (
          <div key={index} className="flex-1 text-center py-2">
            <div
              className={`text-sm ${
                day.getDay() === 0 ? "text-secondary" : day.getDay() === 6 ? "text-tertiary" : "text-muted-foreground"
              }`}
            >
              {day.toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div className={`text-base font-medium ${isSameDay(day, new Date()) ? "text-primary" : ""}`}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-1 overflow-y-auto relative">
        <div className="w-16 shrink-0 border-r bg-muted/10">
          {hours.map((hour) => (
            <div key={hour} className="h-[60px] border-b text-xs text-right pr-2 text-muted-foreground">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>
          ))}
        </div>

        <div className="flex flex-1 relative">
          {/* Current time indicator */}
          <div
            className="absolute left-0 right-0 z-10 border-t-2 border-red-500"
            style={{ top: `${currentTimePosition}px` }}
          >
            <div className="absolute -left-1 -top-1.5 h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
          </div>

          {weekDays.map((day, dayIndex) => {
            const dayEvents = getEventsForDay(day)

            return (
              <div key={dayIndex} className="flex-1 relative border-r">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="h-[60px] border-b hover:bg-muted/20 cursor-pointer transition-colors"
                    onClick={() => {
                      const newDate = new Date(day)
                      newDate.setHours(hour, 0, 0, 0)
                      onTimeSlotClick(newDate)
                    }}
                  ></div>
                ))}

                {dayEvents.map((event, eventIndex) => {
                  const style = getEventPosition(event)
                  const bgColor = getCategoryColor(event.categoryId)

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: eventIndex * 0.05 }}
                      className="absolute left-0 right-0 mx-1 p-1 rounded text-xs overflow-hidden shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                      style={{
                        ...style,
                        background: `linear-gradient(135deg, ${bgColor}30, ${bgColor}15)`,
                        borderLeft: `3px solid ${bgColor}`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onEventClick(event)
                      }}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="flex items-center truncate text-[10px] opacity-80">
                        <Clock size={10} className="mr-0.5 shrink-0" />
                        {new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -
                        {new Date(event.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                      {event.location && (
                        <div className="flex items-center truncate text-[10px] opacity-80">
                          <MapPin size={10} className="mr-0.5 shrink-0" />
                          {event.location}
                        </div>
                      )}
                    </motion.div>
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

