import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Navigation, Clock, User, Phone, Play, CheckCircle, ArrowLeft, Power, Globe } from 'lucide-react';
import MapView from '../../components/MapView';

const DriverDashboard = () => {
  const { user } = useAuth();
  const [activeRide, setActiveRide] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const assignedTrips = [
    {
      id: "T-88219",
      customer: "Amit Sharma",
      pickup: "Sector 21, Mall Road",
      drop: "Indira Gandhi Airport",
      time: "11:45 AM",
      status: "Assigned",
      coords: [
        { lat: 12.9716, lng: 77.5946, label: "Passenger" },
        { lat: 12.9352, lng: 77.6245, label: "Destination" }
      ]
    },
    {
      id: "T-88220",
      customer: "Sanya Gupta",
      pickup: "Greenfield Apartments",
      drop: "Corporate Park, Block B",
      time: "02:30 PM",
      status: "Pending",
      coords: [
        { lat: 12.9141, lng: 77.6413, label: "Passenger" },
        { lat: 12.9562, lng: 77.7011, label: "Destination" }
      ]
    }
  ];

  const handleStartRide = (tripId) => {
    if (!isOnline) {
      return toast.error("Please go ONLINE to start missions");
    }
    const trip = assignedTrips.find(t => t.id === tripId);
    setActiveRide(trip);
    toast.success('Journey initiated. Stay safe!');
  };

  const handleCompleteRide = () => {
    setActiveRide(null);
    toast.success('Mission accomplished! Earning recorded.');
  };

  const toggleStatus = () => {
    setIsOnline(!isOnline);
    toast.success(isOnline ? "Signed OFF duty" : "Back ONLINE! Awaiting missions", {
      icon: isOnline ? '📴' : '🌐',
      style: {
        borderRadius: '10px',
        background: isOnline ? '#333' : '#1e3a8a',
        color: '#fff',
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20 flex flex-col items-center">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div className="flex items-center space-x-6">
             <button 
                onClick={toggleStatus}
                className={`flex items-center space-x-3 px-6 py-4 rounded-3xl transition-all shadow-xl font-black uppercase tracking-widest text-xs ${
                  isOnline ? 'bg-primary text-white shadow-primary/20' : 'bg-gray-200 text-gray-500'
                }`}
              >
                <Power className={`w-5 h-5 ${isOnline ? 'animate-pulse' : ''}`} />
                <span>{isOnline ? 'Active' : 'Offline'}</span>
              </button>
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-secondary tracking-tight">Chauffeur Portal</h1>
              <div className="flex items-center space-x-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-primary animate-pulse' : 'bg-gray-300'}`} />
                <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">
                  Duty Status: {isOnline ? 'Active & Receiving Bookings' : 'Off Duty'}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <div className="bg-secondary px-8 py-6 rounded-3xl shadow-xl shadow-blue-900/10 flex items-center justify-between md:justify-start md:space-x-4">
              <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Today's Earnings</span>
              <span className="text-3xl font-black text-white">₹2,450</span>
            </div>
          </div>
        </div>

        {activeRide ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary p-10 md:p-14 rounded-[3rem] text-white shadow-2xl shadow-primary/20 relative overflow-hidden h-full flex flex-col"
                >
                  <div className="relative z-10 flex-grow">
                    <div className="flex items-center justify-between mb-10">
                      <div>
                        <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">Active Mission</span>
                        <h2 className="text-3xl md:text-4xl font-black mt-4 tracking-tight leading-tight">Deliver to {activeRide.drop}</h2>
                      </div>
                      <Navigation className="w-12 h-12 text-white/40 animate-bounce hidden md:block" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                      <div className="bg-black/20 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5">
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4">Passenger</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-white/10 p-3 rounded-2xl"><User className="w-6 h-6" /></div>
                            <span className="font-black text-xl">{activeRide.customer}</span>
                          </div>
                          <button className="bg-white text-primary p-4 rounded-2xl hover:bg-white/90 transition-all shadow-lg active:scale-95">
                            <Phone className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                      <div className="bg-black/20 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5">
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4">Route Info</p>
                        <div className="flex items-center space-x-4">
                          <div className="bg-white/10 p-3 rounded-2xl text-white"><MapPin className="w-6 h-6" /></div>
                          <span className="font-black text-xl line-clamp-1">{activeRide.pickup}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCompleteRide}
                      className="w-full bg-white text-primary btn !py-6 !rounded-[2rem] text-2xl font-black hover:shadow-2xl transition-all shadow-white/20 active:scale-95"
                    >
                      Complete Mission
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
                </motion.div>
            </div>

            <div className="lg:col-span-1 h-[600px]">
                <MapView markers={activeRide.coords} />
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            <h2 className="text-2xl font-black text-secondary border-l-8 border-primary pl-6 tracking-tight">Assignment Queue</h2>
            {!isOnline && (
              <div className="bg-blue-50 p-10 rounded-[2.5rem] text-center border-2 border-dashed border-primary/20">
                 <Globe className="w-16 h-16 text-primary mx-auto mb-6 opacity-40" />
                 <h3 className="text-2xl font-black text-secondary mb-2">Duty Sensor Offline</h3>
                 <p className="text-gray-500 font-bold">Toggle your status to ONLINE to start receiving premium travel requests.</p>
              </div>
            )}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-500 ${isOnline ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              {assignedTrips.map((trip) => (
                <motion.div
                  key={trip.id}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                >
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">ID: {trip.id}</span>
                      <span className="flex items-center text-xs font-black text-primary bg-primary/5 px-4 py-2 rounded-full tracking-widest">
                        <Clock className="w-4 h-4 mr-2" /> {trip.time}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-secondary mb-8 tracking-tight">{trip.customer}</h3>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary-light mt-1.5 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        <div>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Pick-up</p>
                          <p className="text-secondary font-bold text-lg">{trip.pickup}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Drop-off</p>
                          <p className="text-secondary font-bold text-lg">{trip.drop}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleStartRide(trip.id)}
                    className="w-full btn btn-secondary !py-5 !rounded-2xl flex items-center justify-center space-x-3 shadow-xl transition-all"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>Initiate Trip</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
