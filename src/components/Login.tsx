
"use client";

import { useState } from "react";
import { LoginFormData, OTPVerificationData } from "@/types/auth";
import * as authService from "@/services/auth";
import { useRouter } from "next/navigation";

interface LoginProps {
    onSwitchToRegister: () => void;
}

export default function Login({ onSwitchToRegister }: LoginProps) {
    const router = useRouter();
    const [phone, setPhone] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [otpSent, setOtpSent] = useState<boolean>(false);
    const [showOTP, setShowOTP] = useState<boolean>(false);

    const handleSendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await authService.sendOTP({ phone });
            if (response.error) {
                setError(response.error);
            } else {
                setOtpSent(true);
                setShowOTP(true);
            }
        } catch (err) {
            setError("An error occurred while sending OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await authService.verifyOTP({ phone, otp });
            if (response.error) {
                setError(response.error);
            } else if (response.token) {
                localStorage.setItem("token", response.token);
                router.push("/dashboard"); 
            }
        } catch (err) {
            setError("An error occurred while verifying OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                Login to Your Account
            </h2>

            <form onSubmit={showOTP ? handleVerifyOTP : handleSendOTP} className="space-y-6">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-1">
                        Phone Number
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        className="w-full border border-gray-300 rounded-md py-3 px-4 text-gray-900
                                 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:ring-opacity-10
                                 outline-none transition-all duration-200"
                        placeholder="Phone Number (+1234567890)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                {showOTP && (
                    <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-800 mb-1">
                            OTP
                        </label>
                        <input
                            id="otp"
                            name="otp"
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-md py-3 px-4 text-gray-900
                                     focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:ring-opacity-10
                                     outline-none transition-all duration-200"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md
                             hover:bg-indigo-700 transition-colors duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading
                        ? (showOTP ? "Verifying..." : "Sending OTP...")
                        : (showOTP ? "Verify OTP" : "Send OTP")}
                </button>

                {showOTP && (
                    <button
                        type="button"
                        onClick={() => {
                            setShowOTP(false);
                            setOtp("");
                            setError("");
                        }}
                        className="w-full text-indigo-600 hover:text-indigo-800 font-medium text-center mt-2"
                    >
                        Change Phone Number
                    </button>
                )}

                <div className="text-center mt-6">
                    <p className="text-gray-600">Don't have an account?</p>
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="text-indigo-600 hover:text-indigo-800 font-medium mt-2"
                    >
                        Register here
                    </button>
                </div>
            </form>
        </div>
    );
} 