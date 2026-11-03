import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Clock, MapPin, Star, ArrowRight } from 'lucide-react';
import { CARS, TESTIMONIALS } from '../data/dummyData';
import CarCard from '../components/CarCard';

const Home = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="overflow-x-hidden bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-start bg-slate-50 dark:bg-black overflow-hidden pt-8 md:pt-20 transition-colors duration-500">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.pinimg.com/1200x/72/92/1d/72921dcf7e4721ec00d9bd459e3030d3.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 dark:from-black/80 via-slate-50/40 dark:via-black/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-center md:text-left"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary/20 text-primary-light font-bold text-xs md:text-sm  border border-primary/30 backdrop-blur-sm uppercase tracking-widest">
              Premium Chauffeur Services
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.1] mb-6">
              Excellence in Every <br className="hidden lg:block" />
              <span className="text-primary-light">Journey</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
              Reliable, punctual, and safe travel solutions. From luxury sedans to spacious SUVs, we bring premium transport to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center md:justify-start">
              <Link to="/booking" className="btn btn-primary text-base md:text-lg px-8 pt-4 pb-4 md:px-12 md:py-5 shadow-2xl shadow-primary/20">
                Book My Ride
              </Link>
              <a href="#fleet" className="btn border border-blue-200 dark:border-white/20 text-blue-900 dark:text-white hover:bg-blue-100 dark:hover:bg-white/10 text-base md:text-lg px-8 pt-4 pb-4 md:px-12 md:py-5">
                Explore Fleet
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Features - Responsive Hidden on Mobile */}
        <div className="absolute bottom-12 left-0 right-0 hidden md:block">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-3 gap-8 bg-white dark:bg-white/5 backdrop-blur-lg border border-gray-100 dark:border-white/10 p-8 rounded-3xl shadow-xl dark:shadow-none">
              {[
                { icon: ShieldCheck, title: "Secured Travel", desc: "Background-verified drivers" },
                { icon: Clock, title: "Precision Time", desc: "100% Punctuality track record" },
                { icon: MapPin, title: "Full Coverage", desc: "Serving across all major cities" }
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="bg-primary/30 p-3 rounded-2xl">
                    <item.icon className="text-primary-light w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-bold">{item.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-24 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="section-title mb-4">Our Premium Fleet</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Tailored transport solutions for individual and corporate travelers.</p>
            </div>
            <Link to="/booking" className="group flex items-center justify-center text-primary font-black hover:text-black transition-all">
              VIEW ALL VEHICLES <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {CARS.map((car) => (
              <motion.div key={car.id} variants={fadeIn}>
                <CarCard car={car} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50 dark:bg-zinc-900 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200"
                  alt="About Us"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white dark:bg-secondary p-12 rounded-[2.5rem] shadow-2xl hidden md:block z-20 border border-gray-100 dark:border-none">
                <span className="text-primary dark:text-white text-6xl font-black block">15+</span>
                <span className="text-primary-light font-bold uppercase tracking-widest text-xs mt-2 block">Years of Quality</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">Elevating Mobility</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 leading-tight">Beyond Transportation, We Deliver Trust</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed">
                MM Travels has established itself as the gold standard in passenger transport. We don't just move people; we curate experiences defined by safety, luxury, and unmatched professionalism.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Verified Elite Chauffeurs",
                  "Transparent Fleet Pricing",
                  "Real-time GPS Monitoring",
                  "24/7 Corporate Concierge"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 p-4 bg-white dark:bg-black rounded-2xl shadow-sm border border-transparent dark:border-white/10">
                    <div className="bg-primary/10 p-2 rounded-xl">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-bold text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <button className="btn btn-black mt-12 px-10">
                Read Our Story
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="max-w-2xl mb-20 mx-auto md:mx-0">
            <h2 className="section-title">Client Voices</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Trust built over millions of miles. See what our frequent flyers have to say about the MM experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                 className="bg-gray-50 dark:bg-secondary p-10 md:p-12 rounded-[2.5rem] relative group border border-gray-100 dark:border-none"
              >
                <div className="flex space-x-1 text-primary-light mb-8">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-gray-900 dark:text-white text-xl md:text-2xl font-medium italic mb-10 leading-relaxed group-hover:text-primary-light transition-colors">"{t.comment}"</p>
                <div className="flex items-center space-x-5">
                  <div className="bg-primary-light w-14 h-14 rounded-full flex items-center justify-center font-black text-white dark:text-secondary text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">{t.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 container-custom">
        <div className="bg-black rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden flex flex-col items-center">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to ride in style?</h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12">
              Join thousands of corporate and personal travelers who choose MM Travels for every mile. Sign up and book in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <Link to="/booking" className="btn btn-primary !rounded-2xl !px-12 w-full sm:w-auto">
                Book A Trip
              </Link>
              <Link to="/user/register" className="text-white font-bold hover:text-primary-light transition-colors group flex items-center">
                Create Free Account <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-light/10 rounded-full -ml-32 -mb-32 blur-[100px]" />
        </div>
      </section>
    </div>
  );
};

export default Home;
