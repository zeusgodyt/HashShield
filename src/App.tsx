import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import TabContainer from "./components/TabContainer";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from "./components/Toast/ToastContainer";
import { ToastProvider } from "./context/ToastContext";

function App() {
  const [activeTab, setActiveTab] = useState<"generate" | "verify">("generate");

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <div className="container mx-auto px-4 py-8 max-w-5xl">
            <header className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  HashShield
                </h1>
                <ThemeToggle />
              </div>
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  className={`py-3 px-6 font-medium text-sm transition-colors duration-200 ${
                    activeTab === "generate"
                      ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("generate")}
                >
                  Generate Hash
                </button>
                <button
                  className={`py-3 px-6 font-medium text-sm transition-colors duration-200 ${
                    activeTab === "verify"
                      ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                  onClick={() => setActiveTab("verify")}
                >
                  Verify Hash
                </button>
              </div>
            </header>

            <main className="mb-8">
              <TabContainer activeTab={activeTab} />
            </main>

            <Footer />
          </div>
          <ToastContainer />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default App;
