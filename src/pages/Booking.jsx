import { MapPin, Calendar, Clock, Car, ChevronRight, CheckCircle2, Navigation2, ArrowLeft, MessageCircle } from 'lucide-react';
import { CARS } from '../data/dummyData';
import MapView from '../components/MapView';
import { useAuth } from '../context/AuthContext';

const Booking = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState(null);
  const [step, setStep] = useState(1);
  const [assignedDriver, setAssignedDriver] = useState({ name: 'Vikram Sethi', phone: '9876543210' });
  const [formData, setFormData] = useState({
    pickup: '',
    drop: '',
    date: '',
    time: '',
  });

  // Mock coordinates for the map
  const mockMarkers = [
    { lat: 12.9716, lng: 77.5946, label: "Pickup: " + formData.pickup || 'Select Point' },
    { lat: 12.9352, lng: 77.6245, label: "Drop: " + formData.drop || 'Destination' }
  ];

  useEffect(() => {
    if (location.state?.carId) {
      const car = CARS.find(c => c.id === location.state.carId);
      if (car) setSelectedCar(car);
    }
    window.scrollTo(0, 0);
  }, [location.state]);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedCar) return toast.error('Please select a vehicle');
    
    const toastId = toast.loading('Confirming reservation...');
    
    setTimeout(() => {
      toast.success('Reservation confirmed!', { id: toastId });
      setStep(3);
    }, 1500);
  };

  const sendWhatsAppConfirmation = () => {
    const userPhone = user?.phone || '';
    const message = `🚗 *MM Travels Booking Confirmed!*%0A%0A*Reference:* #MMT-948271%0A*Car:* ${selectedCar?.name}%0A*Driver:* ${assignedDriver.name}%0A*Pickup:* ${formData.pickup}%0A*Drop:* ${formData.drop}%0A*Schedule:* ${formData.date} at ${formData.time}%0A%0A_Thank you for choosing MM Travels!_`;
    
    const whatsappUrl = `https://wa.me/${userPhone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4 sm:px-6 lg:py-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Progress Stepper - Responsive */}
        <div className="flex items-center justify-between mb-16 px-4 md:px-0 max-w-sm mx-auto">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center flex-1 last:flex-none">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black transition-all duration-500 z-10 ${
                step >= num ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-110' : 'bg-white dark:bg-zinc-800 text-gray-300 dark:text-gray-600 border-2 border-gray-100 dark:border-white/5'
              }`}>
                {step > num ? <CheckCircle2 className="w-6 h-6" /> : num}
              </div>
              {num < 3 && (
                <div className={`flex-1 h-1.5 mx-2 rounded-full transition-all duration-500 ${step > num ? 'bg-primary' : 'bg-gray-100'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className={`${step === 3 ? 'lg:col-span-12' : 'lg:col-span-12'}`}>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl p-8 md:p-16 border border-gray-50 dark:border-white/5"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <div>
                    <div className="mb-10 text-center md:text-left">
                      <h2 className="text-3xl md:text-4xl font-black text-secondary dark:text-white tracking-tight">Trip Details</h2>
                      <p className="text-gray-400 font-medium mt-2">Enter your travel coordinates</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1 flex items-center">
                          <Navigation2 className="w-4 h-4 text-primary mr-2" /> From
                        </label>
                        <input
                          type="text"
                          value={formData.pickup}
                          onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                          className="w-full px-8 py-4 bg-gray-50 dark:bg-black border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-bold text-secondary dark:text-white outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
                          placeholder="Pickup address"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1 flex items-center">
                          <MapPin className="w-4 h-4 text-primary mr-2" /> To
                        </label>
                        <input
                          type="text"
                          value={formData.drop}
                          onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                          className="w-full px-8 py-4 bg-gray-50 dark:bg-black border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-bold text-secondary dark:text-white outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
                          placeholder="Destination"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1 flex items-center">
                          <Calendar className="w-4 h-4 text-primary mr-2" /> Date
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-8 py-4 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-bold text-secondary outline-none"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1 flex items-center">
                          <Clock className="w-4 h-4 text-primary mr-2" /> Time
                        </label>
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full px-8 py-4 bg-gray-50 dark:bg-black border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-bold text-secondary dark:text-white outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        if (!formData.pickup || !formData.drop || !formData.date || !formData.time) {
                          return toast.error('Required fields are missing');
                        }
                        setStep(2);
                      }}
                      className="w-full btn btn-primary !py-5 !rounded-2xl text-lg flex items-center justify-center space-x-3 shadow-xl shadow-primary/20"
                    >
                      <span>Continue to Vehicles</span>
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="h-[400px] lg:h-full min-h-[400px]">
                    <MapView markers={mockMarkers} />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-10"
              >
                <div className="lg:col-span-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <h2 className="text-3xl md:text-4xl font-black text-secondary dark:text-white tracking-tight">Select Vehicle</h2>
                    <button 
                      onClick={() => setStep(1)}
                      className="flex items-center text-primary font-black hover:text-black transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" /> Modify Trip
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6 mb-12">
                    {CARS.map((car) => (
                      <div
                        key={car.id}
                        onClick={() => setSelectedCar(car)}
                        className={`cursor-pointer transition-all duration-500 rounded-[2.5rem] p-6 md:p-8 border-4 flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-zinc-900 relative overflow-hidden ${
                          selectedCar?.id === car.id 
                            ? 'border-primary shadow-2xl scale-[1.01]' 
                            : 'border-transparent shadow-md hover:shadow-xl opacity-80 hover:opacity-100 dark:border-white/5'
                        }`}
                      >
                        <div className="w-full md:w-32 h-24 md:h-24 rounded-2xl overflow-hidden shrink-0">
                          <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                          <h3 className="text-xl font-black text-secondary dark:text-white">{car.name}</h3>
                          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">
                            {car.category} • {car.capacity} Seats
                          </p>
                        </div>
                        <div className="text-center md:text-right shrink-0">
                          <p className="text-2xl font-black text-primary">₹{car.pricePerKm}</p>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">/km</p>
                        </div>
                        {selectedCar?.id === car.id && (
                          <div className="absolute top-4 right-4 bg-primary text-white p-1 rounded-full shadow-lg">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleBooking}
                    className="w-full btn btn-black !py-6 !rounded-[2rem] text-xl flex items-center justify-center space-x-4 shadow-2xl hover:bg-primary transition-all"
                  >
                    <Car className="w-7 h-7" />
                    <span>Confirm Booking</span>
                  </button>
                </div>

                <div className="lg:col-span-1 border border-gray-100 dark:border-white/10 rounded-[2.5rem] overflow-hidden bg-white dark:bg-zinc-900 p-2">
                   <div className="h-full min-h-[600px]">
                      <MapView markers={mockMarkers} />
                   </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl p-10 md:p-20 text-center border border-gray-50 dark:border-white/10"
              >
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </div>
                 <h2 className="text-4xl md:text-5xl font-black text-secondary dark:text-white mb-6 tracking-tight">Booking Secured</h2>
                <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-sm mx-auto font-medium">
                  Excellent! Your premium ride has been reserved. Track your mission in the dashboard.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                   <div className="bg-gray-50 rounded-[2rem] p-10 text-left border border-gray-100">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Reference ID</span>
                        <span className="font-black text-secondary">#MMT-948271</span>
                      </div>
                      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Assigned Vehicle</span>
                        <span className="font-black text-secondary dark:text-white">{selectedCar?.name || 'Innova Crysta'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Schedule</span>
                        <span className="font-black text-secondary dark:text-white">{formData.date} | {formData.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-[300px] md:h-full">
                    <MapView markers={mockMarkers} />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <button
                    onClick={sendWhatsAppConfirmation}
                    className="flex-1 btn bg-green-500 hover:bg-green-600 !py-5 rounded-2xl font-black text-white flex items-center justify-center space-x-3 shadow-xl shadow-green-500/20"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp Confirm</span>
                  </button>
                  <button
                    onClick={() => navigate('/user/dashboard')}
                    className="flex-1 btn btn-primary !py-5 rounded-2xl font-black shadow-primary/20"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 border-2 border-gray-100 text-secondary py-5 rounded-2xl font-black hover:bg-gray-50 transition-all text-sm"
                  >
                    Home
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
