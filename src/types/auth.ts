/**
 * User registration form data type
 */
export type RegisterFormData = {
    name: string;
    email: string;
    phone: string;
};

/**
 * Login form data type
 */
export type LoginFormData = {
    phone: string;
};

/**
 * OTP verification form data type
 */
export type OTPVerificationData = {
    phone: string;
    otp: string;
};

/**
 * API response type for authentication endpoints
 */
export type AuthResponse = {
    message?: string;
    error?: string;
    token?: string;
};

/**
 * Authentication state type
 */
export type AuthState = {
    isAuthenticated: boolean;
    token: string | null;
    loading: boolean;
    error: string | null;
}; 