"use client";

import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { FiMapPin, FiCalendar, FiClock, FiNavigation } from "react-icons/fi";

interface Step3Props {
  data: any;
  updateData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function BookingStep3({
  data,
  updateData,
  nextStep,
  prevStep,
}: Step3Props) {
  const [labs, setLabs] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
  ];

  // Generate next 7 days
  useEffect(() => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    setAvailableDates(dates);
  }, []);

  // Fetch labs based on city
  useEffect(() => {
    const fetchLabs = async () => {
      setLoading(true);
      try {
        console.log("🔍 Fetching labs for:", {
          city: selectedCity,
          serviceType: data.serviceType,
          serviceId: data.serviceId,
          appointmentType: data.appointmentType,
        });

        // Try different service parameter names
        const serviceParam = data.serviceId || data.serviceType || "";
        console.log("Using service parameter:", serviceParam);

        const url = `/api/labs?city=${selectedCity}${
          serviceParam ? `&service=${serviceParam}` : ""
        }`;
        console.log("API URL:", url);

        const response = await fetch(url);
        const result = await response.json();

        console.log("API Response:", {
          success: result.success,
          count: result.count,
          message: result.message,
          dataLength: result.data?.length,
        });

        if (result.success) {
          setLabs(result.data);
          console.log("Labs set:", result.data.length, "labs");

          // Auto-select first lab if none selected
          if (!data.labId && result.data.length > 0) {
            updateData({
              labId: result.data[0]._id,
              labName: result.data[0].name,
              labAddress: result.data[0].address,
              labCity: result.data[0].city,
            });
            console.log("Auto-selected lab:", result.data[0].name);
          }
        } else {
          console.error("API returned error:", result.message);
        }
      } catch (error) {
        console.error("Failed to fetch labs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, [selectedCity, data.serviceType]);

  // Fetch time slots when lab and date are selected
  useEffect(() => {
    if (data.labId && data.appointmentDate) {
      fetchTimeSlots();
    }
  }, [data.labId, data.appointmentDate]);

  const fetchTimeSlots = async () => {
    try {
      const dateStr = data.appointmentDate.toISOString().split("T")[0];
      const response = await fetch(
        `/api/time-slots?labId=${data.labId}&date=${dateStr}&serviceType=${data.serviceType}`
      );
      const result = await response.json();

      if (result.success) {
        setTimeSlots(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch time slots:", error);
    }
  };

  const handleLabSelect = (lab: any) => {
    updateData({
      labId: lab._id,
      labName: lab.name,
      labAddress: lab.address,
      labCity: lab.city,
    });
  };

  const handleDateSelect = (date: Date) => {
    updateData({ appointmentDate: date });
  };

  const handleTimeSelect = (slot: string) => {
    updateData({ timeSlot: slot });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const canProceed = data.labId && data.appointmentDate && data.timeSlot;

  // Mock time slots (replace with API)
  const mockTimeSlots = [
    { slot: "09:00-10:00", available: true },
    { slot: "10:00-11:00", available: true },
    { slot: "11:00-12:00", available: false },
    { slot: "12:00-13:00", available: true },
    { slot: "14:00-15:00", available: true },
    { slot: "15:00-16:00", available: true },
    { slot: "16:00-17:00", available: true },
    { slot: "17:00-18:00", available: true },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Select Time & Location</h2>

      {/* City Selection */}
      <div className="mb-8">
        <label className="block text-lg font-semibold mb-4">
          <FiMapPin className="inline mr-2" />
          Select City
        </label>
        <div className="flex flex-wrap gap-3">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 ${
                selectedCity === city
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 hover:border-blue-300"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Select Diagnostic Center</h3>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading labs...</p>
          </div>
        ) : labs.length > 0 ? (
          <div className="space-y-4">
            {labs.map((lab) => (
              <div
                key={lab._id}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  data.labId === lab._id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => handleLabSelect(lab)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="font-bold text-lg">{lab.name}</h4>
                      {lab.rating && (
                        <span className="ml-3 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center">
                          ⭐ {lab.rating}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center text-gray-600 mb-2">
                      <FiMapPin className="mr-2" />
                      <span>
                        {lab.address}, {lab.city}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                      <FiClock className="mr-2" />
                      <span>Open: {lab.openingHours}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {lab.services
                        ?.slice(0, 4)
                        .map((service: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            {service}
                          </span>
                        ))}
                      {lab.services?.length > 4 && (
                        <span className="text-gray-500 text-sm">
                          +{lab.services.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="ml-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Open maps/directions
                        window.open(
                          `https://maps.google.com/?q=${lab.address},${lab.city}`,
                          "_blank"
                        );
                      }}
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <FiNavigation className="mr-1" />
                      Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <p className="text-gray-600">
              No labs found in {selectedCity} for this service
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Try selecting a different city or service
            </p>
          </div>
        )}
      </div>

      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">
          <FiCalendar className="inline mr-2" />
          Select Date
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
          {availableDates.map((date, index) => (
            <button
              key={index}
              onClick={() => handleDateSelect(date)}
              className={`p-4 rounded-xl border-2 flex flex-col items-center transition-all duration-300 ${
                data.appointmentDate?.toDateString() === date.toDateString()
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-200 hover:border-blue-300"
              } ${isToday(date) ? "font-bold" : ""}`}
            >
              <span className="text-sm text-gray-500">
                {isToday(date)
                  ? "TODAY"
                  : date
                      .toLocaleDateString("en-IN", { weekday: "short" })
                      .toUpperCase()}
              </span>
              <span className="text-2xl font-bold mt-1">{date.getDate()}</span>
              <span className="text-sm text-gray-600">
                {date.toLocaleDateString("en-IN", { month: "short" })}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      {data.appointmentDate && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">
            <FiClock className="inline mr-2" />
            Select Time Slot
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {mockTimeSlots.map((time, index) => (
              <button
                key={index}
                onClick={() => time.available && handleTimeSelect(time.slot)}
                disabled={!time.available}
                className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                  data.timeSlot === time.slot
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : time.available
                    ? "border-gray-200 hover:border-blue-300"
                    : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                }`}
              >
                <div className="font-medium">{time.slot}</div>
                <div className="text-sm mt-1">
                  {time.available ? (
                    <span className="text-green-600">Available</span>
                  ) : (
                    <span className="text-red-600">Booked</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Home Service Address (if selected) */}
      {data.appointmentType === "home-service" && (
        <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Home Service Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complete Address *
              </label>
              <textarea
                value={data.homeServiceAddress || ""}
                onChange={(e) =>
                  updateData({ homeServiceAddress: e.target.value })
                }
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter complete address for sample collection"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode *
              </label>
              <input
                type="text"
                value={data.homeServicePincode || ""}
                onChange={(e) =>
                  updateData({ homeServicePincode: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter pincode"
              />
              <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                Landmark (Optional)
              </label>
              <input
                type="text"
                value={data.homeServiceLandmark || ""}
                onChange={(e) =>
                  updateData({ homeServiceLandmark: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nearby landmark"
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            * Home service available in selected areas. Our technician will
            arrive within the selected time slot.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          ← Back to Patient Details
        </Button>
        <Button onClick={nextStep} variant="primary" disabled={!canProceed}>
          Continue to Medical Information
        </Button>
      </div>
    </div>
  );
}
