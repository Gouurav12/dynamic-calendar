"use client"

import { useState } from "react"

const Calendar = () => {
  // Sample state for demonstration
  const [currentMonth, setCurrentMonth] = useState(0) // January

  // Function to render a calendar for a specific month
  const renderCalendar = (monthOffset = 0, monthName = "January", year = "2023") => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <button className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-md text-gray-400">
            &lt;
          </button>
          <h2 className="text-2xl font-medium text-blue-500">
            {monthName} {year}
          </h2>
          <button className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-md text-gray-400">
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          <div className="h-10 w-10 flex items-center justify-center bg-red-500 text-white font-bold rounded-md">S</div>
          <div className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-md">
            M
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-md">
            T
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-md">
            W
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-md">
            T
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-md">
            F
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white font-bold rounded-md">
            S
          </div>

          {/* First row */}
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-red-500 font-medium">
            1
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            2
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white font-medium rounded-md">
            3
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            4
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            5
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            6
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            7
          </div>

          {/* Second row */}
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-red-500 font-medium">
            8
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            9
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            10
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            11
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            12
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            13
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            14
          </div>

          {/* Third row */}
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-red-500 font-medium">
            15
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            16
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            17
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            18
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            19
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            20
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            21
          </div>

          {/* Fourth row */}
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-red-500 font-medium">
            22
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            23
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            24
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            25
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            26
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            27
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            28
          </div>

          {/* Fifth row */}
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-red-500 font-medium">
            29
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            30
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white shadow-sm rounded-md text-gray-700">
            31
          </div>
          <div className="col-span-4"></div>
        </div>
      </div>
    )
  }

  // Function to render a mini calendar (for August and September)
  const renderMiniCalendar = (monthName = "August", year = "2023", isHighlighted = true) => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 max-w-xs">
        <div className="flex items-center justify-between mb-4">
          <button className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-md text-gray-400">
            &lt;
          </button>
          <h2 className="text-xl font-medium text-blue-500">
            {monthName} {year}
          </h2>
          <button className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-md text-gray-400">
            &gt;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          <div className="h-8 w-8 flex items-center justify-center bg-red-500 text-white font-bold rounded-md text-sm">
            S
          </div>
          <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white font-bold rounded-md text-sm">
            M
          </div>
          <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white font-bold rounded-md text-sm">
            T
          </div>
          <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white font-bold rounded-md text-sm">
            W
          </div>
          <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white font-bold rounded-md text-sm">
            T
          </div>
          <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white font-bold rounded-md text-sm">
            F
          </div>
          <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white font-bold rounded-md text-sm">
            S
          </div>

          {/* First row - just showing a few days as example */}
          <div className="h-8 w-8 flex items-center justify-center bg-white shadow-sm rounded-md text-sm">1</div>
          <div className="h-8 w-8 flex items-center justify-center bg-white shadow-sm rounded-md text-sm">2</div>
          {isHighlighted ? (
            <div className="h-8 w-8 flex items-center justify-center bg-blue-500 text-white font-medium rounded-md text-sm">
              3
            </div>
          ) : (
            <div className="h-8 w-8 flex items-center justify-center bg-white shadow-sm rounded-md text-sm">3</div>
          )}
          <div className="h-8 w-8 flex items-center justify-center bg-white shadow-sm rounded-md text-sm">4</div>
          <div className="h-8 w-8 flex items-center justify-center bg-white shadow-sm rounded-md text-sm">5</div>
          <div className="col-span-2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-12">
        <span className="text-gray-500 font-serif italic">Dynamic</span>
        <span className="text-blue-500 font-serif italic"> Calendar</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Main January calendar */}
        {renderCalendar(0, "January", "2023")}

        {/* Side navigation buttons */}
        <div className="hidden lg:flex flex-col justify-center items-center gap-8">
          <div className="h-16 w-16 flex items-center justify-center bg-red-500 text-white font-bold rounded-md text-2xl">
            S
          </div>
          <div className="h-16 w-16 flex items-center justify-center bg-blue-500 text-white font-bold rounded-md text-2xl">
            M
          </div>
          <div className="h-16 w-16 flex items-center justify-center bg-white shadow-md rounded-md text-gray-400 text-2xl">
            &gt;
          </div>
          <div className="h-16 w-16 flex items-center justify-center bg-white shadow-md rounded-md text-gray-400 text-2xl">
            &lt;
          </div>
        </div>

        {/* Bottom row calendars */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderMiniCalendar("August", "2023", true)}
          {renderMiniCalendar("September", "2023", false)}
        </div>
      </div>
    </div>
  )
}

export default Calendar

