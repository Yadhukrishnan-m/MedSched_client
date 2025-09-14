"use client";

import { useEffect, useState } from "react";
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
  User,
  Pill,
  FileText,
  UserPlus,
  Heart,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import PatientRegistration from "./patient-registration";
import PatientDetails from "./patient_details";
import bystanderAxiosInstance from "@/config/BystanderAxiosInstance";

const patientData = {
  name: "John Smith",
  age: 45,
  condition: "Hypertension",
  lastCheckup: "2 days ago",
  status: "stable",
  avatar: "/placeholder.svg?height=40&width=40",
};

const currentMedicines = [
  {
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    timeLeft: "5 days",
    status: "active",
  },
  {
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    timeLeft: "12 days",
    status: "active",
  },
  {
    name: "Aspirin",
    dosage: "81mg",
    frequency: "Once daily",
    timeLeft: "2 days",
    status: "low",
  },
];

export default function BystanderHome() {
  const [hasPatient, setHasPatient] = useState(false);
  // ;
  const [showRegistration, setShowRegistration] = useState(false);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  

  const handleRegisterPatient = () => {
    setShowRegistration(true);
  };

  const handleViewPatient = () => {
    setShowPatientDetails(true);
  };

useEffect(() => {
  const checkPatient = async () => {
    try {
      const res = await bystanderAxiosInstance.get("/patient-details");
      console.log(res)
      if (res.data.isPatientExist) {
        setHasPatient(true);
      } else {
        setHasPatient(false);
      }
    } catch (err) {
      console.error("Error fetching patient details", err);
      setHasPatient(false);
    }
  };

  checkPatient();
}, []);
  
if (showRegistration) {
  return (
    <PatientRegistration
      onSuccess={() => {
        setShowRegistration(false);
        setShowPatientDetails(true); // 👈 directly open patient details
      }}
      onBack={() => setShowRegistration(false)}
    />
  );
}

if (showPatientDetails) {
  return <PatientDetails onBack={() => setShowPatientDetails(false)} />;
}

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-green-50 via-white to-green-50 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-green-900">
              Welcome back, Sarah
            </h1>
            <p className="text-green-600 mt-1">
              {hasPatient
                ? "Here's your patient's current status and care information"
                : "Ready to register and care for a patient"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className="border-green-200 text-green-700"
            >
              <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
              Available
            </Badge>
          </div>
        </div>

        {/* Main Content - Conditional based on patient assignment */}
        {!hasPatient ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="border-green-100 max-w-md w-full">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit">
                  <UserPlus className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-green-900">
                  No Patient Assigned
                </CardTitle>
                <CardDescription className="text-green-600">
                  You can register and care for one patient. Click below to get
                  started.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  onClick={handleRegisterPatient}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register New Patient
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Patient Overview Card */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center">
                  <User className="h-5 w-5 mr-2 text-green-600" />
                  My Patient
                </CardTitle>
                <CardDescription className="text-green-600">
                  Current patient under your care
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={patientData.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback className="bg-green-200 text-green-800">
                        {patientData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-green-900 text-lg">
                        {patientData.name}
                      </p>
                      <p className="text-sm text-green-600">
                        {patientData.condition} • Age {patientData.age}
                      </p>
                      <p className="text-xs text-green-500">
                        Last checkup: {patientData.lastCheckup}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge
                      variant="outline"
                      className="border-green-200 text-green-700"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {patientData.status}
                    </Badge>
                    <Button
                      onClick={handleViewPatient}
                      variant="outline"
                      className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Medicines */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-900 flex items-center">
                    <Pill className="h-5 w-5 mr-2 text-green-600" />
                    Current Medicines
                  </CardTitle>
                  <CardDescription className="text-green-600">
                    Patient's current medication schedule
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentMedicines.map((medicine, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center h-10 w-10 bg-green-600 rounded-lg">
                          <Pill className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-green-900">
                            {medicine.name}
                          </p>
                          <p className="text-sm text-green-600">
                            {medicine.dosage} • {medicine.frequency}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            medicine.status === "low"
                              ? "destructive"
                              : "outline"
                          }
                          className={
                            medicine.status === "active"
                              ? "border-green-200 text-green-700"
                              : ""
                          }
                        >
                          {medicine.status === "low" && (
                            <AlertCircle className="h-3 w-3 mr-1" />
                          )}
                          {medicine.timeLeft}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    View All Medicines
                  </Button>
                </CardContent>
              </Card>

              {/* Care Notes */}
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-green-900 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-green-600" />
                    Care Notes
                  </CardTitle>
                  <CardDescription className="text-green-600">
                    Important care reminders and notes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900">
                        Today
                      </span>
                    </div>
                    <p className="text-sm text-green-700">
                      Monitor blood pressure twice daily. Patient reported
                      feeling dizzy yesterday.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-900">
                        Reminder
                      </span>
                    </div>
                    <p className="text-sm text-green-700">
                      Next doctor appointment scheduled for Friday at 2:00 PM.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    Add New Note
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-900">Quick Actions</CardTitle>
                <CardDescription className="text-green-600">
                  Common care tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex-col bg-green-600 hover:bg-green-700">
                    <Pill className="h-6 w-6 mb-2" />
                    Medicine Reminder
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    <Heart className="h-6 w-6 mb-2" />
                    Check Vitals
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    <FileText className="h-6 w-6 mb-2" />
                    Add Note
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    <AlertCircle className="h-6 w-6 mb-2" />
                    Emergency Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
