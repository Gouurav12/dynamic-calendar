// Generate sample events for the calendar
export const sampleCategories = [
  { id: "1", name: "Work", color: "#8b5cf6" },
  { id: "2", name: "Personal", color: "#ec4899" },
  { id: "3", name: "Family", color: "#f59e0b" },
  { id: "4", name: "Health", color: "#10b981" },
  { id: "5", name: "Travel", color: "#3b82f6" },
  { id: "6", name: "Social", color: "#ef4444" },
]

// Helper function to create a date with specific year, month, day, hour, minute
const createDate = (year, month, day, hour = 0, minute = 0) => {
  return new Date(year, month - 1, day, hour, minute).toISOString()
}

// Get current date info
const now = new Date()
const currentYear = now.getFullYear()
const currentMonth = now.getMonth() + 1
const currentDay = now.getDate()

// Generate sample events
export const sampleEvents = [
  // Work events
  {
    id: "1",
    title: "Team Meeting",
    description: "Weekly team sync to discuss project progress and blockers",
    location: "Conference Room A",
    start: createDate(currentYear, currentMonth, currentDay, 10, 0),
    end: createDate(currentYear, currentMonth, currentDay, 11, 0),
    allDay: false,
    categoryId: "1",
    recurrence: "weekly",
    reminder: "15min",
  },
  {
    id: "2",
    title: "Project Deadline",
    description: "Final submission for the Q3 project",
    location: "Office",
    start: createDate(currentYear, currentMonth, currentDay + 3, 17, 0),
    end: createDate(currentYear, currentMonth, currentDay + 3, 18, 0),
    allDay: false,
    categoryId: "1",
    recurrence: "none",
    reminder: "1day",
  },
  {
    id: "3",
    title: "Client Presentation",
    description: "Present the new product features to the client",
    location: "Virtual Meeting",
    start: createDate(currentYear, currentMonth, currentDay + 1, 14, 0),
    end: createDate(currentYear, currentMonth, currentDay + 1, 15, 30),
    allDay: false,
    categoryId: "1",
    recurrence: "none",
    reminder: "30min",
  },

  // Personal events
  {
    id: "4",
    title: "Gym Session",
    description: "Cardio and strength training",
    location: "Fitness Center",
    start: createDate(currentYear, currentMonth, currentDay, 7, 0),
    end: createDate(currentYear, currentMonth, currentDay, 8, 0),
    allDay: false,
    categoryId: "2",
    recurrence: "daily",
    reminder: "5min",
  },
  {
    id: "5",
    title: "Movie Night",
    description: "Watch the new sci-fi movie",
    location: "Cinema City",
    start: createDate(currentYear, currentMonth, currentDay + 2, 19, 0),
    end: createDate(currentYear, currentMonth, currentDay + 2, 21, 30),
    allDay: false,
    categoryId: "2",
    recurrence: "none",
    reminder: "1hour",
  },

  // Family events
  {
    id: "6",
    title: "Family Dinner",
    description: "Monthly family gathering",
    location: "Mom's House",
    start: createDate(currentYear, currentMonth, currentDay + 5, 18, 0),
    end: createDate(currentYear, currentMonth, currentDay + 5, 21, 0),
    allDay: false,
    categoryId: "3",
    recurrence: "monthly",
    reminder: "1day",
  },
  {
    id: "7",
    title: "Son's Soccer Game",
    description: "Championship match",
    location: "Community Field",
    start: createDate(currentYear, currentMonth, currentDay + 4, 15, 0),
    end: createDate(currentYear, currentMonth, currentDay + 4, 17, 0),
    allDay: false,
    categoryId: "3",
    recurrence: "none",
    reminder: "1hour",
  },

  // Health events
  {
    id: "8",
    title: "Doctor Appointment",
    description: "Annual check-up",
    location: "Medical Center",
    start: createDate(currentYear, currentMonth, currentDay + 7, 9, 30),
    end: createDate(currentYear, currentMonth, currentDay + 7, 10, 30),
    allDay: false,
    categoryId: "4",
    recurrence: "none",
    reminder: "1day",
  },
  {
    id: "9",
    title: "Meditation Session",
    description: "Morning mindfulness practice",
    location: "Home",
    start: createDate(currentYear, currentMonth, currentDay, 6, 0),
    end: createDate(currentYear, currentMonth, currentDay, 6, 30),
    allDay: false,
    categoryId: "4",
    recurrence: "daily",
    reminder: "none",
  },

  // Travel events
  {
    id: "10",
    title: "Business Trip",
    description: "Conference in New York",
    location: "New York City",
    start: createDate(currentYear, currentMonth, currentDay + 10, 0, 0),
    end: createDate(currentYear, currentMonth, currentDay + 12, 23, 59),
    allDay: true,
    categoryId: "5",
    recurrence: "none",
    reminder: "1day",
  },
  {
    id: "11",
    title: "Weekend Getaway",
    description: "Relaxing beach vacation",
    location: "Beach Resort",
    start: createDate(currentYear, currentMonth, currentDay + 14, 0, 0),
    end: createDate(currentYear, currentMonth, currentDay + 16, 23, 59),
    allDay: true,
    categoryId: "5",
    recurrence: "none",
    reminder: "1day",
  },

  // Social events
  {
    id: "12",
    title: "Birthday Party",
    description: "Celebrating Alex's 30th birthday",
    location: "Skybar Lounge",
    start: createDate(currentYear, currentMonth, currentDay + 6, 20, 0),
    end: createDate(currentYear, currentMonth, currentDay + 6, 23, 30),
    allDay: false,
    categoryId: "6",
    recurrence: "none",
    reminder: "1hour",
  },
  {
    id: "13",
    title: "Networking Event",
    description: "Industry professionals meetup",
    location: "Downtown Convention Center",
    start: createDate(currentYear, currentMonth, currentDay + 8, 18, 0),
    end: createDate(currentYear, currentMonth, currentDay + 8, 20, 0),
    allDay: false,
    categoryId: "6",
    recurrence: "none",
    reminder: "30min",
  },

  // Past events
  {
    id: "14",
    title: "Product Launch",
    description: "Launch of our new product line",
    location: "Company HQ",
    start: createDate(currentYear, currentMonth, currentDay - 5, 10, 0),
    end: createDate(currentYear, currentMonth, currentDay - 5, 12, 0),
    allDay: false,
    categoryId: "1",
    recurrence: "none",
    reminder: "none",
  },
  {
    id: "15",
    title: "Dentist Appointment",
    description: "Regular cleaning",
    location: "Dental Clinic",
    start: createDate(currentYear, currentMonth, currentDay - 3, 14, 0),
    end: createDate(currentYear, currentMonth, currentDay - 3, 15, 0),
    allDay: false,
    categoryId: "4",
    recurrence: "none",
    reminder: "none",
  },
]

