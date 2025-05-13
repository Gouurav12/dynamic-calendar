"use client"

import { useState, useEffect } from "react"
import CalendarHeader from "./calendar-header"
import MonthView from "./month-view"
import WeekView from "./week-view"
import DayView from "./day-view"
import EventModal from "./event-modal"
import { useLocalStorage } from "@/lib/use-local-storage"
import { generateDaysForMonth, getToday } from "@/lib/date-utils"

export default function Calendar() {
  // State for current date and view
  const [currentDate, setCurrentDate] = useState(getToday())
  const [view, setView] = useState("month") // 'month', 'week', 'day'

  // State for events
  const [events, setEvents] = useLocalStorage("calendar-events", [])

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  // Generate days for the current month
  const [daysInMonth, setDaysInMonth] = useState([])

  useEffect(() => {
    setDaysInMonth(generateDaysForMonth(currentDate.getFullYear(), currentDate.getMonth()))
  }, [currentDate])

  // Navigation functions
  const goToToday = () => {
    setCurrentDate(getToday())
  }

  const goToPrevious = () => {
    const newDate = new Date(currentDate)
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else if (view === "day") {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
  }

  const goToNext = () => {
    const newDate = new Date(currentDate)
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else if (view === "day") {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  // Event handling functions
  const openNewEventModal = (date) => {
    setSelectedEvent(null)
    setSelectedDate(date)
    setIsModalOpen(true)
  }

  const openEditEventModal = (event) => {
    setSelectedEvent(event)
    setSelectedDate(new Date(event.start))
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
    setSelectedDate(null)
  }

  const saveEvent = (eventData) => {
    if (selectedEvent) {
      // Edit existing event
      const updatedEvents = events.map((event) => (event.id === selectedEvent.id ? { ...event, ...eventData } : event))
      setEvents(updatedEvents)
    } else {
      // Add new event
      const newEvent = {
        id: Date.now().toString(),
        ...eventData,
      }
      setEvents([...events, newEvent])
    }
    closeModal()
  }

  const deleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId))
    closeModal()
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden">
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        setView={setView}
        goToToday={goToToday}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />

      <div className="flex-1 overflow-auto">
        {view === "month" && (
          <MonthView
            daysInMonth={daysInMonth}
            events={events}
            currentDate={currentDate}
            onDateClick={openNewEventModal}
            onEventClick={openEditEventModal}
          />
        )}

        {view === "week" && (
          <WeekView
            currentDate={currentDate}
            events={events}
            onTimeSlotClick={openNewEventModal}
            onEventClick={openEditEventModal}
          />
        )}

        {view === "day" && (
          <DayView
            currentDate={currentDate}
            events={events}
            onTimeSlotClick={openNewEventModal}
            onEventClick={openEditEventModal}
          />
        )}
      </div>

      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={saveEvent}
          onDelete={deleteEvent}
          event={selectedEvent}
          selectedDate={selectedDate}
        />
      )}
    </div>
  )
}

