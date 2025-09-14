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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pill,
  FileText,
  Heart,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Activity,
} from "lucide-react";

const patientData = {
  name: "John Smith",
  age: 45,
  email: "john.smith@email.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, City, State 12345",
  condition: "Hypertension",
  bloodType: "O+",
  allergies: ["Penicillin", "Shellfish"],
  emergencyContact: {
    name: "Jane Smith",
    relationship: "Spouse",
    phone: "+1 (555) 987-6543",
  },
  registeredDate: "2024-01-15",
  lastCheckup: "2 days ago",
  status: "stable",
  avatar: "/placeholder.svg?height=80&width=80",
};

const medicineHistory = [
  {
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: "2024-01-15",
    endDate: null,
    status: "active",
    prescribedBy: "Dr. Johnson",
    notes: "For blood pressure control",
  },
  {
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    startDate: "2024-02-01",
    endDate: null,
    status: "active",
    prescribedBy: "Dr. Johnson",
    notes: "Diabetes management",
  },
  {
    name: "Aspirin",
    dosage: "81mg",
    frequency: "Once daily",
    startDate: "2024-01-20",
    endDate: null,
    status: "low_stock",
    prescribedBy: "Dr. Johnson",
    notes: "Blood thinner, low dose",
  },
  {
    name: "Ibuprofen",
    dosage: "200mg",
    frequency: "As needed",
    startDate: "2024-01-10",
    endDate: "2024-01-25",
    status: "completed",
    prescribedBy: "Dr. Johnson",
    notes: "For temporary pain relief",
  },
];

const medicalRecords = [
  {
    date: "2024-01-15",
    type: "Initial Consultation",
    doctor: "Dr. Johnson",
    notes:
      "Patient registered with hypertension. Started on Lisinopril 10mg daily.",
    vitals: {
      bloodPressure: "150/95",
      heartRate: "78",
      temperature: "98.6°F",
      weight: "180 lbs",
    },
  },
  {
    date: "2024-02-01",
    type: "Follow-up",
    doctor: "Dr. Johnson",
    notes: "Blood pressure improving. Added Metformin for diabetes management.",
    vitals: {
      bloodPressure: "140/88",
      heartRate: "75",
      temperature: "98.4°F",
      weight: "178 lbs",
    },
  },
  {
    date: "2024-02-15",
    type: "Check-up",
    doctor: "Dr. Johnson",
    notes:
      "Patient responding well to treatment. Continue current medications.",
    vitals: {
      bloodPressure: "135/85",
      heartRate: "72",
      temperature: "98.5°F",
      weight: "176 lbs",
    },
  },
];

