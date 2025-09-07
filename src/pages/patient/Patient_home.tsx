"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  Calendar,
  Pill,
  CheckCircle,
  TrendingUp,
  Heart,
  Activity,
  User,
  Bell,
  Plus,
  ArrowRight,
  AlertTriangle,
  Thermometer,
  Droplets,
  Zap,
  Target,
  Award,
  Phone,
  MessageSquare,
  Camera,
  FileText,
  BarChart3,
  Settings,
  MapPin,
  Smartphone,
} from "lucide-react";

export default function PatientHome() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const userName = "John"; // replace with dynamic
    const greeting = `Good morning, ${userName}!`;

    const speakGreeting = () => {
      const utterance = new SpeechSynthesisUtterance(greeting);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;

      const voices = speechSynthesis.getVoices();
      console.log("Available voices:", voices);

      // Pick a female voice if available
      const  selectedVoice =
        voices.find((v) => v.name.includes("Female")) ||
        voices.find((v) => v.name.includes("Samantha")) ||
        voices.find((v) => v.name.includes("Google UK English Female")) ||
        voices.find((v) => v.lang === "en-GB") ||
        voices[0]; // fallback to first

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      speechSynthesis.speak(utterance);
    };

    // 🔑 Chrome loads voices asynchronously
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = speakGreeting;
    } else {
      speakGreeting();
    }

    return () => {
      speechSynthesis.cancel();
    };
  }, []);


  useEffect(() => {
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const todayMedicines = [
    {
      id: 1,
      name: "Aspirin",
      dosage: "100mg",
      time: "08:00 AM",
      taken: true,
      type: "tablet",
      color: "bg-green-100 text-green-800",
      instructions: "Take with food",
      sideEffects: "May cause stomach upset",
      frequency: "Once daily",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      time: "12:00 PM",
      taken: true,
      type: "tablet",
      color: "bg-blue-100 text-blue-800",
      instructions: "Take with meals",
      sideEffects: "May cause nausea",
      frequency: "Twice daily",
    },
    {
      id: 3,
      name: "Lisinopril",
      dosage: "10mg",
      time: "06:00 PM",
      taken: false,
      type: "tablet",
      color: "bg-orange-100 text-orange-800",
      instructions: "Take on empty stomach",
      sideEffects: "May cause dizziness",
      frequency: "Once daily",
      urgent: true,
    },
    {
      id: 4,
      name: "Vitamin D",
      dosage: "1000 IU",
      time: "09:00 PM",
      taken: false,
      type: "capsule",
      color: "bg-purple-100 text-purple-800",
      instructions: "Take with fatty meal",
      sideEffects: "Generally well tolerated",
      frequency: "Once daily",
    },
  ];

  const upcomingMedicines = [
    {
      name: "Aspirin",
      time: "Tomorrow 08:00 AM",
      dosage: "100mg",
      priority: "high",
    },
    {
      name: "Metformin",
      time: "Tomorrow 12:00 PM",
      dosage: "500mg",
      priority: "high",
    },
    {
      name: "Calcium",
      time: "Tomorrow 07:00 PM",
      dosage: "600mg",
      priority: "medium",
    },
    {
      name: "Omega-3",
      time: "Day after tomorrow",
      dosage: "1000mg",
      priority: "low",
    },
  ];

  const healthStats = [
    {
      label: "Blood Pressure",
      value: "120/80",
      status: "normal",
      icon: Heart,
      color: "text-green-600",
      trend: "+2%",
    },
    {
      label: "Heart Rate",
      value: "72 bpm",
      status: "normal",
      icon: Activity,
      color: "text-blue-600",
      trend: "-1%",
    },
    {
      label: "Weight",
      value: "70 kg",
      status: "stable",
      icon: TrendingUp,
      color: "text-purple-600",
      trend: "0%",
    },
    {
      label: "Temperature",
      value: "98.6°F",
      status: "normal",
      icon: Thermometer,
      color: "text-orange-600",
      trend: "0%",
    },
    {
      label: "Hydration",
      value: "6/8 glasses",
      status: "good",
      icon: Droplets,
      color: "text-cyan-600",
      trend: "+12%",
    },
    {
      label: "Sleep",
      value: "7.5 hrs",
      status: "good",
      icon: Zap,
      color: "text-indigo-600",
      trend: "+5%",
    },
  ];

  const recentHistory = [
    {
      date: "Yesterday",
      medicines: 21,
      taken: 20,
      percentage: 95,
      mood: "good",
    },
    {
      date: "2 days ago",
      medicines: 21,
      taken: 21,
      percentage: 100,
      mood: "excellent",
    },
    {
      date: "3 days ago",
      medicines: 21,
      taken: 19,
      percentage: 90,
      mood: "fair",
    },
    {
      date: "4 days ago",
      medicines: 21,
      taken: 18,
      percentage: 86,
      mood: "good",
    },
    {
      date: "5 days ago",
      medicines: 21,
      taken: 21,
      percentage: 100,
      mood: "excellent",
    },
  ];

  const appointments = [
    {
      doctor: "Dr. Smith",
      specialty: "Cardiologist",
      date: "Dec 15, 2024",
      time: "10:00 AM",
      type: "Follow-up",
    },
    {
      doctor: "Dr. Johnson",
      specialty: "Endocrinologist",
      date: "Dec 20, 2024",
      time: "2:30 PM",
      type: "Routine",
    },
  ];

  const achievements = [
    {
      title: "7-Day Streak",
      description: "Perfect adherence for a week",
      icon: Award,
      earned: true,
    },
    {
      title: "Early Bird",
      description: "Took morning meds on time",
      icon: Target,
      earned: true,
    },
    {
      title: "Health Champion",
      description: "Maintained healthy vitals",
      icon: Heart,
      earned: false,
    },
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 overflow-y-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-blue-900 mb-2">
              Good Morning, John!
            </h1>
            <div className="flex items-center space-x-4 text-blue-600">
              <p>
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <span>•</span>
              <p className="font-mono text-lg">
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>New York, 72°F</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
            >
              <Bell className="w-4 h-4 mr-2" />3 Notifications
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
            >
              <Phone className="w-4 h-4 mr-2" />
              Emergency
            </Button>
            <Avatar className="w-12 h-12">
              <AvatarImage src="/patient-profile.png" alt="John Doe" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <Card className="border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">
                    Today's Progress
                  </p>
                  <p className="text-2xl font-bold text-blue-900">18/21</p>
                  <Progress value={85} className="mt-2 h-2" />
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Pill className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Streak</p>
                  <p className="text-2xl font-bold text-green-900">7 days</p>
                  <p className="text-xs text-green-500 mt-1">
                    🔥 Personal best!
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Pending</p>
                  <p className="text-2xl font-bold text-orange-900">3</p>
                  <p className="text-xs text-orange-500 mt-1">1 urgent</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">
                    Next Dose
                  </p>
                  <p className="text-2xl font-bold text-purple-900">6:00 PM</p>
                  <p className="text-xs text-purple-500 mt-1">Lisinopril</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Adherence</p>
                  <p className="text-2xl font-bold text-red-900">92%</p>
                  <p className="text-xs text-red-500 mt-1">This month</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-600 font-medium">Mood</p>
                  <p className="text-2xl font-bold text-indigo-900">😊</p>
                  <p className="text-xs text-indigo-500 mt-1">Good today</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Today's Medicines - Enhanced */}
        <div className="xl:col-span-2">
          <Card className="border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Pill className="w-5 h-5 mr-2" />
                  Today's Medicines
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    <Camera className="w-4 h-4 mr-1" />
                    Scan
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {todayMedicines.map((medicine) => (
                  <div
                    key={medicine.id}
                    className={`relative flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                      medicine.taken
                        ? "bg-green-50 border-green-200"
                        : medicine.urgent
                        ? "bg-red-50 border-red-200 hover:border-red-300"
                        : "bg-white border-blue-200 hover:border-blue-300"
                    }`}
                  >
                    {medicine.urgent && !medicine.taken && (
                      <div className="absolute -top-2 -right-2">
                        <AlertTriangle className="w-6 h-6 text-red-500 bg-white rounded-full p-1" />
                      </div>
                    )}
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          medicine.taken
                            ? "bg-green-500"
                            : medicine.urgent
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                      >
                        <Pill className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {medicine.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {medicine.dosage} • {medicine.type} •{" "}
                          {medicine.frequency}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {medicine.instructions}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <Badge className={medicine.color}>
                          {medicine.time}
                        </Badge>
                        {medicine.urgent && !medicine.taken && (
                          <Badge className="bg-red-100 text-red-800 mt-1 block">
                            URGENT
                          </Badge>
                        )}
                      </div>
                      {medicine.taken ? (
                        <div className="flex flex-col items-center">
                          <CheckCircle className="w-6 h-6 text-green-500" />
                          <span className="text-xs text-green-600 mt-1">
                            Taken
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col space-y-1">
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            Take Now
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs bg-transparent"
                          >
                            Skip
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-medium text-yellow-800">
                    Drug Interaction Alert
                  </h4>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  Aspirin and Lisinopril may interact. Monitor blood pressure
                  closely.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Enhanced */}
        <div className="xl:col-span-2 space-y-6">
          {/* Health Monitoring Dashboard */}
          <Card className="border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
              <CardTitle className="text-blue-900 flex items-center justify-between">
                <span className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Health Monitoring
                </span>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  <Settings className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {healthStats.map((stat, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <span
                        className={`text-xs font-medium ${
                          stat.trend.startsWith("+")
                            ? "text-green-600"
                            : stat.trend.startsWith("-")
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {stat.trend}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-gray-700 mb-1">
                      {stat.label}
                    </p>
                    <p className="font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.status}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs bg-transparent"
                >
                  <Smartphone className="w-3 h-3 mr-1" />
                  Sync Device
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs bg-transparent"
                >
                  <FileText className="w-3 h-3 mr-1" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Medicines - Enhanced */}
          <Card className="border-purple-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-purple-50">
              <CardTitle className="text-purple-900 flex items-center justify-between">
                <span className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Schedule
                </span>
                <Badge className="bg-purple-200 text-purple-800">
                  Next 3 days
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {upcomingMedicines.map((medicine, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          medicine.priority === "high"
                            ? "bg-red-500"
                            : medicine.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {medicine.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {medicine.dosage}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-purple-600 font-medium text-right">
                      {medicine.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Calendar View
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Set Reminders
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Appointments - New Section */}
          <Card className="border-teal-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-100 to-teal-50">
              <CardTitle className="text-teal-900 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {appointments.map((appointment, index) => (
                  <div key={index} className="p-3 bg-teal-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {appointment.doctor}
                      </h4>
                      <Badge className="bg-teal-200 text-teal-800 text-xs">
                        {appointment.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {appointment.specialty}
                    </p>
                    <p className="text-xs text-teal-600 font-medium mt-1">
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-teal-200 text-teal-600 hover:bg-teal-50 bg-transparent"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  Call
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-teal-200 text-teal-600 hover:bg-teal-50 bg-transparent"
                >
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Achievements - New Section */}
          <Card className="border-yellow-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-yellow-100 to-yellow-50">
              <CardTitle className="text-yellow-900 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Achievements & Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg flex items-center space-x-3 ${
                      achievement.earned
                        ? "bg-yellow-50 border border-yellow-200"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <achievement.icon
                      className={`w-6 h-6 ${
                        achievement.earned ? "text-yellow-600" : "text-gray-400"
                      }`}
                    />
                    <div className="flex-1">
                      <h4
                        className={`font-medium ${
                          achievement.earned ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {achievement.title}
                      </h4>
                      <p
                        className={`text-xs ${
                          achievement.earned ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent History - Enhanced */}
          <Card className="border-green-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-100 to-green-50">
              <CardTitle className="text-green-900 flex items-center justify-between">
                <span className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Adherence History
                </span>
                <Badge className="bg-green-200 text-green-800">
                  Last 5 days
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {recentHistory.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          day.percentage >= 95
                            ? "bg-green-500"
                            : day.percentage >= 80
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {day.date}
                        </p>
                        <p className="text-xs text-gray-600">
                          {day.taken}/{day.medicines} taken • Mood: {day.mood}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-bold ${
                          day.percentage >= 95
                            ? "text-green-600"
                            : day.percentage >= 80
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {day.percentage}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
              >
                View Detailed Report <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
