"use client"

import { useState } from "react"
import { X, Plus, Trash2, Edit, Check, Sparkles, Palette, Star } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { useTheme } from "@/components/theme-provider"


import { motion } from "framer-motion"

export default function CalendarSidebar({
  currentDate,
  setCurrentDate,
  categories,
  categoryFilters,
  toggleCategoryFilter,
  addCategory,
  updateCategory,
  deleteCategory,
  onClose,
}) {
  const { theme, setTheme } = useTheme()
  const [newCategory, setNewCategory] = useState({ name: "", color: "#8b5cf6" })
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [editingCategoryId, setEditingCategoryId] = useState(null)
  const [editingCategory, setEditingCategory] = useState({ name: "", color: "" })

  const handleDaySelect = (day) => {
    setCurrentDate(day)
  }

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      addCategory(newCategory)
      setNewCategory({ name: "", color: "#8b5cf6" })
      setIsAddingCategory(false)
    }
  }

  const handleEditCategory = (category) => {
    setEditingCategoryId(category.id)
    setEditingCategory({ name: category.name, color: category.color })
  }

  const handleUpdateCategory = () => {
    if (editingCategory.name.trim()) {
      updateCategory({ id: editingCategoryId, ...editingCategory })
      setEditingCategoryId(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingCategoryId(null)
  }

  return (
    <div className="flex h-full flex-col border-r bg-card text-card-foreground">
      <div className="gradient-primary p-4 text-white">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center text-xl font-bold">
            <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
            Chronos
          </h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-white/20 lg:hidden">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Mini Calendar */}
        <div className="rounded-lg bg-background p-2 shadow-sm">
          <DayPicker
            mode="single"
            selected={currentDate}
            onSelect={handleDaySelect}
            className="mx-auto"
            classNames={{
              day_selected: "bg-primary text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
            }}
          />
        </div>

        {/* Categories */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center font-medium">
              <Palette className="mr-2 h-4 w-4 text-secondary" />
              Categories
            </h3>
            <button onClick={() => setIsAddingCategory(!isAddingCategory)} className="rounded-full p-1 hover:bg-muted">
              {isAddingCategory ? <X size={16} /> : <Plus size={16} />}
            </button>
          </div>

          {/* Add Category Form */}
          {isAddingCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 rounded-md border bg-card p-3 shadow-sm"
            >
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Category name"
                className="mb-2 w-full rounded-md border bg-background px-3 py-1.5 text-sm"
              />
              <div className="flex items-center justify-between">
                <input
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="h-8 w-8 cursor-pointer rounded-md border"
                />
                <button
                  onClick={handleAddCategory}
                  className="rounded-md bg-gradient-to-r from-primary to-secondary px-3 py-1.5 text-xs text-white"
                >
                  Add
                </button>
              </div>
            </motion.div>
          )}

          {/* Category List */}
          <div className="space-y-2">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-md border bg-card p-2 shadow-sm"
              >
                {editingCategoryId === category.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      className="mb-2 w-full rounded-md border bg-background px-2 py-1 text-sm"
                    />
                    <div className="flex items-center justify-between">
                      <input
                        type="color"
                        value={editingCategory.color}
                        onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
                        className="h-6 w-6 cursor-pointer rounded-md border"
                      />
                      <div className="flex space-x-1">
                        <button onClick={handleCancelEdit} className="rounded-md bg-muted px-2 py-1 text-xs">
                          <X size={12} />
                        </button>
                        <button
                          onClick={handleUpdateCategory}
                          className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground"
                        >
                          <Check size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={categoryFilters.includes(category.id)}
                        onChange={() => toggleCategoryFilter(category.id)}
                        className="mr-2 h-4 w-4 rounded border-gray-300"
                      />
                      <div className="mr-2 h-4 w-4 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="text-sm">{category.name}</span>
                    </div>
                    <div className="flex space-x-1">
                      <button onClick={() => handleEditCategory(category)} className="rounded-full p-1 hover:bg-muted">
                        <Edit size={12} />
                      </button>
                      <button onClick={() => deleteCategory(category.id)} className="rounded-full p-1 hover:bg-muted">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="rounded-lg bg-gradient-to-r from-tertiary/20 to-quaternary/20 p-3 shadow-sm">
          <h3 className="flex items-center font-medium mb-2">
            <Star className="mr-2 h-4 w-4 text-tertiary" />
            Quick Tips
          </h3>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-1.5 text-tertiary">•</span>
              <span>Click any date to add a new event</span>
            </li>
            <li className="flex items-start">
              <span className="mr-1.5 text-tertiary">•</span>
              <span>Drag events to reschedule (coming soon)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-1.5 text-tertiary">•</span>
              <span>Use search to quickly find events</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Theme</span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="rounded-md border bg-background px-2 py-1 text-sm"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </div>
    </div>
  )
}

