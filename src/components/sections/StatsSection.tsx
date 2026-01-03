import { FiCheckCircle, FiClock, FiHome, FiUsers } from 'react-icons/fi';
import { MdLocalHospital } from 'react-icons/md';

const StatsSection = () => {
  const stats = [
    {
      icon: <MdLocalHospital className="text-4xl" />,
      value: '950+',
      label: 'Scan Centers & Labs',
      description: 'Across India'
    },
    {
      icon: <FiUsers className="text-4xl" />,
      value: '250,000+',
      label: 'Tests Completed',
      description: 'Trusted by thousands'
    },
    {
      icon: <FiCheckCircle className="text-4xl" />,
      value: '98.5%',
      label: 'Accuracy Rate',
      description: 'Certified reports'
    },
    {
      icon: <FiClock className="text-4xl" />,
      value: '4-6',
      label: 'Hours Average',
      description: 'For report delivery'
    },
    {
      icon: <FiHome className="text-4xl" />,
      value: '24/7',
      label: 'Home Service',
      description: 'Available in metro cities'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          India&apos;s Most Trusted Diagnostic Network
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-2xl hover:shadow-lg transition duration-300 hover:bg-blue-50"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="font-semibold text-gray-800 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;