import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import CourseExplorer from './components/CourseExplorer'
import AdminPanel from './components/AdminPanel'

function Navigation() {
    const location = useLocation()

    return (
        <nav className="bg-gray-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold -ml-14">Course Explorer</h1>
                    </div>
                    <div className="flex space-x-4">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/'
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            aria-label="Navigate to courses"
                        >
                            Courses
                        </Link>
                        <Link
                            to="/admin"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/admin'
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            aria-label="Navigate to admin panel"
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Navigation />
                <Routes>
                    <Route path="/" element={<CourseExplorer />} />
                    <Route path="/admin" element={<AdminPanel />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
