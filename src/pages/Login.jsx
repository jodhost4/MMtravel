import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Mail, Lock, ArrowRight, Car, User, ShieldAlert, ArrowLeft } from 'lucide-react';

const Login = ({ role }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (email && password) {
        const dummyUser = {
          id: Math.floor(Math.random() * 1000),
          email,
          phone: phone,
          role: role,
          name: email.split('@')[0],
        };
        const dummyToken = 'dummy-jwt-token-' + Date.now();
        
        login(dummyUser, dummyToken);
        toast.success(`Welcome back, ${dummyUser.name}!`);
        
        const origin = location.state?.from?.pathname || `/${role}/dashboard`;
        navigate(origin);
      } else {
        toast.error('Required credentials missing');
      }
    } catch (error) {
      toast.error('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'driver': return <Car className="w-10 h-10 text-primary" />;
      case 'admin': return <ShieldAlert className="w-10 h-10 text-primary" />;
      default: return <User className="w-10 h-10 text-primary" />;
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'driver': return 'Chauffeur Portal';
      case 'admin': return 'Fleet Management';
      default: return 'Client Login';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 py-12 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-10 md:p-14">
          <Link to="/" className="inline-flex items-center text-sm font-black text-gray-400 hover:text-primary mb-8 transition-all group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Site
          </Link>

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-5 bg-blue-50 rounded-[1.5rem] mb-8 shadow-inner">
              {getRoleIcon()}
            </div>
            <h2 className="text-4xl font-black text-secondary tracking-tight">{getRoleTitle()}</h2>
            <p className="text-gray-400 mt-2 font-medium">Access your premium dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-5 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-bold text-secondary outline-none"
                  placeholder="name@email.com"
                  required
                />
              </div>
            </div>

            {role === 'user' && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Phone Number (for WhatsApp)</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-14 pr-5 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-bold text-secondary outline-none"
                    placeholder="+91..."
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Secure Password</label>
                <a href="#" className="text-xs font-black text-primary hover:underline">RECOVER?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-5 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-bold text-secondary outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary !py-5 !rounded-2xl text-lg flex items-center justify-center space-x-3 disabled:opacity-70"
            >
              <span>{loading ? 'Verifying...' : 'Sign In'}</span>
              {!loading && <ArrowRight className="w-6 h-6" />}
            </button>
          </form>

          {role === 'user' && (
            <div className="mt-12 text-center pt-10 border-t border-gray-100 text-gray-400 font-bold">
              New to MM Travels?{' '}
              <Link to="/user/register" className="text-primary hover:underline transition-all">
                JOIN TODAY
              </Link>
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-[10px] font-black text-gray-300 tracking-widest uppercase items-center">
            {role !== 'user' && <Link to="/user/login" className="hover:text-primary">USER</Link>}
            <span className="w-1 h-1 rounded-full bg-gray-200" />
            {role !== 'driver' && <Link to="/driver/login" className="hover:text-primary">DRIVER</Link>}
            <span className="w-1 h-1 rounded-full bg-gray-200" />
            {role !== 'admin' && <Link to="/admin/login" className="hover:text-primary">ADMIN</Link>}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
