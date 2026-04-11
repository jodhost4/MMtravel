import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, Zap, Star } from 'lucide-react';

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="card group cursor-pointer h-full flex flex-col transition-all duration-500 rounded-[2rem]"
      onClick={() => navigate('/booking', { state: { carId: car.id } })}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-5 left-5 bg-white dark:bg-zinc-800 shadow-lg px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-secondary dark:text-gray-300 z-10">
          {car.category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-black text-secondary dark:text-white mb-2 tracking-tight group-hover:text-primary transition-colors">{car.name}</h3>
            <div className="flex items-center space-x-4 text-xs font-bold text-gray-400 uppercase tracking-tighter">
              <span className="flex items-center"><Users className="w-4 h-4 mr-1.5 text-primary" /> {car.capacity} Seats</span>
              <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1.5 text-primary" /> {car.luggage} Bags</span>
            </div>
          </div>
          <div className="text-right ml-4">
            <span className="block text-2xl font-black text-secondary dark:text-white">₹{car.pricePerKm}</span>
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">per km</span>
          </div>
        </div>

        <div className="mb-8 space-y-3">
          {car.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-light mr-3" />
              {feature}
            </div>
          ))}
        </div>

        <button className="w-full btn btn-primary !rounded-2xl !py-4 transition-all group-hover:bg-secondary group-hover:shadow-none">
          Secure Ride
        </button>
      </div>
    </motion.div>
  );
};

export default CarCard;
