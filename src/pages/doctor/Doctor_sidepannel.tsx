"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  Pill,
  MessageCircle,
  Calendar,
  FileText,
  Settings,
  Stethoscope,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import  doctorAxiosInstance  from "../../config/DoctorAxiosInstance"; // adjust import path if needed
import { SuccessToast, ErrorToast } from "../../components/shared/Tost"; // adjust path
import { useDispatch } from "react-redux";
import { removeDoctorToken } from "@/redux/slice/doctorTokenSlice";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "home", badge: null },
  { icon: Users, label: "My Patients", path: "patients", badge: "12" },
  { icon: Pill, label: "Prescriptions", path: "prescriptions", badge: null },
  {
    icon: MessageCircle,
    label: "Consultations",
    path: "consultations",
    badge: "3",
  },
  { icon: Calendar, label: "Appointments", path: "appointments", badge: null },
  { icon: FileText, label: "Medical Records", path: "records", badge: null },
  { icon: Settings, label: "Settings", path: "settings", badge: null },
];

export default function CollapsibleSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    console.log(`[v0] Navigating to: ${page}`);
  };

  const handleLogout = async () => {
    try {
      const response = await doctorAxiosInstance.post("/logout");
      if (response.data.success) {
        SuccessToast("Logged out successfully!");
        dispatch(removeDoctorToken());
        navigate("/login");
      } else {
        ErrorToast("Logout failed. Please try again.");
      }
    } catch (err) {
      ErrorToast("Something went wrong while logging out.");
      console.log(err)
    }
  };

  return (
    <Card
      className={cn(
        "h-full border-r border-blue-100 bg-gradient-to-b from-blue-50 to-white shadow-lg transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-100">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-blue-900">MediCare</h2>
                <p className="text-xs text-blue-600">Doctor Portal</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0 hover:bg-blue-100"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-blue-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-blue-600" />
            )}
          </Button>
        </div>

        {/* Doctor Info */}
        {!isCollapsed && (
          <div className="p-4 border-b border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-medium">DR</span>
              </div>
              <div>
                <p className="font-medium text-blue-900">Dr. Sarah Johnson</p>
                <p className="text-sm text-blue-600">Cardiologist</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "w-full justify-start h-10 hover:bg-blue-100 hover:text-blue-700",
                isCollapsed ? "px-2" : "px-3",
                currentPage === item.path && "bg-blue-100 text-blue-700"
              )}
              onClick={() => handlePageChange(item.path)}
            >
              <item.icon
                className={cn("h-4 w-4 text-blue-600", !isCollapsed && "mr-3")}
              />
              {!isCollapsed && (
                <>
                  <span className="text-blue-800">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="ml-auto bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </nav>

        {/* Footer with Logout */}
        <div className="p-4 border-t border-blue-100 space-y-3">
          {/* Status */}
          {!isCollapsed ? (
            <div className="text-center">
              <p className="text-xs text-blue-600">Online Status</p>
              <div className="flex items-center justify-center mt-1">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-blue-800">Available</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            </div>
          )}

          {/* Logout Button */}
          <Button
            variant="ghost"
            className="w-full justify-start h-10 hover:bg-red-100 text-red-600"
            onClick={() => setShowLogoutConfirm(true)}
          >
            <LogOut className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
            {!isCollapsed && <span>Logout</span>}
          </Button>

          {/* Confirmation */}
          {showLogoutConfirm && (
            <div className="mt-2 p-2 border rounded-md bg-red-50 text-center">
              <p className="text-sm text-red-700">Confirm logout?</p>
              <div className="flex justify-center mt-2 space-x-2">
                <Button
                  size="sm"
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={handleLogout}
                >
                  Yes
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  No
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
