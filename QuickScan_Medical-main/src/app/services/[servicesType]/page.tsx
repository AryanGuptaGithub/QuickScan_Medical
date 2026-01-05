// app/services/[serviceType]/page.tsx
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import { FiCheck, FiClock, FiFileText, FiHome, FiShield } from "react-icons/fi";

// Import or define your services data
import { servicesData }  from "@/lib/data/services"; // Adjust path as needed

interface ServicePageProps {
  params: Promise<{
    servicesType: string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  // Await the params promise
  const { servicesType } = await params;

  const service = servicesData[servicesType as keyof typeof servicesData];

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-8 pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 py-12">
        <div className="container-custom px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{service.description}</p>
            <div className="flex items-center space-x-6">
              <div className="text-3xl font-bold text-blue-600">
                ₹{service.price}
                {service.originalPrice > service.price && (
                  <span className="text-lg text-gray-500 line-through ml-2">
                    ₹{service.originalPrice}
                  </span>
                )}
              </div>
              <Button href={`/booking?service=${servicesType}`} size="lg">
                Book Now
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
              <p className="text-gray-700 mb-6">{service.description}</p>

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
                    {service.preparation.toLowerCase().includes('fasting') ? 'Required' : 'Not Required'}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">What&apos;s Included</h3>
              <ul className="space-y-3">
                {service.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <FiCheck className="text-green-500 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preparation Instructions */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">
                Preparation Instructions
              </h2>
              <div className="prose max-w-none">
                <p>{service.preparation}</p>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Common Questions</h2>
              <div className="space-y-6">
                {service.faqs.map((faq: any, index: number) => (
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

          {/* Right Column - Booking */}
          <div>
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Book This Test</h2>

              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-blue-600">
                    ₹{service.price}
                  </span>
                  {service.originalPrice > service.price && (
                    <span className="text-gray-500 line-through ml-2">
                      ₹{service.originalPrice}
                    </span>
                  )}
                </div>
                {service.originalPrice > service.price && (
                  <div className="text-green-600 font-semibold">
                    Save ₹{service.originalPrice - service.price}
                  </div>
                )}
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
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="serviceType"
                        className="mr-2"
                        defaultChecked
                      />
                      <span>Visit Lab Centre</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="serviceType" className="mr-2" />
                      <span>Home Sample Collection</span>
                      <span className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        +₹200
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <Button
                href={`/booking?service=${servicesType}`}
                variant="primary"
                size="lg"
                fullWidth
                className="no-underline"
              >
                Proceed to Book
              </Button>

              <div className="mt-6 text-sm text-gray-600">
                <p className="flex items-center mb-2">
                  <FiCheck className="text-green-500 mr-2" />
                  Free cancellation until 12 hours before test
                </p>
                <p className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  Certified labs & expert professionals
                </p>
              </div>
            </div>

            {/* Related Tests */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">Related Tests</h3>
              <div className="space-y-4">
                {relatedTests.map((test) => (
                  <a
                    key={test.id}
                    href={`/services/${test.slug}`}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-blue-50 transition duration-300"
                  >
                    <div>
                      <div className="font-medium">{test.name}</div>
                      <div className="text-sm text-gray-600">
                        From ₹{test.price}
                      </div>
                    </div>
                    <div className="text-blue-600">→</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Move mock data outside or import from separate file
const relatedTests = [
  { id: 1, name: "CT Scan Brain", slug: "ct-scan-brain", price: 2800 },
  { id: 2, name: "MRI Spine", slug: "mri-spine", price: 3200 },
  { id: 3, name: "PET-CT Scan", slug: "pet-ct-scan", price: 15000 },
  { id: 4, name: "X-Ray Chest", slug: "xray-chest", price: 450 },
];
