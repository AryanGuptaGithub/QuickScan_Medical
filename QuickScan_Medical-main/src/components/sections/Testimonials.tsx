'use client';

import { useState } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: 'Arun Tiwari',
      location: 'Mumbai',
      rating: 5,
      comment: 'It\'s quick and easy booking, cheaper price, nice service, scan centre was nearby, quick service, professional scanning done.',
      image: 'AT'
    },
    {
      name: 'Nandni Tiwari',
      location: 'Delhi',
      rating: 5,
      comment: 'Very good service. The technician came on time for home sample collection. Reports were accurate and delivered quickly.',
      image: 'NT'
    },
    {
      name: 'Meenakshi Roy',
      location: 'Bangalore',
      rating: 4,
      comment: 'Excellent service. Price was reasonable compared to other labs. MRI scan was comfortable and report was detailed.',
      image: 'MR'
    },
    {
      name: 'Rohan Sharma',
      location: 'Chennai',
      rating: 5,
      comment: 'Best experience! From booking to report delivery, everything was seamless. Highly recommended for health checkups.',
      image: 'RS'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our Customers Say
          </h2>
          <p className="text-gray-600">
            Trusted by over 250,000+ patients across India
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-start mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                <span className="text-blue-600 text-xl font-bold">
                  {testimonials[currentIndex].image}
                </span>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-bold mr-4">
                    {testimonials[currentIndex].name}
                  </h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`${
                          i < testimonials[currentIndex].rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{testimonials[currentIndex].location}</p>
              </div>
            </div>
            
            <p className="text-gray-700 text-lg italic mb-8">
              &ldquo;{testimonials[currentIndex].comment}&rdquo;
            </p>
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition duration-300"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition duration-300"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.8/5</div>
            <div className="text-gray-600">Customer Rating</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">99%</div>
            <div className="text-gray-600">Report Accuracy</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-gray-600">On-Time Delivery</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;