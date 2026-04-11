import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Car, MapPin, Clock, Calendar, ChevronRight, Activity, History, ArrowRight, X } from 'lucide-react';
import MapView from '../../components/MapView';
import QuickBooking from '../../components/dashboard/QuickBooking';

const UserDashboard = () => {
  const { user } = useAuth();
  const [isBookingMode, setIsBookingMode] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dummyBookings = [
    {
      id: "MMT-948271",
      car: "Toyota Innova Crysta",
      pickup: "City Airport, Terminal 2",
      drop: "Downtown Business Center",
      date: "2026-04-12",
      time: "10:30 AM",
      status: "Upcoming",
      price: "₹850",
      coords: [
        { lat: 12.9716, lng: 77.5946, label: "Airport" },
        { lat: 12.9352, lng: 77.6245, label: "Destination" }
      ]
    },
    {
      id: "MMT-948265",
      car: "Maruti Suzuki Swift",
      pickup: "Sector 45, Green Park",
      drop: "Railway Station",
      date: "2026-04-08",
      time: "08:15 AM",
      status: "Completed",
      price: "₹320",
      coords: [
        { lat: 12.9242, lng: 77.6721, label: "Green Park" },
        { lat: 12.9781, lng: 77.5712, label: "Station" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20 flex flex-col items-center overflow-x-hidden">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-secondary tracking-tight">
              Welcome back, <span className="text-primary">{user?.name || 'Client'}</span>
            </h1>
            <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-xs">Premium Membership: Active</p>
          </div>
          <button 
            onClick={() => setIsBookingMode(!isBookingMode)}
            className={`btn !rounded-2xl !py-4 !px-10 text-sm shadow-xl transition-all flex items-center space-x-3 ${
                isBookingMode ? 'bg-secondary text-white' : 'btn-primary shadow-primary/20'
            }`}
          >
            {isBookingMode ? (
                <>
                    <X className="w-5 h-5" />
                    <span>Cancel Reservation</span>
                </>
            ) : (
                <>
                    <Car className="w-5 h-5" />
                    <span>Secure New Reservation</span>
                </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-10 order-2 lg:order-1">
            <section>
              <div className="flex items-center justify-between mb-8 px-2">
                <h2 className="text-2xl font-black text-secondary flex items-center">
                  <History className="w-6 h-6 mr-3 text-primary" /> Journey History
                </h2>
                <button className="text-primary font-black text-xs uppercase tracking-widest hover:underline">Full Log</button>
              </div>

              <div className="space-y-6">
                {dummyBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    whileHover={{ x: 5 }}
                    className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex items-start md:items-center space-x-6">
                      <div className="bg-blue-50 p-4 rounded-2xl hidden md:flex items-center justify-center shrink-0">
                        <Car className="text-primary w-8 h-8" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="font-black text-xl text-secondary">{booking.car}</span>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            booking.status === 'Upcoming' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm font-semibold text-gray-500">
                            <MapPin className="w-4 h-4 mr-2 text-primary shrink-0" /> 
                            <span className="truncate max-w-[200px] md:max-w-none">{booking.pickup} → {booking.drop}</span>
                          </div>
                          <div className="flex items-center text-sm font-bold text-gray-400">
                            <Calendar className="w-4 h-4 mr-2 shrink-0" /> {booking.date} <Clock className="w-4 h-4 mx-2 shrink-0" /> {booking.time}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-8 flex items-center justify-between md:flex-col md:items-end md:justify-center shrink-0">
                      <span className="text-2xl font-black text-secondary">{booking.price}</span>
                      <button className="text-primary font-black text-xs uppercase tracking-widest hover:text-black transition-colors flex items-center mt-2">
                        Inspect <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column - Switches between Tracking and Quick Booking */}
          <div className="lg:col-span-1 space-y-10 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              {isBookingMode ? (
                <QuickBooking 
                  key="booking-widget" 
                  user={user} 
                  onComplete={() => setIsBookingMode(false)} 
                />
              ) : (
                <motion.section 
                  key="tracking-widget"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-secondary p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/10 min-h-[700px] flex flex-col"
                >
                  <h3 className="text-xl font-black mb-8 flex items-center text-white tracking-tight">
                    <Activity className="w-5 h-5 mr-3 text-primary-light" /> Live Intelligence
                  </h3>
                  
                  <div className="flex-grow min-h-[300px] mb-8">
                    <MapView markers={dummyBookings[0].coords} />
                  </div>

                  <div className="relative">
                    <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-primary-light border-4 border-primary/50 z-10" />
                        <p className="font-black text-white text-sm">Pick-up Confirmed</p>
                        <p className="text-xs text-gray-400 mt-1 font-medium italic">Chauffeur arrived at site</p>
                      </div>
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-gray-700 z-10 animate-pulse border-4 border-primary/20" />
                        <p className="font-black text-gray-500 text-sm">In Transit</p>
                      </div>
                    </div>

                    <div className="mt-12 p-5 bg-white/5 rounded-2xl border border-white/5 flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary-light object-cover flex items-center justify-center font-black text-secondary">RK</div>
                      <div>
                        <p className="font-black text-white text-sm">Rajesh Kumar</p>
                        <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest mt-1">White Swift • KA 01 HH 1234</p>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
