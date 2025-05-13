"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  CalendarIcon,
  Menu,
  Search,
  X,
  Grid,
  Columns,
  LayoutList,
  Clock,
  Sparkles,
} from "lucide-react"
import { motion } from "framer-motion"

export default function CalendarHeader({
  currentDate,
  view,
  setView,
  goToToday,
  goToPrevious,
  goToNext,
  searchQuery,
  setSearchQuery,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [showSearch, setShowSearch] = useState(false)

  const formatDate = () => {
    const options = { month: "long", year: "numeric" }
    if (view === "day") {
      options.day = "numeric"
    } else if (view === "week") {
      // For week view, show the range
      const startOfWeek = new Date(currentDate)
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      const startMonth = startOfWeek.toLocaleString("default", { month: "short" })
      const endMonth = endOfWeek.toLocaleString("default", { month: "short" })
      const startDay = startOfWeek.getDate()
      const endDay = endOfWeek.getDate()
      const year = currentDate.getFullYear()

      if (startMonth === endMonth) {
        return `${startMonth} ${startDay}-${endDay}, ${year}`
      } else {
        return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
      }
    }

    return currentDate.toLocaleString("default", options)
  }

  const getViewIcon = () => {
    switch (view) {
      case "month":
        return <Grid size={18} className="text-primary" />
      case "week":
        return <Columns size={18} className="text-secondary" />
      case "day":
        return <Clock size={18} className="text-tertiary" />
      case "agenda":
        return <LayoutList size={18} className="text-quaternary" />
      default:
        return <Grid size={18} />
    }
  }

  return (
    <header className="border-b bg-card p-4">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 rounded-md p-2 hover:bg-muted lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <h1 className="flex items-center text-xl font-bold">
            <CalendarIcon className="mr-2 text-primary" />
            <span className="hidden sm:inline">Chronos Calendar</span>
            <Sparkles className="ml-2 h-4 w-4 text-secondary animate-pulse" />
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          {showSearch ? (
            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 200, opacity: 1 }} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className="w-full rounded-md border bg-background px-3 py-1.5 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <button
                onClick={() => {
                  setSearchQuery("")
                  setShowSearch(false)
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            </motion.div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="rounded-md p-1.5 hover:bg-muted tooltip"
              aria-label="Search"
            >
              <Search size={18} />
              <span className="tooltip-text">Search Events</span>
            </button>
          )}

          <button
            onClick={goToToday}
            className="rounded-md bg-gradient-to-r from-primary to-secondary px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            Today
          </button>

          <div className="flex items-center rounded-md border bg-card">
            <button onClick={goToPrevious} className="p-1.5 hover:bg-muted" aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <span className="px-2 text-sm font-medium">{formatDate()}</span>
            <button onClick={goToNext} className="p-1.5 hover:bg-muted" aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="hidden rounded-md border bg-card sm:flex">
            <button
              onClick={() => setView("month")}
              className={`flex items-center px-3 py-1.5 text-sm ${
                view === "month" ? "bg-gradient-to-r from-primary to-primary/70 text-white" : "hover:bg-muted"
              }`}
              title="Month view"
            >
              <Grid size={16} className="mr-1" />
              <span className="hidden md:inline">Month</span>
            </button>
            <button
              onClick={() => setView("week")}
              className={`flex items-center px-3 py-1.5 text-sm ${
                view === "week" ? "bg-gradient-to-r from-secondary to-secondary/70 text-white" : "hover:bg-muted"
              }`}
              title="Week view"
            >
              <Columns size={16} className="mr-1" />
              <span className="hidden md:inline">Week</span>
            </button>
            <button
              onClick={() => setView("day")}
              className={`flex items-center px-3 py-1.5 text-sm ${
                view === "day"
                  ? "bg-gradient-to-r from-tertiary to-tertiary/70 text-tertiary-foreground"
                  : "hover:bg-muted"
              }`}
              title="Day view"
            >
              <Clock size={16} className="mr-1" />
              <span className="hidden md:inline">Day</span>
            </button>
            <button
              onClick={() => setView("agenda")}
              className={`flex items-center px-3 py-1.5 text-sm ${
                view === "agenda" ? "bg-gradient-to-r from-quaternary to-quaternary/70 text-white" : "hover:bg-muted"
              }`}
              title="Agenda view"
            >
              <LayoutList size={16} className="mr-1" />
              <span className="hidden md:inline">Agenda</span>
            </button>
          </div>

          {/* Mobile view selector */}
          <div className="relative sm:hidden">
            <button className="flex items-center rounded-md border bg-card px-3 py-1.5 text-sm">
              {getViewIcon()}
              <ChevronLeft size={16} className="ml-1 rotate-270" />
            </button>
            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="absolute inset-0 w-full opacity-0"
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
              <option value="agenda">Agenda</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}

