"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { ServiceCard } from "../ui/Card";
import { FiFilter } from "react-icons/fi";

const ServicesGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const services = [
    {
      id: 1,
      name: "Premium MRI Scan",
      originalPrice: 3656,
      discountedPrice: 2500,
      features: [
        "1.5T or 3T MRI",
        "Expert Radiologist",
        "Digital Report",
        "Same Day Report",
      ],
      category: "mri",
      isPopular: true,
      image: "/images/mri.jpg",
      href: "/services/mri-scan",
    },
    {
      id: 2,
      name: "Premium CT Scan",
      originalPrice: 3656,
      discountedPrice: 2250,
      features: [
        "128 Slice CT",
        "3D Reconstruction",
        "Quick Results",
        "Digital Images",
      ],
      category: "ct-scan",
      isPopular: true,
      image: "/images/ct-scan.jpg",
      href: "/services/ct-scan",
    },
    {
      id: 3,
      name: "Full Body Health Checkup",
      originalPrice: 4050,
      discountedPrice: 3500,
      features: [
        "80+ Tests",
        "Vitamin Profile",
        "Cardiac Risk",
        "Doctor Consultation",
      ],
      category: "health-checkup",
      isPopular: true,
      image: "/images/health-checkup.jpg",
    },
    {
      id: 4,
      name: "Advanced X-Ray",
      originalPrice: 1200,
      discountedPrice: 899,
      features: [
        "Digital X-Ray",
        "Quick Report",
        "Multiple Views",
        "Expert Analysis",
      ],
      category: "x-ray",
      isPopular: false,
      image: "/images/xray.jpg",
    },
    {
      id: 5,
      name: "Comprehensive Blood Test",
      originalPrice: 2999,
      discountedPrice: 1999,
      features: [
        "CBC & ESR",
        "Liver Function",
        "Kidney Function",
        "Thyroid Profile",
      ],
      category: "blood-test",
      isPopular: false,
      image: "/images/blood-test.jpg",
    },
    {
      id: 6,
      name: "Ultrasound Scan",
      originalPrice: 2200,
      discountedPrice: 1799,
      features: [
        "Abdomen Scan",
        "Color Doppler",
        "Expert Sonologist",
        "Same Day Report",
      ],
      category: "ultrasound",
      isPopular: false,
      image: "/images/ultrasound.jpg",
    },
  ];

  const categories = [
    { id: "all", name: "All Services" },
    { id: "mri", name: "MRI Scan" },
    { id: "ct-scan", name: "CT Scan" },
    { id: "health-checkup", name: "Health Checkup" },
    { id: "x-ray", name: "X-Ray" },
    { id: "blood-test", name: "Blood Tests" },
  ];

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  const handleBook = (serviceId: number) => {
    // Navigate to booking page with service ID
    window.location.href = `/booking?service=${serviceId}`;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Scans & Packages
            </h2>
            <p className="text-gray-600">
              Choose from 150+ tests and health packages at best prices
            </p>
          </div>

          <div className="flex items-center mt-4 md:mt-0">
            <FiFilter className="mr-2 text-gray-500" />
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 border border-gray-300 rounded-full whitespace-nowrap transition duration-300 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={() => handleBook(service.id)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button href="/services" variant="outline" size="lg" className="no-underline ">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