export default function PatientDetails({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-green-50 via-white to-green-50 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:bg-green-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-green-900">
              Patient Details
            </h1>
            <p className="text-green-600 mt-1">
              Complete information and care history for your patient
            </p>
          </div>
        </div>

        {/* Patient Overview Card */}
        <Card className="border-green-100">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={patientData.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-green-200 text-green-800 text-xl">
                    {patientData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold text-green-900">
                      {patientData.name}
                    </h2>
                    <p className="text-green-600">
                      Age {patientData.age} • Blood Type {patientData.bloodType}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-green-600" />
                      <span className="text-green-800">
                        {patientData.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span className="text-green-800">
                        {patientData.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="text-green-800">
                        Registered: {patientData.registeredDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-green-600" />
                      <span className="text-green-800">
                        Last checkup: {patientData.lastCheckup}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-3">
                <Badge
                  variant="outline"
                  className="border-green-200 text-green-700"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {patientData.status}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  {patientData.condition}
                </Badge>
              </div>
            </div>

            {/* Emergency Contact & Allergies */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-medium text-red-900 mb-2">
                  Emergency Contact
                </h4>
                <p className="text-sm text-red-800">
                  {patientData.emergencyContact.name} (
                  {patientData.emergencyContact.relationship})
                </p>
                <p className="text-sm text-red-700">
                  {patientData.emergencyContact.phone}
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  {patientData.allergies.map((allergy, index) => (
                    <Badge
                      key={index}
                      variant="destructive"
                      className="text-xs"
                    >
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="medicines" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="medicines">Medicines</TabsTrigger>
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="care">Care Notes</TabsTrigger>
          </TabsList>

          {/* Medicines Tab */}
          <TabsContent value="medicines" className="space-y-4">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center">
                  <Pill className="h-5 w-5 mr-2 text-green-600" />
                  Medicine History
                </CardTitle>
                <CardDescription className="text-green-600">
                  Complete medication history and current prescriptions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {medicineHistory.map((medicine, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center h-12 w-12 bg-green-600 rounded-lg">
                        <Pill className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-green-900 text-lg">
                          {medicine.name}
                        </p>
                        <p className="text-sm text-green-600">
                          {medicine.dosage} • {medicine.frequency}
                        </p>
                        <p className="text-xs text-green-500">
                          Prescribed by {medicine.prescribedBy} • Started{" "}
                          {medicine.startDate}
                        </p>
                        {medicine.notes && (
                          <p className="text-xs text-green-700 mt-1 italic">
                            {medicine.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge
                        variant={
                          medicine.status === "active"
                            ? "outline"
                            : medicine.status === "low_stock"
                            ? "destructive"
                            : "secondary"
                        }
                        className={
                          medicine.status === "active"
                            ? "border-green-200 text-green-700"
                            : ""
                        }
                      >
                        {medicine.status === "low_stock" && (
                          <AlertCircle className="h-3 w-3 mr-1" />
                        )}
                        {medicine.status === "active" && (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        )}
                        {medicine.status.replace("_", " ")}
                      </Badge>
                      {medicine.endDate && (
                        <p className="text-xs text-green-500">
                          Ended: {medicine.endDate}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical Records Tab */}
          <TabsContent value="records" className="space-y-4">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-green-600" />
                  Medical Records
                </CardTitle>
                <CardDescription className="text-green-600">
                  Complete medical history and consultation records
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {medicalRecords.map((record, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-green-200 pl-4 pb-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className="border-green-200 text-green-700"
                        >
                          {record.type}
                        </Badge>
                        <span className="text-sm text-green-600">
                          {record.date}
                        </span>
                      </div>
                      <span className="text-sm text-green-600">
                        {record.doctor}
                      </span>
                    </div>

                    <p className="text-green-800 mb-3">{record.notes}</p>

                    <div className="bg-green-50 p-3 rounded-lg">
                      <h5 className="font-medium text-green-900 mb-2">
                        Vitals
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <span className="text-green-600">BP:</span>
                          <span className="ml-1 text-green-800">
                            {record.vitals.bloodPressure}
                          </span>
                        </div>
                        <div>
                          <span className="text-green-600">HR:</span>
                          <span className="ml-1 text-green-800">
                            {record.vitals.heartRate} bpm
                          </span>
                        </div>
                        <div>
                          <span className="text-green-600">Temp:</span>
                          <span className="ml-1 text-green-800">
                            {record.vitals.temperature}
                          </span>
                        </div>
                        <div>
                          <span className="text-green-600">Weight:</span>
                          <span className="ml-1 text-green-800">
                            {record.vitals.weight}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Care Notes Tab */}
          <TabsContent value="care" className="space-y-4">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-green-600" />
                  Care Notes & Reminders
                </CardTitle>
                <CardDescription className="text-green-600">
                  Important care instructions and daily reminders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-green-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-900">
                      Daily Care Routine
                    </span>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1 ml-6">
                    <li>
                      • Monitor blood pressure twice daily (morning and evening)
                    </li>
                    <li>• Ensure medication is taken with meals</li>
                    <li>• Check for any unusual symptoms or side effects</li>
                    <li>
                      • Maintain regular exercise routine as approved by doctor
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-blue-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Important Reminders
                    </span>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1 ml-6">
                    <li>• Next doctor appointment: Friday, 2:00 PM</li>
                    <li>• Aspirin supply running low - reorder needed</li>
                    <li>
                      • Patient reported dizziness yesterday - monitor closely
                    </li>
                    <li>• Blood work scheduled for next week</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-orange-50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-900">
                      Emergency Instructions
                    </span>
                  </div>
                  <ul className="text-sm text-orange-700 space-y-1 ml-6">
                    <li>
                      • If blood pressure exceeds 180/110, contact doctor
                      immediately
                    </li>
                    <li>
                      • Watch for signs of allergic reactions to medications
                    </li>
                    <li>
                      • Emergency contact: Jane Smith at +1 (555) 987-6543
                    </li>
                    <li>• Keep emergency medications easily accessible</li>
                  </ul>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  Add New Care Note
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
