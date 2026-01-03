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

export default function MRIScanPage() {
  const service = servicesData["mri-scan"];

  return (
    <div className="pt-8 mt-15 pb-20">
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
              <Button href={`/booking?service=mri-scan`} size="lg" className="no-underline">
                Book MRI Scan
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
                MRI (Magnetic Resonance Imaging) is a non-invasive diagnostic
                technique that uses strong magnetic fields and radio waves to
                create detailed images of organs and tissues. It is especially
                useful for examining the brain, spine, joints, and soft tissues
                without using ionizing radiation.
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
                  <div className="text-sm text-gray-600">Not Required</div>
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

            {/* Types of MRI Scans */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">
                Types of MRI Scans Available
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
                  <li>
                    • Wear comfortable, loose-fitting clothing without metal
                    zippers or buttons
                  </li>
                  <li>
                    • Remove all jewelry, watches, hairpins, and hearing aids
                  </li>
                  <li>
                    • Inform the technician about any medical implants,
                    pacemakers, or metal in your body
                  </li>
                  <li>
                    • For certain abdominal MRIs, fasting for 4-6 hours may be
                    required
                  </li>
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
              <h2 className="text-2xl font-bold mb-6">Book MRI Scan</h2>

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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                      <input
                        type="radio"
                        name="serviceType"
                        className="mr-3"
                        defaultChecked
                      />
                      <div>
                        <div className="font-medium">Visit Lab Centre</div>
                        <div className="text-sm text-gray-600">
                          Walk-in to our MRI center
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <Button
                href={`/booking?service=mri-scan`}
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
                  Certified labs & expert radiologists
                </p>
                <p className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  Same day reporting available
                </p>
              </div>
            </div>

            {/* Why Choose MRI with Us */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">
                Why Choose MRI with Us?
              </h3>
              <div className="space-y-3">
                {[
                  "950+ Scan Centers Across India",
                  "1.5T & 3T Advanced Machines",
                  "Expert Radiologists with 10+ Years Experience",
                  "Same Day Reports for Emergencies",
                  "Digital Reports with Lifetime Access",
                  "Insurance & Corporate Tie-ups",
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
