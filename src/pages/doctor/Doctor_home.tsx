"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Calendar,
  Pill,
  MessageCircle,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Patients",
    value: "247",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Today's Appointments",
    value: "8",
    change: "2 pending",
    icon: Calendar,
    color: "text-green-600",
  },
  {
    title: "Prescriptions",
    value: "23",
    change: "This week",
    icon: Pill,
    color: "text-purple-600",
  },
  {
    title: "Consultations",
    value: "15",
    change: "3 urgent",
    icon: MessageCircle,
    color: "text-orange-600",
  },
];

const recentPatients = [
  {
    name: "John Smith",
    age: 45,
    condition: "Hypertension",
    lastVisit: "2 days ago",
    status: "stable",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Emily Davis",
    age: 32,
    condition: "Diabetes",
    lastVisit: "1 week ago",
    status: "monitoring",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Michael Brown",
    age: 58,
    condition: "Heart Disease",
    lastVisit: "3 days ago",
    status: "critical",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const upcomingAppointments = [
  {
    time: "09:00 AM",
    patient: "Sarah Wilson",
    type: "Consultation",
    duration: "30 min",
  },
  {
    time: "10:30 AM",
    patient: "Robert Johnson",
    type: "Follow-up",
    duration: "15 min",
  },
  {
    time: "02:00 PM",
    patient: "Lisa Anderson",
    type: "Check-up",
    duration: "45 min",
  },
];

export default function PatientHome() {
  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">
              Welcome back, Dr. Johnson
            </h1>
            <p className="text-blue-600 mt-1">
              Here's what's happening with your patients today
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className="border-green-200 text-green-700"
            >
              <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
              Online
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="border-blue-100 hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-800">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">
                  {stat.value}
                </div>
                <p className="text-xs text-blue-600 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Patients */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                Recent Patients
              </CardTitle>
              <CardDescription className="text-blue-600">
                Your most recent patient interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPatients.map((patient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-blue-200 text-blue-800">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-blue-900">
                        {patient.name}
                      </p>
                      <p className="text-sm text-blue-600">
                        {patient.condition} • Age {patient.age}
                      </p>
                      <p className="text-xs text-blue-500">
                        {patient.lastVisit}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      patient.status === "critical"
                        ? "destructive"
                        : patient.status === "monitoring"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      patient.status === "stable"
                        ? "border-green-200 text-green-700"
                        : ""
                    }
                  >
                    {patient.status === "critical" && (
                      <AlertCircle className="h-3 w-3 mr-1" />
                    )}
                    {patient.status === "stable" && (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    )}
                    {patient.status}
                  </Badge>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                View All Patients
              </Button>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Today's Schedule
              </CardTitle>
              <CardDescription className="text-blue-600">
                Your upcoming appointments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center h-10 w-10 bg-blue-600 rounded-lg">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">
                        {appointment.patient}
                      </p>
                      <p className="text-sm text-blue-600">
                        {appointment.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-blue-900">
                      {appointment.time}
                    </p>
                    <p className="text-sm text-blue-600">
                      {appointment.duration}
                    </p>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                View Full Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-blue-900">Quick Actions</CardTitle>
            <CardDescription className="text-blue-600">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex-col bg-blue-600 hover:bg-blue-700">
                <Pill className="h-6 w-6 mb-2" />
                New Prescription
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                <MessageCircle className="h-6 w-6 mb-2" />
                Start Consultation
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                <Calendar className="h-6 w-6 mb-2" />
                Schedule Appointment
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
              >
                <TrendingUp className="h-6 w-6 mb-2" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
