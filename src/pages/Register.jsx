import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { User, Mail, Lock, Phone, ArrowRight, ArrowLeft } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return toast.error('Check your passwords again');
    }

    setLoading(true);

    try {
      const dummyUser = {
        id: Math.floor(Math.random() * 1000),
        email: formData.email,
        phone: formData.phone,
        role: 'user',
        name: formData.name,
      };
      const dummyToken = 'dummy-jwt-token-' + Date.now();
      
      login(dummyUser, dummyToken);
      toast.success('Your journey starts now!');
      navigate('/user/dashboard');
    } catch (error) {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-50 md:py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full"
      >
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-10 md:p-16">
          <Link to="/" className="inline-flex items-center text-sm font-black text-gray-400 hover:text-primary mb-10 transition-all group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Home
          </Link>

          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-secondary mb-4 tracking-tight">Create Account</h2>
            <p className="text-gray-400 font-medium">Join our premier travel network</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-14 pr-5 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-bold text-secondary outline-none"
                    placeholder="Enter name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-14 pr-5 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-bold text-secondary outline-none"
                    placeholder="+91..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-14 pr-5 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-bold text-secondary outline-none"
                  placeholder="name@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-14 pr-5 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-bold text-secondary outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Confirm</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-14 pr-5 py-5 bg-gray-50 border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-bold text-secondary outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary !py-6 !rounded-3xl text-xl flex items-center justify-center space-x-4 shadow-2xl shadow-primary/20"
              >
                <span>{loading ? 'Creating Account...' : 'Initiate Membership'}</span>
                {!loading && <ArrowRight className="w-7 h-7" />}
              </button>
            </div>
          </form>

          <div className="mt-12 text-center text-gray-400 font-bold">
            Member already?{' '}
            <Link to="/user/login" className="text-secondary hover:text-primary transition-all">
              SIGN IN
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
