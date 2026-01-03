'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'MRI Scan in Mumbai - an important diagnostic step towards important health?',
      answer: 'MRI Scan is a crucial diagnostic tool that provides detailed images of organs and tissues. In Mumbai, we offer advanced 1.5T and 3T MRI scans with expert radiologists for accurate diagnosis.'
    },
    {
      question: 'Considering for same best "MRI Scan near me"?',
      answer: 'We have 50+ MRI scan centers across Mumbai. Use our location finder to find the nearest center with available slots, or book our portable MRI service for home visits.'
    },
    {
      question: 'Understanding the MRI Scan cost in Mumbai?',
      answer: 'MRI Scan cost in Mumbai starts from ₹2500 for basic scans and goes up to ₹15000 for specialized scans. We offer transparent pricing with no hidden charges.'
    },
    {
      question: 'MRI Scan Price in Mumbai: Affordable and transparent?',
      answer: 'Yes, we provide complete price transparency. Our prices are 20-30% lower than hospital rates. You can compare prices for different centers on our platform.'
    },
    {
      question: 'Finding the best MRI Scan Centre in Mumbai?',
      answer: 'We partner with NABL accredited labs with advanced equipment. All our centers are rated by patients, so you can choose based on reviews and facilities.'
    },
    {
      question: 'Book your MRI Scan in Mumbai with QuickScan?',
      answer: 'Booking is simple: 1) Select test 2) Choose location 3) Pick time slot 4) Make payment 5) Get confirmation. You can book online or call 1800-123-4567.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Got questions? We&apos;re here to help
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                className="w-full text-left p-6 bg-gray-50 border-t border-gray-200 hover:bg-gray-100 transition duration-300 flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-lg pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <FiChevronUp className="text-blue-600 flex-shrink-0" />
                ) : (
                  <FiChevronDown className="text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="p-6 bg-white">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Still have questions? Contact our support team
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white border-0 font-semibold py-3 px-8 rounded-lg">
              Call Now: 1800-123-4567
            </button>
            <button className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-lg border border-blue-600">
              WhatsApp Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;