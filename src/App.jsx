import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/Dashboard/UserDashboard';
import DriverDashboard from './pages/Dashboard/DriverDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col transition-colors duration-300 dark:bg-black dark:text-white">
            <Toaster position="top-center" />
          <Navbar />
          <WhatsAppWidget />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/user/login" element={<Login role="user" />} />
              <Route path="/user/register" element={<Register />} />
              <Route path="/driver/login" element={<Login role="driver" />} />
              <Route path="/admin/login" element={<Login role="admin" />} />

              {/* Protected Routes */}
              <Route 
                path="/booking" 
                element={
                  <ProtectedRoute allowedRoles={['user']}>
                    <Booking />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/user/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['user']}>
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/driver/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['driver']}>
                    <DriverDashboard />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
