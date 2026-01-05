import { 
  FiCheckCircle, 
  FiClock, 
  FiSmartphone, 
  FiTruck,
  FiShield,
  FiDollarSign 
} from 'react-icons/fi';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FiCheckCircle className="text-3xl" />,
      title: 'Accurate Reports',
      description: 'Certified by expert radiologists and pathologists',
      color: 'text-green-600'
    },
    {
      icon: <FiClock className="text-3xl" />,
      title: 'Same Day Reports',
      description: 'Get reports within 4-6 hours for urgent tests',
      color: 'text-blue-600'
    },
    {
      icon: <FiSmartphone className="text-3xl" />,
      title: 'Smart Health Reports',
      description: 'Digital reports on app with lifetime access',
      color: 'text-purple-600'
    },
    {
      icon: <FiTruck className="text-3xl" />,
      title: 'Home Delivery (Portable Test)',
      description: 'Sample collection from home in 60 minutes',
      color: 'text-orange-600'
    },
    {
      icon: <FiShield className="text-3xl" />,
      title: 'Widest Test Menu',
      description: '1500+ tests including advanced diagnostics',
      color: 'text-red-600'
    },
    {
      icon: <FiDollarSign className="text-3xl" />,
      title: 'Best Price Guarantee',
      description: 'Lowest prices with quality assured',
      color: 'text-yellow-600'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Choose QuickScan?
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We combine cutting-edge technology with expert healthcare professionals 
            to deliver the best diagnostic experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition duration-300 group"
            >
              <div className={`${feature.color} mb-6 group-hover:scale-110 transition duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Portable Test Available
              </h3>
              <p className="text-blue-100 text-lg">
                Book home sample collection. Available in 60+ cities across India.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <button className="bg-white text-blue-600 hover:bg-blue-700 hover:bg-opacity-90 hover:text-white hover:border-1 hover:border-white font-bold py-4 px-8 border-0 rounded-lg text-lg transition duration-300">
                Book Home Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;