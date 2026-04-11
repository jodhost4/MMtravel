import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  Users, 
  Car, 
  BarChart3, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  UserPlus, 
  Filter,
  MoreVertical,
  Menu,
  X
} from 'lucide-react';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('bookings');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { label: 'Active Bookings', value: '1,284', icon: CheckCircle2, color: 'text-primary', bg: 'bg-blue-50' },
    { label: 'Fleet Online', value: '42', icon: Car, color: 'text-secondary', bg: 'bg-gray-100' },
    { label: 'Verified Clients', value: '3,842', icon: Users, color: 'text-primary', bg: 'bg-blue-50' },
    { label: 'Net Revenue', value: '₹4.2L', icon: BarChart3, color: 'text-secondary', bg: 'bg-gray-100' }
  ];

  const bookings = [
    { id: '#MMT-948271', user: 'Amit Sharma', driver: 'Rajesh K.', route: 'Airport → Downtown', status: 'In Progress', type: 'SUV' },
    { id: '#MMT-948265', user: 'Sanya Gupta', driver: 'Not Assigned', route: 'Green Park → Station', status: 'Pending', type: 'Sedan' },
    { id: '#MMT-948260', user: 'Vikram Singh', driver: 'Sunil V.', route: 'Mall Road → Corporate Park', status: 'Completed', type: 'Mini' }
  ];

  const handleAssignDriver = (id) => {
    toast.success(`Opening assignment protocol for ${id}`);
  };

  const navItems = [
    { id: 'bookings', label: 'All Reservations', icon: CheckCircle2 },
    { id: 'drivers', label: 'Fleet Logistics', icon: Car },
    { id: 'users', label: 'Client Management', icon: Users },
    { id: 'stats', label: 'Financial Data', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-secondary p-4 flex justify-between items-center sticky top-0 z-[60]">
        <div className="flex items-center space-x-2">
          <div className="bg-primary p-2 rounded-lg">
            <Car className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-black text-white">ADMIN<span className="text-primary-light">PRO</span></span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white bg-white/10 rounded-xl">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen bg-secondary border-r border-gray-800 p-8 flex flex-col transition-transform duration-300 z-50 lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0 w-full md:w-80' : '-translate-x-full w-80'
      }`}>
        <div className="hidden lg:flex items-center space-x-3 mb-16 px-2">
          <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/20">
            <Car className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">ADMIN<span className="text-primary-light italic">PRO</span></span>
        </div>

        <nav className="flex-grow space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                selectedTab === item.id 
                  ? 'bg-primary text-white shadow-2xl shadow-primary/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${selectedTab === item.id ? 'text-white' : 'text-primary'}`} />
              <span className="text-sm uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-800">
          <div className="bg-white/5 p-6 rounded-[1.5rem] flex items-center space-x-4 border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center text-secondary font-black text-lg">AD</div>
            <div className="flex-grow">
              <p className="text-sm font-black text-white leading-none">System Admin</p>
              <p className="text-[10px] text-gray-500 mt-2 font-black uppercase tracking-widest">Master Control</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 lg:p-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-secondary tracking-tight">Fleet Intelligence</h2>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2">Real-time operational overview</p>
            </div>
            <button className="btn btn-primary !rounded-2xl !py-3 !px-8 text-sm flex items-center space-x-3">
              <UserPlus className="w-5 h-5" />
              <span>Enroll New Driver</span>
            </button>
          </div>

          {/* Stats Grid - Responsive Padding */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group"
              >
                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black text-secondary mt-2 tracking-tighter">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Data Visualization / Tables */}
          <section className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl overflow-hidden">
            <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-black text-secondary tracking-tight">Active Duty Log</h3>
                <p className="text-xs text-gray-400 font-black uppercase tracking-widest mt-1">Live monitoring of all reserved units</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:w-auto">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select className="appearance-none pl-10 pr-10 py-3 bg-gray-50 border-none rounded-2xl text-xs font-black uppercase tracking-widest text-secondary focus:ring-4 focus:ring-primary/10 transition-all outline-none w-full">
                    <option>All Operations</option>
                    <option>En Route</option>
                    <option>Awaiting Mission</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Identity / ID</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Deployment Route</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Assigned Unit</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Operational Status</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Menu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map((booking, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-10 py-8">
                        <p className="font-black text-secondary text-lg">{booking.user}</p>
                        <p className="text-[10px] text-gray-300 font-black uppercase tracking-tighter mt-1">{booking.id}</p>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center space-x-3 text-sm font-black text-secondary">
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          <span>{booking.route}</span>
                        </div>
                        <span className="text-[9px] bg-secondary text-white px-2.5 py-1 rounded-lg font-black uppercase tracking-widest mt-2 block w-fit shadow-lg shadow-secondary/20">{booking.type}</span>
                      </td>
                      <td className="px-10 py-8 text-center md:text-left">
                        {booking.driver === 'Not Assigned' ? (
                          <button 
                            onClick={() => handleAssignDriver(booking.id)}
                            className="text-[10px] font-black text-white flex items-center bg-red-500 px-4 py-2.5 rounded-xl hover:bg-black transition-all shadow-xl shadow-red-500/10 uppercase tracking-widest"
                          >
                            <AlertCircle className="w-4 h-4 mr-2" /> Assign Now
                          </button>
                        ) : (
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary flex items-center justify-center font-black text-sm border border-blue-100">{booking.driver.charAt(0)}</div>
                            <span className="text-sm font-black text-secondary uppercase tracking-tighter">{booking.driver}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-10 py-8">
                        <span className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase border-2 ${
                          booking.status === 'In Progress' ? 'border-primary bg-primary/5 text-primary' : 
                          booking.status === 'Pending' ? 'border-secondary bg-secondary/5 text-secondary' : 
                          'border-gray-100 bg-gray-50 text-gray-400'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <button className="text-gray-300 hover:text-secondary p-3 rounded-2xl transition-all hover:bg-gray-100">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-10 border-t border-gray-50 text-center bg-gray-50/30">
              <button className="text-primary font-black text-xs uppercase tracking-widest hover:text-secondary transition-colors underline decoration-2 underline-offset-8">Explore Diagnostic Records</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
