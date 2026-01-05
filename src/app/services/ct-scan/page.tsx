import { servicesData } from "@/lib/data/services";
import {
  FiCheck,
  FiClock,
  FiFileText,
  FiHome,
  FiShield,
  FiStar,
} from "react-icons/fi";
import Button from "@/components/ui/Button";

export default function CTScanPage() {
  const service = servicesData["ct-scan"];

  return (
    <div className="pt-20 mt-15 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 py-12">
        <div className="container-custom px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{service.description}</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="text-3xl font-bold text-blue-600">
                ₹{service.price}
                <span className="text-lg text-gray-500 line-through ml-2">
                  ₹{service.originalPrice}
                </span>
              </div>
              <Button href={`/booking?service=ct-scan`} size="lg" className="no-underline">
                Book CT Scan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Overview</h2>
              <p className="text-gray-700 mb-6">
                CT Scan (Computed Tomography) uses X-rays and computer
                processing to create detailed cross-sectional images of the
                body. It provides clearer and more detailed information than
                regular X-rays, especially for bones, blood vessels, and soft
                tissues.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <FiClock className="text-blue-600 text-2xl mx-auto mb-2" />
                  <div className="font-bold">Report Time</div>
                  <div className="text-sm text-gray-600">
                    {service.reportTime}
                  </div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <FiFileText className="text-green-600 text-2xl mx-auto mb-2" />
                  <div className="font-bold">Sample Required</div>
                  <div className="text-sm text-gray-600">
                    {service.sampleRequired}
                  </div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <FiHome className="text-purple-600 text-2xl mx-auto mb-2" />
                  <div className="font-bold">Home Service</div>
                  <div className="text-sm text-gray-600">
                    {service.homeService}
                  </div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <FiShield className="text-red-600 text-2xl mx-auto mb-2" />
                  <div className="font-bold">Fasting</div>
                  <div className="text-sm text-gray-600">
                    For Contrast Studies
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">What's Included</h3>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FiCheck className="text-green-500 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Types of CT Scans */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">
                Types of CT Scans Available
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.testDetails.map((test, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 border border-gray-200 rounded-lg"
                  >
                    <FiStar className="text-blue-500 mr-3" />
                    <span>{test}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Instructions */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">
                Preparation Instructions
              </h2>
              <div className="prose max-w-none">
                <p>{service.preparation}</p>
                <ul className="mt-4 space-y-2">
                  <li>• Wear comfortable, loose-fitting clothing</li>
                  <li>• Remove jewelry, eyeglasses, dentures, and hairpins</li>
                  <li>
                    • Fasting for 4-6 hours required for abdominal scans with
                    contrast
                  </li>
                  <li>
                    • Inform about kidney function, diabetes, and allergies
                  </li>
                  <li>• Drink plenty of water before and after the scan</li>
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {service.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-6 last:border-0"
                  >
                    <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking & Info */}
          <div>
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Book CT Scan</h2>

              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-blue-600">
                    ₹{service.price}
                  </span>
                  <span className="text-gray-500 line-through ml-2">
                    ₹{service.originalPrice}
                  </span>
                </div>
                <div className="text-green-600 font-semibold">
                  Save ₹{service.originalPrice - service.price}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select City
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Mumbai</option>
                    <option>Delhi</option>
                    <option>Bangalore</option>
                    <option>Chennai</option>
                    <option>Hyderabad</option>
                  </select>
                </div>
              </div>

              <Button
                href={`/booking?service=ct-scan`}
                variant="primary"
                size="lg"
                fullWidth
                 className='no-underline'
              >
                Proceed to Book
              </Button>

              <div className="mt-6 text-sm text-gray-600 space-y-2">
                <p className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  Free cancellation until 12 hours before test
                </p>
                <p className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  128 Slice Advanced CT Scanner
                </p>
                <p className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  Low radiation dose protocols
                </p>
              </div>
            </div>

            {/* Why Choose CT with Us */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">
                Why Choose CT Scan with Us?
              </h3>
              <div className="space-y-3">
                {[
                  "128 Slice Advanced CT Scanners",
                  "Low Radiation Dose Technology",
                  "3D Reconstruction Available",
                  "Contrast & Non-Contrast Studies",
                  "Expert Radiologist Reporting",
                  "Quick Turnaround Time",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <FiStar className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
