// Get today's date with time set to 00:00:00
export function getToday() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

// Check if two dates are the same day
export function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

// Check if a date is today
export function isToday(date) {
  return isSameDay(date, new Date())
}

// Check if two dates are in the same month
export function isSameMonth(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
}

// Generate an array of days for a month view
export function generateDaysForMonth(year, month) {
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  // Get the day of the week for the first day (0-6, where 0 is Sunday)
  const firstDayOfWeek = firstDayOfMonth.getDay()

  // Calculate days from previous month to show
  const daysFromPrevMonth = firstDayOfWeek

  // Calculate total days to show (42 for a 6-week calendar)
  const totalDays = 42

  const days = []

  // Add days from previous month
  const prevMonth = new Date(year, month, 0)
  const prevMonthDays = prevMonth.getDate()

  for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
    days.push(new Date(year, month - 1, i))
  }

  // Add days from current month
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push(new Date(year, month, i))
  }

  // Add days from next month
  const remainingDays = totalDays - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new Date(year, month + 1, i))
  }

  return days
}

// Get array of days for a week view
export function getWeekDays(date) {
  const day = date.getDay() // 0-6, where 0 is Sunday
  const diff = date.getDate() - day

  const weekStart = new Date(date)
  weekStart.setDate(diff)

  const days = []
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(weekStart)
    newDate.setDate(weekStart.getDate() + i)
    days.push(newDate)
  }

  return days
}

// Format date to string
export function formatDate(date, format = "short") {
  if (format === "short") {
    return date.toLocaleDateString()
  } else if (format === "long") {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
}

// Format time to string
export function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

