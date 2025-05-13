"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, AlertCircle, RotateCcw, Bell, Sparkles } from "lucide-react"

export default function AgendaView({ events, onEventClick, getCategoryColor }) {
  const [filter, setFilter] = useState("upcoming") // upcoming, past, all

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.start) - new Date(b.start)
  })

  // Filter events based on current filter
  const filteredEvents = sortedEvents.filter((event) => {
    const eventDate = new Date(event.start)
    const now = new Date()

    if (filter === "upcoming") {
      return eventDate >= now
    } else if (filter === "past") {
      return eventDate < now
    }
    return true // 'all'
  })

  // Group events by date
  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const date = new Date(event.start).toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(event)
    return groups
  }, {})

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Check if date is today
  const isToday = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className="h-full overflow-auto p-4">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-secondary animate-pulse-slow" />
          Agenda
        </h2>
        <div className="flex rounded-md border bg-card overflow-hidden">
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-3 py-1.5 text-sm ${
              filter === "upcoming" ? "bg-gradient-to-r from-primary to-secondary text-white" : "hover:bg-muted"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter("past")}
            className={`px-3 py-1.5 text-sm ${
              filter === "past"
                ? "bg-gradient-to-r from-tertiary to-quaternary text-tertiary-foreground"
                : "hover:bg-muted"
            }`}
          >
            Past
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-sm ${
              filter === "all" ? "bg-gradient-to-r from-quaternary to-quinary text-white" : "hover:bg-muted"
            }`}
          >
            All
          </button>
        </div>
      </div>

      {Object.keys(groupedEvents).length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <AlertCircle size={48} className="mb-4 opacity-50" />
          <p className="text-lg">No events found</p>
          <p className="text-sm">Try changing your filter or adding new events</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedEvents).map(([date, events], groupIndex) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
              className="rounded-lg border bg-card overflow-hidden shadow-sm"
            >
              <div
                className={`px-4 py-2 font-medium flex items-center ${
                  isToday(date) ? "bg-gradient-to-r from-primary/20 to-secondary/20" : "bg-muted/30"
                }`}
              >
                <Calendar size={16} className={`mr-2 ${isToday(date) ? "text-primary" : ""}`} />
                {formatDate(date)}
                {isToday(date) && (
                  <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded-full">Today</span>
                )}
              </div>
              <div className="divide-y">
                {events.map((event, eventIndex) => {
                  const bgColor = getCategoryColor(event.categoryId)

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: eventIndex * 0.05 + 0.1 }}
                      className="p-4 hover:bg-muted/20 cursor-pointer transition-colors"
                      onClick={() => onEventClick(event)}
                    >
                      <div className="flex items-start">
                        <div
                          className="w-1.5 self-stretch rounded-full mr-3"
                          style={{ backgroundColor: bgColor }}
                        ></div>
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{event.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock size={14} className="mr-1" />
                            {event.allDay ? (
                              <span>All day</span>
                            ) : (
                              <>
                                {new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -
                                {new Date(event.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </>
                            )}
                          </div>
                          {event.location && (
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <MapPin size={14} className="mr-1" />
                              {event.location}
                            </div>
                          )}
                          {event.recurrence !== "none" && (
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <RotateCcw size={14} className="mr-1" />
                              {event.recurrence.charAt(0).toUpperCase() + event.recurrence.slice(1)}
                            </div>
                          )}
                          {event.reminder !== "none" && (
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Bell size={14} className="mr-1" />
                              Reminder: {event.reminder}
                            </div>
                          )}
                          {event.description && (
                            <p className="text-sm mt-2 text-muted-foreground line-clamp-2 bg-muted/20 p-2 rounded-md">
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

