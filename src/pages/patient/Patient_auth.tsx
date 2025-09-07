

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Calendar, Shield, Users } from "lucide-react";
import patientAxiosInstance from "@/config/PatientAxiosInstance";
import OtpModal from "@/components/OtpModal";
import { SuccessToast } from "@/components/shared/Tost";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPatientToken } from "@/redux/slice/patientTokenSlice";

export default function ResponsiveAuth() {
  const navigate=useNavigate()
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login:", loginData);
  const response= await patientAxiosInstance.post("/login", {
      email: loginData.email,password:loginData.password
    });
    console.log(response.data.accessToken)
     dispatch(addPatientToken(response.data.accessToken));
   
   navigate('/patient/home')
    
  };

  const handleRegister =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Register:", registerData);
 const otpResponse = await patientAxiosInstance.post("/register/send-otp",{email:registerData.email});
 console.log("✅ OTP generated successfully:", otpResponse.data);
 setIsOtpModalOpen(true);
 console.log('modal opened');
 
  };

  
  const onFinalSubmit = async (otp:string) => {
      await patientAxiosInstance.post(
       "/register/verify-otp",
       {
         email: registerData.email,
         password: registerData.password,
         name: registerData.name,
         otp,
       }
     );
setIsOtpModalOpen(false)
    SuccessToast("successfully registered now login!!");
   
    try {
      console.log();
    } catch (error) {
      console.log(error);
    } finally {
      // setIsLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Add Google OAuth logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-900 dark:via-blue-950 dark:to-cyan-950 flex items-center justify-center p-3 sm:p-4 lg:p-6">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="bg-primary/10 border border-primary/20 rounded-full p-2.5 sm:p-3">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2">
            MedSched
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            Your trusted medical scheduling platform
          </p>
        </div>

        <Card className="shadow-xl border border-primary/10 bg-card/95 backdrop-blur-md">
          <CardHeader className="space-y-1 pb-3 sm:pb-4 px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl text-center text-card-foreground">
              Welcome
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground text-sm sm:text-base px-2">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 h-9 sm:h-10 bg-muted/50">
                <TabsTrigger
                  value="login"
                  className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="space-y-3 sm:space-y-4">
                <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="login-email"
                      className="text-xs sm:text-sm font-medium"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="doctor@example.com"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      className="h-10 sm:h-11 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="login-password"
                      className="text-xs sm:text-sm font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        className="h-10 sm:h-11 pr-10 text-sm sm:text-base"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-2 sm:px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-10 sm:h-11 bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base"
                  >
                    Sign In
                  </Button>
                </form>

                <div className="relative my-4 sm:my-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 sm:h-11 bg-card border-primary/20 hover:bg-primary/5 text-sm sm:text-base"
                  onClick={handleGoogleLogin}
                >
                  <svg
                    className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="hidden xs:inline">Continue with Google</span>
                  <span className="xs:hidden">Google</span>
                </Button>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="space-y-3 sm:space-y-4">
                <form
                  onSubmit={handleRegister}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="register-name"
                      className="text-xs sm:text-sm font-medium"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Dr. John Smith"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          name: e.target.value,
                        })
                      }
                      className="h-10 sm:h-11 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="register-email"
                      className="text-xs sm:text-sm font-medium"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="doctor@example.com"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      className="h-10 sm:h-11 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="register-password"
                      className="text-xs sm:text-sm font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                        className="h-10 sm:h-11 pr-10 text-sm sm:text-base"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-2 sm:px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label
                      htmlFor="register-confirm-password"
                      className="text-xs sm:text-sm font-medium"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="register-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={registerData.confirmPassword}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="h-10 sm:h-11 pr-10 text-sm sm:text-base"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-2 sm:px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-10 sm:h-11  bg-primary  hover:bg-secondary/90 text-secondary-foreground text-sm sm:text-base"
                  >
                    Create Account
                  </Button>
                </form>

                <div className="relative my-4 sm:my-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 sm:h-11 bg-card border-primary/20 hover:bg-primary/5 text-sm sm:text-base"
                  onClick={handleGoogleLogin}
                >
                  <svg
                    className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="hidden xs:inline">Continue with Google</span>
                  <span className="xs:hidden">Google</span>
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div className="flex flex-col items-center space-y-1.5 sm:space-y-2">
            <div className="bg-accent/10 border border-accent/20 rounded-full p-1.5 sm:p-2">
              <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
            </div>
            <span className="text-xs text-muted-foreground">Secure</span>
          </div>
          <div className="flex flex-col items-center space-y-1.5 sm:space-y-2">
            <div className="bg-primary/10 border border-primary/20 rounded-full p-1.5 sm:p-2">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Trusted</span>
          </div>
          <div className="flex flex-col items-center space-y-1.5 sm:space-y-2">
            <div className="bg-secondary/10 border border-secondary/20 rounded-full p-1.5 sm:p-2">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-secondary" />
            </div>
            <span className="text-xs text-muted-foreground">Reliable</span>
          </div>
        </div>
      </div>
      <OtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onFinalSubmit={onFinalSubmit}
        email={registerData?.email || ""}
      />
    </div>
  );
}
