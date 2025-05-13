"use client"

import { useState, useEffect } from "react"
import { isSameDay } from "@/lib/date-utils"
import { motion } from "framer-motion"
import { MapPin, Clock, RotateCcw } from "lucide-react"

export default function DayView({ currentDate, events, onTimeSlotClick, onEventClick, getCategoryColor }) {
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // Filter events for the current day
  const dayEvents = events.filter((event) => {
    const eventStart = new Date(event.start)
    return isSameDay(eventStart, currentDate)
  })

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
      <div className="flex justify-center border-b py-4 bg-gradient-to-r from-tertiary/10 to-quaternary/10">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            {currentDate.toLocaleDateString("en-US", { weekday: "long" })}
          </div>
          <div className={`text-4xl font-bold ${isSameDay(currentDate, new Date()) ? "text-primary" : ""}`}>
            {currentDate.getDate()}
          </div>
          <div className="text-sm text-muted-foreground">
            {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-y-auto relative">
        <div className="w-20 shrink-0 border-r bg-muted/10">
          {hours.map((hour) => (
            <div key={hour} className="h-[60px] border-b text-xs text-right pr-2 text-muted-foreground">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>
          ))}
        </div>

        <div className="flex-1 relative">
          {/* Current time indicator */}
          {isSameDay(currentDate, new Date()) && (
            <div
              className="absolute left-0 right-0 z-10 border-t-2 border-red-500"
              style={{ top: `${currentTimePosition}px` }}
            >
              <div className="absolute -left-1 -top-1.5 h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
            </div>
          )}

          {hours.map((hour) => (
            <div
              key={hour}
              className="h-[60px] border-b hover:bg-muted/20 cursor-pointer transition-colors"
              onClick={() => {
                const newDate = new Date(currentDate)
                newDate.setHours(hour, 0, 0, 0)
                onTimeSlotClick(newDate)
              }}
            ></div>
          ))}

          {dayEvents.map((event, index) => {
            const style = getEventPosition(event)
            const bgColor = getCategoryColor(event.categoryId)

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="absolute left-0 right-0 mx-4 p-2 rounded overflow-hidden shadow-md cursor-pointer hover:opacity-90 transition-opacity"
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
                <div className="font-medium">{event.title}</div>
                <div className="flex items-center text-xs mt-1 opacity-80">
                  <Clock size={12} className="mr-1" />
                  {new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -
                  {new Date(event.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                {event.location && (
                  <div className="flex items-center text-xs mt-1 opacity-80">
                    <MapPin size={12} className="mr-1" />
                    {event.location}
                  </div>
                )}
                {event.recurrence !== "none" && (
                  <div className="flex items-center text-xs mt-1 opacity-80">
                    <RotateCcw size={12} className="mr-1" />
                    {event.recurrence.charAt(0).toUpperCase() + event.recurrence.slice(1)}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

