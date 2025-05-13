"use client"

import { useState, useEffect } from "react"
import CalendarSidebar from "./calendar-sidebar"
import CalendarHeader from "./calendar-header"
import CalendarContent from "./calendar-content"
import EventModal from "./event-modal"
import WelcomeOverlay from "./welcome-overlay"
import { useLocalStorage } from "@/lib/use-local-storage"
import { generateDaysForMonth, getToday, getWeekDays } from "@/lib/date-utils"
import { useMediaQuery } from "@/lib/use-media-query"
import { MoveRight, Sparkles } from "lucide-react"
import { sampleEvents, sampleCategories } from "@/lib/sample-data"

export default function CalendarApp() {
  // First visit detection
  const [isFirstVisit, setIsFirstVisit] = useLocalStorage("calendar-first-visit", true)

  // State for current date and view
  const [currentDate, setCurrentDate] = useState(getToday())
  const [view, setView] = useState("month") // 'month', 'week', 'day', 'agenda'

  // State for sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  // State for events
  const [events, setEvents] = useLocalStorage("calendar-events", sampleEvents)
  const [filteredEvents, setFilteredEvents] = useState([])
  const [categories, setCategories] = useLocalStorage("calendar-categories", sampleCategories)

  // State for category filters
  const [categoryFilters, setCategoryFilters] = useState(categories.map((cat) => cat.id))

  // State for search
  const [searchQuery, setSearchQuery] = useState("")

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  // Generate days for the current month
  const [daysInMonth, setDaysInMonth] = useState([])
  const [weekDays, setWeekDays] = useState([])

  // Confetti effect
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setDaysInMonth(generateDaysForMonth(currentDate.getFullYear(), currentDate.getMonth()))
    setWeekDays(getWeekDays(currentDate))
  }, [currentDate])

  // Filter events based on category filters and search query
  useEffect(() => {
    let filtered = events

    // Filter by categories
    if (categoryFilters.length > 0) {
      filtered = filtered.filter((event) => categoryFilters.includes(event.categoryId))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          (event.description && event.description.toLowerCase().includes(query)) ||
          (event.location && event.location.toLowerCase().includes(query)),
      )
    }

    setFilteredEvents(filtered)
  }, [events, categoryFilters, searchQuery])

  // Handle sidebar visibility based on screen size
  useEffect(() => {
    setSidebarOpen(isDesktop)
  }, [isDesktop])

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

      // Show confetti for new events
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
    closeModal()
  }

  const deleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId))
    closeModal()
  }

  // Category handling functions
  const addCategory = (category) => {
    setCategories([...categories, { ...category, id: Date.now().toString() }])
  }

  const updateCategory = (updatedCategory) => {
    setCategories(categories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat)))
  }

  const deleteCategory = (categoryId) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId))
  }

  const toggleCategoryFilter = (categoryId) => {
    setCategoryFilters((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  // Close welcome overlay
  const closeWelcomeOverlay = () => {
    setIsFirstVisit(false)
  }

  // Generate confetti elements
  const renderConfetti = () => {
    if (!showConfetti) return null

    const confettiElements = []
    const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"]

    for (let i = 0; i < 50; i++) {
      const left = `${Math.random() * 100}%`
      const animationDuration = `${Math.random() * 3 + 2}s`
      const animationDelay = `${Math.random() * 0.5}s`
      const color = colors[Math.floor(Math.random() * colors.length)]

      confettiElements.push(
        <div
          key={i}
          className="confetti"
          style={{
            left,
            backgroundColor: color,
            animationDuration,
            animationDelay,
          }}
        />,
      )
    }

    return confettiElements
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Confetti effect */}
      {renderConfetti()}

      {/* Welcome overlay for first-time users */}
      {isFirstVisit && <WelcomeOverlay onClose={closeWelcomeOverlay} />}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <CalendarSidebar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          categories={categories}
          categoryFilters={categoryFilters}
          toggleCategoryFilter={toggleCategoryFilter}
          addCategory={addCategory}
          updateCategory={updateCategory}
          deleteCategory={deleteCategory}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          setView={setView}
          goToToday={goToToday}
          goToPrevious={goToPrevious}
          goToNext={goToNext}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 overflow-auto">
          <CalendarContent
            view={view}
            currentDate={currentDate}
            daysInMonth={daysInMonth}
            weekDays={weekDays}
            events={filteredEvents}
            categories={categories}
            onDateClick={openNewEventModal}
            onEventClick={openEditEventModal}
          />
        </div>
      </div>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && !isDesktop && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Event Modal */}
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={saveEvent}
          onDelete={deleteEvent}
          event={selectedEvent}
          selectedDate={selectedDate}
          categories={categories}
        />
      )}

      {/* Mobile sidebar toggle button */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-4 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg lg:hidden"
        >
          <MoveRight size={20} />
        </button>
      )}

      {/* Quick add event button */}
      <button
        onClick={() => openNewEventModal(new Date())}
        className="fixed bottom-4 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-primary text-white shadow-lg hover:opacity-90 transition-opacity"
      >
        <Sparkles size={24} className="animate-pulse-slow" />
      </button>
    </div>
  )
}

