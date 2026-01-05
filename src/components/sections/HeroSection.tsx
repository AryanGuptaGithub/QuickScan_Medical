'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import { FiSearch, FiMapPin, FiCalendar } from 'react-icons/fi';

const HeroSection = () => {
  const [location, setLocation] = useState('Mumbai');
  const [service, setService] = useState('MRI Scan');

  const services = ['MRI Scan', 'CT Scan', 'X-Ray', 'Health Checkup', 'Blood Test'];
  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'];

  const handleSearch = () => {
    // Implement search logic
    console.log('Searching for:', { service, location });
  };

  return (
    <section className="mt-15 relative bg-gradient-to-r from-blue-50 to-cyan-50 py-20 md:py-32">
      <div className="container-custom px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Book Medical Scans & Tests 
            <span className="text-blue-600 block">With Instant Appointment</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10">
            India&apos;s largest network of diagnostic labs. 950+ scan centers, 
            same-day reports, and home sample collection available.
          </p>
          
          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Location */}
              <div className="relative">
                <FiMapPin className="absolute left-4 top-6 transform -translate-y-1/2 text-gray-400" />
                <select 
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              
              {/* Service */}
              <div className="relative">
                <FiSearch className="absolute left-4 top-6 transform -translate-y-1/2 text-gray-400" />
                <select 
                  className="w-full pl-12 pr-4 py-4  border border-gray-300 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  {services.map((srv) => (
                    <option key={srv} value={srv}>{srv}</option>
                  ))}
                </select>
              </div>
              
              {/* Search Button */}
              <Button 
                onClick={handleSearch}
                variant="primary"
                size="lg"
                className="h-full border border-transparent hover:border-blue-600 transition-all duration-300"
              >
                <FiCalendar className="inline mr-2 " />
                Book Appointment
              </Button>
            </div>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <span className="font-semibold">Same Day Reports</span>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <span className="text-blue-600 font-bold">🏠</span>
              </div>
              <span className="font-semibold">Home Service Available</span>
            </div>
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-lg mr-3">
                <span className="text-purple-600 font-bold">⭐</span>
              </div>
              <span className="font-semibold">NABL Accredited Labs</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Floating Card */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden xl:block">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-80">
          <h3 className="text-2xl font-bold mb-6 text-center">Our Impact</h3>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">950+</div>
              <div className="text-gray-600">Scan Centers & Labs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">250,000+</div>
              <div className="text-gray-600">Tests Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">35+</div>
              <div className="text-gray-600">Cities Across India</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;