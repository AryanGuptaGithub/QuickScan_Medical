import ServicesGrid from '@/components/sections/ServicesGrid';
import Button from '@/components/ui/Button';
import { FiSearch, FiFilter } from 'react-icons/fi';

export default function ServicesPage() {
  return (
    <div className="pt-8 pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
        <div className="container-custom px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Diagnostic Services
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Choose from 1500+ tests and health packages. All tests conducted at 
            NABL accredited labs with certified professionals.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for tests (e.g., MRI, Blood Test, Diabetes Profile...)"
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Services */}
      <ServicesGrid />
      
      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container-custom px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <a 
                key={category.id}
                href={`/services/${category.slug}`}
                className="group p-6 bg-gray-50 rounded-xl hover:bg-blue-50 hover:shadow-lg transition duration-300 text-center"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.count} tests</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Why Book With Us?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-blue-600 text-5xl mb-4">🏥</div>
              <h3 className="text-xl font-bold mb-3">NABL Accredited Labs</h3>
              <p className="text-gray-600">All partner labs are NABL accredited ensuring highest quality standards</p>
            </div>
            <div className="text-center p-6">
              <div className="text-green-600 text-5xl mb-4">💯</div>
              <h3 className="text-xl font-bold mb-3">Best Price Guarantee</h3>
              <p className="text-gray-600">Found a lower price? We&apos;ll match it and give you 10% additional discount</p>
            </div>
            <div className="text-center p-6">
              <div className="text-purple-600 text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-3">Free Home Collection</h3>
              <p className="text-gray-600">Free home sample collection for tests above ₹999 in selected cities</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const categories = [
  { id: 1, name: 'MRI Scan', slug: 'mri-scan', icon: '🧠', count: '15+' },
  { id: 2, name: 'CT Scan', slug: 'ct-scan', icon: '🫀', count: '12+' },
  { id: 3, name: 'X-Ray', slug: 'x-ray', icon: '🦴', count: '25+' },
  { id: 4, name: 'Blood Tests', slug: 'blood-tests', icon: '💉', count: '500+' },
  { id: 5, name: 'Health Checkup', slug: 'health-checkup', icon: '🏥', count: '30+' },
  { id: 6, name: 'Ultrasound', slug: 'ultrasound', icon: '👶', count: '20+' },
  { id: 7, name: 'Cardiac Tests', slug: 'cardiac-tests', icon: '❤️', count: '45+' },
  { id: 8, name: 'Cancer Screening', slug: 'cancer-screening', icon: '🩺', count: '25+' },
];