"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { FiSearch, FiMapPin, FiStar, FiClock } from "react-icons/fi";

export default function LabsPage() {
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [searchQuery, setSearchQuery] = useState("");

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
  ];

  const labs = [
    {
      id: 1,
      name: "QuickScan Diagnostic Center - Mumbai Central",
      address: "123 Medical Street, Mumbai Central, Mumbai - 400001",
      rating: 4.8,
      reviews: 1245,
      services: ["MRI", "CT Scan", "X-Ray", "Blood Tests", "Health Checkup"],
      facilities: ["1.5T MRI", "128 Slice CT", "Digital X-Ray", "Home Service"],
      openingHours: "7:00 AM - 10:00 PM",
      distance: "0.5 km",
      image: "/images/lab1.jpg",
    },
    // Add more labs...
  ];

  return (
    <div className="pt-30 pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
        <div className="container-custom px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Diagnostic Centers Near You
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            950+ NABL accredited labs across India
          </p>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
            <div className="flex  justify-between items-center-b  items-center gap-4">
              <div className="relative ">
                <FiMapPin className="absolute left-4 top-6 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <FiSearch className="absolute left-4 top-6 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for labs or services..."
                  className="w- pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button
                variant="primary"
                size="lg"
                className="h-full w-50 border-0"
              >
                Search Labs
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-6">Filters</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Services Available</h4>
                  <div className="space-y-2">
                    {[
                      "MRI Scan",
                      "CT Scan",
                      "X-Ray",
                      "Blood Tests",
                      "Health Checkup",
                      "Ultrasound",
                    ].map((service) => (
                      <label key={service} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Facilities</h4>
                  <div className="space-y-2">
                    {[
                      "Home Service",
                      "24/7 Available",
                      "Ample Parking",
                      "Wheelchair Access",
                      "Digital Reports",
                    ].map((facility) => (
                      <label key={facility} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span>{facility}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input type="radio" name="rating" className="mr-2" />
                        <span className="flex items-center">
                          <FiStar className="text-yellow-400 fill-current mr-1" />
                          {rating}+
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Labs List */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                {labs.length} Labs in {selectedCity}
              </h2>
              <select className="border border-gray-300 rounded-lg p-2">
                <option>Sort by: Distance</option>
                <option>Sort by: Rating</option>
                <option>Sort by: Price</option>
              </select>
            </div>

            <div className="space-y-6">
              {labs.map((lab) => (
                <div
                  key={lab.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row">
                      {/* Lab Image */}
                      <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
                        <div className="bg-blue-100 h-48 rounded-lg flex items-center justify-center">
                          <div className="text-4xl">🏥</div>
                        </div>
                      </div>

                      {/* Lab Details */}
                      <div className="md:w-3/4">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold">{lab.name}</h3>
                          <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                            <FiStar className="mr-1" />
                            <span className="font-bold">{lab.rating}</span>
                            <span className="text-sm ml-1">
                              ({lab.reviews})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600 mb-4">
                          <FiMapPin className="mr-2" />
                          <span>{lab.address}</span>
                          <span className="mx-2">•</span>
                          <span>{lab.distance} away</span>
                        </div>

                        <div className="flex items-center text-gray-600 mb-4">
                          <FiClock className="mr-2" />
                          <span>Open: {lab.openingHours}</span>
                        </div>

                        {/* Services */}
                        <div className="mb-4">
                          <div className="text-sm font-semibold mb-2">
                            Services:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {lab.services.map((service) => (
                              <span
                                key={service}
                                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Facilities */}
                        <div className="mb-6">
                          <div className="text-sm font-semibold mb-2">
                            Facilities:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {lab.facilities.map((facility) => (
                              <span
                                key={facility}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                              >
                                {facility}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <Button
                            href={`/labs/${lab.id}`}
                            variant="outline"
                            className="border-0 no-underline"
                          >
                            View Details
                          </Button>
                          <Button
                            href={`/booking?lab=${lab.id}`}
                            className="border-0 no-underline"
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
