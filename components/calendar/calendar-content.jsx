import MonthView from "./views/month-view"
import WeekView from "./views/week-view"
import DayView from "./views/day-view"
import AgendaView from "./views/agenda-view"

export default function CalendarContent({
  view,
  currentDate,
  daysInMonth,
  weekDays,
  events,
  categories,
  onDateClick,
  onEventClick,
}) {
  // Get category color by ID
  const getCategoryColor = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.color : "#8b5cf6" // Default purple
  }

  return (
    <div className="h-full bg-background">
      {view === "month" && (
        <MonthView
          daysInMonth={daysInMonth}
          events={events}
          currentDate={currentDate}
          onDateClick={onDateClick}
          onEventClick={onEventClick}
          getCategoryColor={getCategoryColor}
        />
      )}

      {view === "week" && (
        <WeekView
          weekDays={weekDays}
          events={events}
          onTimeSlotClick={onDateClick}
          onEventClick={onEventClick}
          getCategoryColor={getCategoryColor}
        />
      )}

      {view === "day" && (
        <DayView
          currentDate={currentDate}
          events={events}
          onTimeSlotClick={onDateClick}
          onEventClick={onEventClick}
          getCategoryColor={getCategoryColor}
        />
      )}

      {view === "agenda" && (
        <AgendaView events={events} onEventClick={onEventClick} getCategoryColor={getCategoryColor} />
      )}
    </div>
  )
}

