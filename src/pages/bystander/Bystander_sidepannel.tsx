"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  User,
  Pill,
  FileText,
  Settings,
  LogOut,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import bystanderAxiosInstance from "@/config/BystanderAxiosInstance";
import { ErrorToast, SuccessToast } from "@/components/shared/Tost";
import { useDispatch } from "react-redux";
import { removeBystanderToken } from "@/redux/slice/bystanderTokenSlice";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "home", badge: null },
  { icon: User, label: "My Patient", path: "patient", badge: null },
  { icon: Pill, label: "Medicines", path: "medicines", badge: null },
  { icon: FileText, label: "Medical Records", path: "records", badge: null },
  { icon: Settings, label: "Settings", path: "settings", badge: null },
];


export default function BystanderSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate=useNavigate()
  const handlePageChange = (page: string) => {
    console.log(`[v0] Navigating to: ${page}`);
  };
 const dispatch=useDispatch()
  const handleLogout = async () => {
    try {
      const response = await bystanderAxiosInstance.post("/logout");
      if (response.data.success) {
        SuccessToast("Logged out successfully!");
        dispatch(removeBystanderToken());
        navigate("/bystander");
      } else {
        ErrorToast("Logout failed. Please try again.");
      }
    } catch (err) {
      ErrorToast("Something went wrong while logging out.");
      console.log(err);
    }
  };

  return (
    <Card
      className={cn(
        "h-full border-r border-green-100 bg-gradient-to-b from-green-50 to-white shadow-lg transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-green-100">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-600 rounded-lg">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-green-900">CareAssist</h2>
                <p className="text-xs text-green-600">Bystander Portal</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0 hover:bg-green-100"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-green-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-green-600" />
            )}
          </Button>
        </div>

        {/* Bystander Info */}
        {!isCollapsed && (
          <div className="p-4 border-b border-green-100">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                <span className="text-white font-medium">BS</span>
              </div>
              <div>
                <p className="font-medium text-green-900">Bystander Sarah</p>
                <p className="text-sm text-green-600">Care Assistant</p>
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
                "w-full justify-start h-10 hover:bg-green-100 hover:text-green-700",
                isCollapsed ? "px-2" : "px-3",
              )}
              onClick={() => handlePageChange(item.path)}
            >
              <item.icon
                className={cn("h-4 w-4 text-green-600", !isCollapsed && "mr-3")}
              />
              {!isCollapsed && (
                <>
                  <span className="text-green-800">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="ml-auto bg-green-100 text-green-700 hover:bg-green-200"
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
        <div className="p-4 border-t border-green-100 space-y-3">
          {/* Status */}
          {!isCollapsed ? (
            <div className="text-center">
              <p className="text-xs text-green-600">Online Status</p>
              <div className="flex items-center justify-center mt-1">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-800">Available</span>
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
