"use client";

import { useState } from "react";
import Register from "@/components/Register";
import Login from "@/components/Login";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-classic">
      <div className="max-w-md mx-auto pt-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          {isLogin ? (
            <Login onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <Register onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </main>
  );
}
