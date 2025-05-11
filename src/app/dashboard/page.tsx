"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/");
            return;
        }

        // Fetch user data from backend
        fetch("http://localhost:5001/api/user", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Unauthorized");
            }
            return response.json();
        })
        .then(data => {
            setUser(data);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            localStorage.removeItem("token");
            router.push("/");
        });
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-8">
                            {/* Logo/Brand */}
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Dashboard
                                </h1>
                            </div>

                            {/* Main navigation links with dropdowns */}
                            <div className="hidden md:flex space-x-1">
                                {/* Score */}
                                <div className="relative group">
                                    <button className="group px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-indigo-50 flex items-center space-x-2">
                                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        <span className="text-gray-700 group-hover:text-indigo-600">Score</span>
                                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="py-1">
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">View Score</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Score History</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Score Factors</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Reports */}
                                <div className="relative group">
                                    <button className="group px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50 flex items-center space-x-2">
                                        <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="text-gray-700 group-hover:text-blue-600">Reports</span>
                                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="py-1">
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Credit Report</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Report History</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Disputes</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Cards */}
                                <div className="relative group">
                                    <button className="group px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-purple-50 flex items-center space-x-2">
                                        <svg className="h-5 w-5 text-purple-500 group-hover:text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        <span className="text-gray-700 group-hover:text-purple-600">Cards</span>
                                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="py-1">
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">My Cards</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">Apply New</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">Compare</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Loans */}
                                <div className="relative group">
                                    <button className="group px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-green-50 flex items-center space-x-2">
                                        <svg className="h-5 w-5 text-green-500 group-hover:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-700 group-hover:text-green-600">Loans</span>
                                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="py-1">
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">Active Loans</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">Apply Loan</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600">Calculator</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Tips */}
                                <div className="relative group">
                                    <button className="group px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-amber-50 flex items-center space-x-2">
                                        <svg className="h-5 w-5 text-amber-500 group-hover:text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span className="text-gray-700 group-hover:text-amber-600">Tips</span>
                                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="py-1">
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600">Articles</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600">Videos</a>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600">FAQs</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Notifications bell with badge */}
                            <button className="relative p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                            </button>

                            {/* User profile dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-3 focus:outline-none"
                                >
                                    <div className="relative">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-lg shadow-lg">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white"></div>
                                    </div>
                                    <span className="hidden md:block text-gray-700 font-medium">{user.name}</span>
                                    <svg
                                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "transform rotate-180" : ""}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 ring-1 ring-black ring-opacity-5">
                                        <div className="px-4 py-2 border-b">
                                            <p className="text-sm text-gray-700 truncate">{user.email}</p>
                                            <p className="text-sm text-gray-500 truncate">{user.phone}</p>
                                        </div>
                                        <button
                                            onClick={() => {/* TODO: Implement edit profile */}}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                                        >
                                            Edit Profile
                                        </button>
                                        <button
                                            onClick={() => {/* TODO: Implement change email */}}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                                        >
                                            Change Email
                                        </button>
                                        <button
                                            onClick={() => {/* TODO: Implement change phone */}}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                                        >
                                            Change Phone
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t transition-colors duration-150"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                        <p className="text-gray-500 text-xl">
                            Welcome to your dashboard!
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
} 