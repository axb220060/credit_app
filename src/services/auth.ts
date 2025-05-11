import { RegisterFormData, LoginFormData, OTPVerificationData, AuthResponse } from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export const register = async (data: RegisterFormData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
};

export const sendOTP = async (data: LoginFormData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/login/send-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
};

export const verifyOTP = async (data: OTPVerificationData): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/login/verify-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
};