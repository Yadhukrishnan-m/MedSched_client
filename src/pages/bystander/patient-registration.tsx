"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  CheckCircle,
  ArrowLeft,
  Shield,
} from "lucide-react";
import bystanderAxiosInstance from "@/config/BystanderAxiosInstance";
import { ErrorToast } from "@/components/shared/Tost";

export default function PatientRegistration({
  onSuccess,
  onBack,
}: {
  onSuccess: () => void;
  onBack: () => void;
}) {
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRegistration, setShowRegistration] = useState(true);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("[v0] Registering patient:", formData);

    // Simulate API delay
    await bystanderAxiosInstance.post("/patient-register/send-otp", {
      email: formData.email,
    });

    setIsLoading(false);
    setStep("otp");
  };
  const x=true
  if (x!==true) {
    console.log(onBack());
  }

   const handleOtpSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsLoading(true);

     try {
       const res = await bystanderAxiosInstance.post("/patient-register/verify-otp", {
         email: formData.email,
         password: formData.password,
         name: formData.name,
         otp,
       });

       if (res.data.success) {
         setIsLoading(false);
         setStep("success");

         setTimeout(() => {
           onSuccess(); // 👈 tell parent to go to details
         }, 1500);
       } else {
         ErrorToast("Please enter a valid 4-digit OTP");
         setIsLoading(false);
       }
     } catch (err) {
        if (err instanceof Error) {
                        ErrorToast("invalid credentials"); 
                      } else {
                        ErrorToast(String(err)); 
                      }
       setIsLoading(false);
     }
   };
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBack = () => {
    setShowRegistration(false);
  };

  if (!showRegistration) {
    return null;
  }

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-green-50 via-white to-green-50 overflow-auto">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="hover:bg-green-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-green-900">
              Patient Registration
            </h1>
            <p className="text-green-600 mt-1">
              Register a new patient under your care
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="flex items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                step === "form"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-600"
              }`}
            >
              <User className="h-4 w-4" />
            </div>
            <span className="ml-2 text-sm text-green-700">Patient Info</span>
          </div>
          <div
            className={`h-1 w-16 ${
              step !== "form" ? "bg-green-600" : "bg-green-200"
            }`}
          ></div>
          <div className="flex items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                step === "otp"
                  ? "bg-green-600 text-white"
                  : step === "success"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              <Shield className="h-4 w-4" />
            </div>
            <span className="ml-2 text-sm text-green-700">Verify OTP</span>
          </div>
          <div
            className={`h-1 w-16 ${
              step === "success" ? "bg-green-600" : "bg-green-200"
            }`}
          ></div>
          <div className="flex items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${
                step === "success"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              <CheckCircle className="h-4 w-4" />
            </div>
            <span className="ml-2 text-sm text-green-700">Complete</span>
          </div>
        </div>

        {/* Registration Form */}
        {step === "form" && (
          <Card className="border-green-100">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit">
                <UserPlus className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-green-900">
                Patient Information
              </CardTitle>
              <CardDescription className="text-green-600">
                Enter the patient's basic information to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-green-800">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter patient's full name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="pl-10 border-green-200 focus:border-green-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-green-800">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter patient's email address"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="pl-10 border-green-200 focus:border-green-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-green-800">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-green-600" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="pl-10 border-green-200 focus:border-green-400"
                      required
                      minLength={6}
                    />
                  </div>
                  <p className="text-xs text-green-600">
                    Password must be at least 4 characters long
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">
                        Privacy & Security
                      </h4>
                      <p className="text-sm text-green-700 mt-1">
                        Patient information is encrypted and securely stored.
                        Only you as the assigned bystander will have access to
                        this patient's data.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={
                    isLoading ||
                    !formData.name ||
                    !formData.email ||
                    !formData.password
                  }
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Registering Patient...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Register Patient
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* OTP Verification */}
        {step === "otp" && (
          <Card className="border-green-100">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-green-900">Verify OTP</CardTitle>
              <CardDescription className="text-green-600">
                We've sent a 6-digit verification code to {formData.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-green-800">
                    Verification Code
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    className="text-center text-2xl tracking-widest border-green-200 focus:border-green-400"
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-green-600 text-center">
                    Enter the 6-digit code sent to your email
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700 text-center">
                    <strong>Demo Note:</strong> Enter any 6-digit number to
                    proceed (e.g., 123456)
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("form")}
                    className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                  >
                    Back to Form
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    disabled={isLoading || otp.length !== 4}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Verify OTP
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-green-600 hover:text-green-700"
                    onClick={() => {
                      console.log("[v0] Resending OTP");
                      alert("OTP resent to " + formData.email);
                    }}
                  >
                    Didn't receive the code? Resend OTP
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Success */}
        {step === "success" && (
          <Card className="border-green-100">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-green-900">
                Registration Successful!
              </CardTitle>
              <CardDescription className="text-green-600">
                Patient {formData.name} has been successfully registered under
                your care
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Badge className="bg-green-600 text-white">
                    <User className="h-3 w-3 mr-1" />
                    Patient Assigned
                  </Badge>
                </div>
                <p className="text-sm text-green-700">
                  You can now monitor {formData.name}'s health, manage
                  medications, and provide care assistance.
                </p>
              </div>

              <div className="animate-pulse">
                <p className="text-sm text-green-600">
                  Redirecting to dashboard in a moment...
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
