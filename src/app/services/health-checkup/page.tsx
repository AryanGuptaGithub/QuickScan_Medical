import { servicesData } from "@/lib/data/services";
import {
  FiCheck,
  FiClock,
  FiFileText,
  FiHome,
  FiShield,
  FiStar,
  FiUsers,
  FiHeart,
} from "react-icons/fi";
import Button from "@/components/ui/Button";

export default function HealthCheckupPage() {
  const service = servicesData["health-checkup"];

  return (
    <div className="pt-30 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-12">
        <div className="container-custom px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{service.description}</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="text-3xl font-bold text-green-600">
                ₹{service.price}
                <span className="text-lg text-gray-500 line-through ml-2">
                  ₹{service.originalPrice}
                </span>
              </div>
              <Button
                href={`/booking?service=health-checkup`}
                size="lg"
                className="bg-green-600 hover:bg-green-700 no-underline"
              >
                Book Health Checkup
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
              <h2 className="text-2xl font-bold mb-6">
                Comprehensive Health Assessment
              </h2>
              <p className="text-gray-700 mb-6">
                Our Full Body Health Checkup is designed to provide a complete
                overview of your health status. It includes 80+ tests that
                screen for common health issues, assess organ function, and
                identify potential risk factors for future diseases.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <FiClock className="text-green-600 text-2xl mx-auto mb-2" />
                  <div className="font-bold">Report Time</div>
                  <div className="text-sm text-gray-600">
                    {service.reportTime}
                  </div>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <FiFileText className="text-blue-600 text-2xl mx-auto mb-2" />
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
                  <div className="text-sm text-gray-600">8-12 Hours</div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">
                What's Included (80+ Tests)
              </h3>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FiCheck className="text-green-500 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who Should Take This Checkup */}
            <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 text-green-800">
                Who Should Take This Checkup?
              </h3>
              <div className="space-y-3">
                {[
                  "Adults above 30 years",
                  "People with family history of diabetes, heart disease",
                  "Individuals with sedentary lifestyle",
                  "Smokers & alcohol consumers",
                  "People with obesity or overweight",
                  "Those with high stress levels",
                  "Pre-employment screening",
                  "Annual preventive health check",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <FiStar className="text-green-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm text-green-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">
                Benefits of Regular Checkup
              </h3>
              <div className="space-y-3">
                {[
                  "Early detection of diseases",
                  "Prevent serious health issues",
                  "Monitor existing conditions",
                  "Peace of mind about health",
                  "Personalized health advice",
                  "Cost-saving in long term",
                  "Better quality of life",
                  "Increased life expectancy",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Packages */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">
                Available Health Packages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6 hover:border-green-300 hover:shadow-lg transition duration-300"
                  >
                    <h3 className="font-bold text-lg mb-3">{pkg.name}</h3>
                    <div className="text-2xl font-bold text-green-600 mb-4">
                      ₹{pkg.price}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {pkg.tests.slice(0, 4).map((test, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <FiCheck className="text-green-500 mr-2" size={14} />
                          {test}
                        </li>
                      ))}
                      {pkg.tests.length > 4 && (
                        <li className="text-sm text-gray-500">
                          + {pkg.tests.length - 4} more tests
                        </li>
                      )}
                    </ul>
                    <Button
                      href={`/booking?package=${pkg.name}`}
                      variant="outline"
                      fullWidth
                      className="no-underline w-full"
                    >
                      Book now
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Test List */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">
                Detailed Test Parameters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-green-600">
                    Blood Tests
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Complete Blood Count (CBC)",
                      "Blood Glucose (Fasting & PP)",
                      "HbA1c (3 Months Sugar Average)",
                      "Lipid Profile (Cholesterol)",
                      "Liver Function Tests",
                      "Kidney Function Tests",
                      "Thyroid Profile (TSH, T3, T4)",
                      "Vitamin D & B12 Levels",
                    ].map((test, idx) => (
                      <li key={idx} className="flex items-center">
                        <FiHeart className="text-red-400 mr-2" size={14} />
                        {test}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4 text-blue-600">
                    Additional Tests
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "ECG (Electrocardiogram)",
                      "Urine Routine & Microscopy",
                      "Stool Test (if required)",
                      "Electrolytes (Sodium, Potassium)",
                      "Cardiac Risk Markers",
                      "Iron Studies",
                      "Calcium & Phosphorus",
                      "Doctor Consultation",
                    ].map((test, idx) => (
                      <li key={idx} className="flex items-center">
                        <FiUsers className="text-blue-400 mr-2" size={14} />
                        {test}
                      </li>
                    ))}
                  </ul>
                </div>
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
                    • <strong>Fasting:</strong> 8-12 hours fasting required
                    (water allowed)
                  </li>
                  <li>
                    • <strong>Medications:</strong> Continue regular medications
                    unless advised otherwise
                  </li>
                  <li>
                    • <strong>Alcohol:</strong> Avoid alcohol for 24 hours
                    before the test
                  </li>
                  <li>
                    • <strong>Exercise:</strong> Avoid strenuous exercise the
                    day before
                  </li>
                  <li>
                    • <strong>Clothing:</strong> Wear loose clothing for easy
                    sample collection
                  </li>
                  <li>
                    • <strong>Women:</strong> Inform if you are pregnant or
                    menstruating
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
              <h2 className="text-2xl font-bold mb-6">Book Health Checkup</h2>

              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-green-600">
                    ₹{service.price}
                  </span>
                  <span className="text-gray-500 line-through ml-2">
                    ₹{service.originalPrice}
                  </span>
                </div>
                <div className="text-green-600 font-semibold">
                  Save ₹{service.originalPrice - service.price}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  80+ tests included
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select City
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500">
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
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-green-50">
                      <input
                        type="radio"
                        name="serviceType"
                        className="mr-3"
                        defaultChecked
                      />
                      <div>
                        <div className="font-medium">Visit Lab Centre</div>
                        <div className="text-sm text-gray-600">
                          Complete checkup at our center
                        </div>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-green-50">
                      <input type="radio" name="serviceType" className="mr-3" />
                      <div>
                        <div className="font-medium">
                          Home Sample Collection
                        </div>
                        <div className="text-sm text-gray-600">
                          Basic tests at home (Free in metros)
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <Button
                href={`/booking?service=health-checkup`}
                className="bg-green-600 hover:bg-green-700 no-underline"
                size="lg"
                fullWidth
              >
                Proceed to Book
              </Button>

              <div className="mt-6 text-sm text-gray-600 space-y-2">
                <p className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  Free doctor consultation included
                </p>
                <p className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  Digital reports with lifetime access
                </p>
                <p className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  Free home collection in metro cities
                </p>
                <p className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  Diet & lifestyle recommendations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
