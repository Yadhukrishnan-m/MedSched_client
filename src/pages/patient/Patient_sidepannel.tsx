"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Plus,
  AlertCircle,
  History,
  User,
  Settings,
  FileText,
  Phone,
  MessageSquare,
  Clock,
  BarChart3,
  Home,
  Menu,
  X,
  Bell,
  Activity,
} from "lucide-react"

interface CollapsibleSidebarProps {
  className?: string
}

export default function CollapsibleSidebar({ className }: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")

  const navigationItems = [
    { icon: Home, label: "Dashboard" },
    { icon: Calendar, label: "Calendar" },
    { icon: History, label: "History" },
    { icon: BarChart3, label: "Reports" },
    { icon: User, label: "Profile" },
    { icon: FileText, label: "Prescriptions" },
    { icon: Phone, label: "Contact Doctor" },
    { icon: MessageSquare, label: "Support" },
    { icon: Settings, label: "Settings" },
  ]

  const quickActions = [
    { icon: Plus, label: "Add Medicine", color: "bg-blue-500 hover:bg-blue-600" },
    { icon: Clock, label: "Set Reminder", color: "bg-green-500 hover:bg-green-600" },
    { icon: AlertCircle, label: "Emergency", color: "bg-red-500 hover:bg-red-600" },
  ]

  return (
    <div
      className={`bg-white border-r border-blue-100 shadow-lg transition-all duration-300 flex flex-col h-screen ${
        isCollapsed ? "w-16" : "w-64"
      } ${className}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-blue-900">MediCare</h2>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-blue-100 text-blue-600"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-blue-100">
        {!isCollapsed && <h3 className="text-sm font-semibold text-blue-800 mb-3">Quick Actions</h3>}
        <div className={`${isCollapsed ? "space-y-2" : "grid grid-cols-1 gap-2"}`}>
          {quickActions.map((action, index) => (
            <Button
              key={index}
              size="sm"
              className={`${action.color} text-white ${
                isCollapsed ? "w-8 h-8 p-0" : "w-full justify-start"
              } transition-all duration-200`}
              title={isCollapsed ? action.label : undefined}
            >
              <action.icon className="w-4 h-4" />
              {!isCollapsed && <span className="ml-2 text-xs font-medium">{action.label}</span>}
            </Button>
          ))}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4 overflow-y-auto">
        {!isCollapsed && <h3 className="text-sm font-semibold text-blue-800 mb-3">Navigation</h3>}
        <div className="space-y-1">
          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => setActiveItem(item.label)}
              className={`${isCollapsed ? "w-8 h-8 p-0" : "w-full justify-start"} ${
                activeItem === item.label
                  ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500"
                  : "hover:bg-blue-50 text-blue-600"
              } transition-all duration-200`}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="w-4 h-4" />
              {!isCollapsed && <span className="ml-3 text-sm font-medium">{item.label}</span>}
            </Button>
          ))}
        </div>
      </div>

      {/* Footer Progress */}
      {!isCollapsed && (
        <div className="p-4 border-t border-blue-100 bg-gradient-to-r from-blue-50 to-white">
          <div className="bg-white rounded-lg p-3 border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-blue-600">Today's Progress</p>
              <Bell className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-sm font-bold text-blue-800 mb-2">18/21 medicines taken</p>
            <div className="w-full bg-blue-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: "85%" }}
              ></div>
            </div>
            <p className="text-xs text-blue-500 mt-1">85% completed</p>
          </div>
        </div>
      )}
    </div>
  )
}
