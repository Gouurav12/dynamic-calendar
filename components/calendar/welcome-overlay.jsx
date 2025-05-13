"use client"

import { motion } from "framer-motion"
import { Calendar, CheckCircle, Clock, Tag, Search, X } from "lucide-react"

export default function WelcomeOverlay({ onClose }) {
  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Multiple Views",
      description: "Switch between month, week, day, and agenda views to see your schedule how you want.",
    },
    {
      icon: <Tag className="h-8 w-8 text-secondary" />,
      title: "Color Categories",
      description: "Organize events with colorful categories to keep your schedule visually organized.",
    },
    {
      icon: <Clock className="h-8 w-8 text-tertiary" />,
      title: "Recurring Events",
      description: "Set up events that repeat daily, weekly, monthly, or yearly with just a few clicks.",
    },
    {
      icon: <Search className="h-8 w-8 text-quaternary" />,
      title: "Powerful Search",
      description: "Quickly find events by searching titles, descriptions, or locations.",
    },
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-3xl rounded-xl bg-card shadow-2xl overflow-hidden"
      >
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="rounded-full p-2 bg-background/80 hover:bg-background transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="bg-gradient-to-r from-primary via-secondary to-tertiary p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome to Chronos!</h1>
          <p className="opacity-90">Your beautiful new calendar experience starts here</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="flex items-start space-x-4 p-4 rounded-lg border bg-background/50"
              >
                <div className="shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="font-medium text-lg mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium flex items-center space-x-2 hover:opacity-90 transition-opacity"
            >
              <CheckCircle size={18} />
              <span>Get Started</span>
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-xs text-muted-foreground mt-4"
          >
            We've added sample events to help you explore all features
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

