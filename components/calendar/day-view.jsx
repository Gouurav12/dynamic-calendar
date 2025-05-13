"use client"
import { isSameDay } from "@/lib/date-utils"

export default function DayView({ currentDate, events, onTimeSlotClick, onEventClick }) {
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b py-4 justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold">{currentDate.toLocaleDateString("en-US", { weekday: "long" })}</div>
          <div className={`text-3xl font-bold ${isSameDay(currentDate, new Date()) ? "text-blue-600" : ""}`}>
            {currentDate.getDate()}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-y-auto">
        <div className="w-16 shrink-0 border-r">
          {hours.map((hour) => (
            <div key={hour} className="h-[60px] border-b text-xs text-right pr-2 text-gray-500">
              {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
            </div>
          ))}
        </div>

        <div className="flex-1 relative">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-[60px] border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                const newDate = new Date(currentDate)
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
                className="absolute left-0 right-0 mx-4 p-2 bg-blue-100 text-blue-800 border border-blue-300 rounded overflow-hidden"
                style={style}
                onClick={(e) => {
                  e.stopPropagation()
                  onEventClick(event)
                }}
              >
                <div className="font-semibold">{event.title}</div>
                <div className="text-xs">
                  {new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -
                  {new Date(event.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                {event.location && <div className="text-xs mt-1 text-gray-600">📍 {event.location}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

