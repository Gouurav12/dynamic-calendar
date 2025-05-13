"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Clock, MapPin, AlignLeft, Repeat, Bell, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function EventModal({ isOpen, onClose, onSave, onDelete, event, selectedDate, categories }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    start: "",
    end: "",
    allDay: false,
    categoryId: categories[0]?.id || "",
    recurrence: "none", // none, daily, weekly, monthly, yearly
    reminder: "none", // none, 5min, 15min, 30min, 1hour, 1day
  })

  useEffect(() => {
    if (event) {
      // Edit mode - populate form with event data
      setFormData({
        title: event.title || "",
        description: event.description || "",
        location: event.location || "",
        start: formatDateTimeForInput(new Date(event.start)),
        end: formatDateTimeForInput(new Date(event.end)),
        allDay: event.allDay || false,
        categoryId: event.categoryId || categories[0]?.id || "",
        recurrence: event.recurrence || "none",
        reminder: event.reminder || "none",
      })
    } else if (selectedDate) {
      // New event mode - set default times
      const startDate = new Date(selectedDate)
      const endDate = new Date(selectedDate)
      endDate.setHours(endDate.getHours() + 1)

      setFormData((prevData) => ({
        ...prevData,
        start: formatDateTimeForInput(startDate),
        end: formatDateTimeForInput(endDate),
        categoryId: categories[0]?.id || "",
      }))
    }
  }, [event, selectedDate, categories])

  const formatDateTimeForInput = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")

    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Convert form data to event object
    const eventData = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      start: new Date(formData.start).toISOString(),
      end: new Date(formData.end).toISOString(),
      allDay: formData.allDay,
      categoryId: formData.categoryId,
      recurrence: formData.recurrence,
      reminder: formData.reminder,
    }

    onSave(eventData)
  }

  const handleDelete = () => {
    if (event && confirm("Are you sure you want to delete this event?")) {
      onDelete(event.id)
    }
  }

  // Get category color
  const getCategoryColor = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.color : "#8b5cf6"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="gradient-primary p-4 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center">
              <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
              {event ? "Edit Event" : "New Event"}
            </h2>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-white/20 transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pl-9 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <div className="relative">
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pl-9 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                  required
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full"
                  style={{ backgroundColor: getCategoryColor(formData.categoryId) }}
                ></div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="allDay"
                name="allDay"
                checked={formData.allDay}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-muted-foreground rounded"
              />
              <label htmlFor="allDay" className="ml-2 block text-sm">
                All day
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start</label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    name="start"
                    value={formData.start}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pl-9 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">End</label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    name="end"
                    value={formData.end}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pl-9 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pl-9 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 pl-9 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
                <AlignLeft size={16} className="absolute left-3 top-3 text-quaternary" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Recurrence</label>
              <div className="relative">
                <select
                  name="recurrence"
                  value={formData.recurrence}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pl-9 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                >
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <Repeat size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-quinary" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Reminder</label>
              <div className="relative">
                <select
                  name="reminder"
                  value={formData.reminder}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pl-9 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                >
                  <option value="none">None</option>
                  <option value="5min">5 minutes before</option>
                  <option value="15min">15 minutes before</option>
                  <option value="30min">30 minutes before</option>
                  <option value="1hour">1 hour before</option>
                  <option value="1day">1 day before</option>
                </select>
                <Bell size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            {event && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-destructive transition-colors"
              >
                Delete
              </button>
            )}

            <div className="flex space-x-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

