import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { MapPin, Navigation2, Calendar, Clock, Car, MessageCircle, ChevronRight, CheckCircle2 } from 'lucide-react';
import { CARS } from '../../data/dummyData';
import MapView from '../MapView';

const QuickBooking = ({ user, onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    date: '',
    time: '',
  });

  const mockMarkers = [
    { lat: 12.9716, lng: 77.5946, label: "Pickup: " + (formData.pickup || 'Point A') },
    { lat: 12.9352, lng: 77.6245, label: "Drop: " + (formData.drop || 'Point B') }
  ];

  const handleConfirm = () => {
    if (!selectedCar) return toast.error("Please select a vehicle");
    
    const toastId = toast.loading('Confirming reservation...');
    
    setTimeout(() => {
      toast.success('Booking Successful!', { id: toastId });
      
      // Construct WhatsApp message
      const message = `🚗 *MM Travels Booking Confirmed!*%0A%0A*Car:* ${selectedCar.name}%0A*Driver:* Vikram Sethi%0A*Pickup:* ${formData.pickup}%0A*Drop:* ${formData.drop}%0A*Schedule:* ${formData.date} at ${formData.time}%0A%0A_Sent via User Dashboard_`;
      const whatsappUrl = `https://wa.me/${user?.phone || ''}?text=${message}`;
      
      window.open(whatsappUrl, '_blank');
      if (onComplete) onComplete();
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-gray-100 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-secondary tracking-tight flex items-center">
            <Car className="w-6 h-6 mr-3 text-primary" /> Quick Booking
        </h2>
        <span className="bg-primary/10 text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
            Step {step} of 2
        </span>
      </div>

      <div className="space-y-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {step === 1 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-5">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Pick-up</label>
                    <div className="relative">
                        <Navigation2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        <input 
                            type="text" 
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Enter pickup point"
                            value={formData.pickup}
                            onChange={(e) => setFormData({...formData, pickup: e.target.value})}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Drop-off</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        <input 
                            type="text" 
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Enter destination"
                            value={formData.drop}
                            onChange={(e) => setFormData({...formData, drop: e.target.value})}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Date</label>
                        <input 
                            type="date" 
                            className="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20"
                            value={formData.date}
                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Time</label>
                        <input 
                            type="time" 
                            className="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20"
                            value={formData.time}
                            onChange={(e) => setFormData({...formData, time: e.target.value})}
                        />
                    </div>
                </div>
            </div>

            <div className="h-48 rounded-2xl overflow-hidden border border-gray-100">
                <MapView markers={mockMarkers} />
            </div>

            <button 
                onClick={() => {
                    if (!formData.pickup || !formData.drop || !formData.date || !formData.time) {
                        return toast.error("All fields required");
                    }
                    setStep(2);
                }}
                className="w-full btn btn-primary !py-4 rounded-2xl flex items-center justify-center space-x-2"
            >
                <span>Select Vehicle</span>
                <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {CARS.slice(0, 3).map((car) => (
                <div 
                    key={car.id}
                    onClick={() => setSelectedCar(car)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center space-x-4 ${
                        selectedCar?.id === car.id ? 'border-primary bg-primary/5 shadow-lg' : 'border-gray-100 hover:border-primary/20'
                    }`}
                >
                    <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0">
                        <img src={car.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                        <h4 className="font-black text-secondary">{car.name}</h4>
                        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">₹{car.pricePerKm}/km</p>
                    </div>
                    {selectedCar?.id === car.id && <CheckCircle2 className="w-5 h-5 text-primary" />}
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-4">
                <button 
                    onClick={handleConfirm}
                    className="w-full btn bg-green-500 hover:bg-green-600 !py-4 rounded-2xl text-white flex items-center justify-center space-x-3 shadow-xl shadow-green-500/20"
                >
                    <MessageCircle className="w-5 h-5" />
                    <span>Confirm & WhatsApp</span>
                </button>
                <button 
                    onClick={() => setStep(1)}
                    className="w-full py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-secondary text-center"
                >
                    Back to Details
                </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QuickBooking;
