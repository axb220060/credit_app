
"use client";

import { useState } from "react";
import { RegisterFormData } from "@/types/auth";
import * as authService from "@/services/auth";

interface RegisterProps {
    onSwitchToLogin: () => void;
}

export default function Register({ onSwitchToLogin }: RegisterProps) {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: "",
        email: "",
        phone: "",
    });
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await authService.register(formData);
            if (response.error) {
                setError(response.error);
            } else {
                setSuccess(response.message || "Registration successful!");
                setFormData({ name: "", email: "", phone: "" });
            }
        } catch (err) {
            setError("An error occurred during registration");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md">
                        {success}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-md py-3 px-4 text-gray-900
                                     focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:ring-opacity-10
                                     outline-none transition-all duration-200"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full border border-gray-300 rounded-md py-3 px-4 text-gray-900
                                     focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:ring-opacity-10
                                     outline-none transition-all duration-200"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

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
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md
                             hover:bg-indigo-700 transition-colors duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <div className="text-center mt-6">
                    <p className="text-gray-600">Already have an account?</p>
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-indigo-600 hover:text-indigo-800 font-medium mt-2"
                    >
                        Login here
                    </button>
                </div>
            </form>
        </div>
    );
} 