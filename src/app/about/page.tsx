import Button from '@/components/ui/Button';
import { 
  FiUsers, 
  FiAward, 
  FiGlobe, 
  FiHeart,
  FiCheckCircle,
  FiShield 
} from 'react-icons/fi';

export default function AboutPage() {
  const milestones = [
    { year: '2015', title: 'Founded', description: 'Started with 2 labs in Mumbai' },
    { year: '2017', title: '100+ Labs', description: 'Expanded to 5 major cities' },
    { year: '2019', title: 'Tech Platform', description: 'Launched online booking platform' },
    { year: '2021', title: '1M+ Tests', description: 'Completed 1 million tests' },
    { year: '2023', title: '950+ Centers', description: 'Pan-India presence with 950+ centers' },
  ];

  return (
    <div className="pt-35 pb-20">
      {/* Hero */}
      <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 py-20">
        <div className="container-custom px-4 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About QuickScan
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            India&apos;s most trusted diagnostic service provider, making 
            healthcare accessible and affordable for everyone.
          </p>
        </div>
      </div>

      <div className="container-custom px-4 py-16">
        {/* Mission & Vision */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To democratize diagnostic healthcare in India by making it 
                accessible, affordable, and reliable for every citizen. We 
                believe that accurate diagnosis is the first step towards 
                effective treatment.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become India&apos;s most trusted healthcare partner by 
                leveraging technology to bridge the gap between patients and 
                quality diagnostic services.
              </p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 right-0 top-8 h-0.5 bg-gray-200 transform -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative">
              {milestones.map((milestone, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-white font-bold text-lg">{milestone.year}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-6 text-blue-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">{member.emoji}</span>
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us in Revolutionizing Healthcare</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a patient, healthcare provider, or investor, 
            there&apos;s a place for you in our journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button href="/contact" size="lg" className='no-underline '>
              Partner With Us
            </Button>
            <Button href="/careers" variant="outline" size="lg" className='no-underline '>
              View Careers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const values = [
  {
    icon: <FiUsers />,
    title: 'Patient First',
    description: 'Every decision we make is guided by what\'s best for our patients.'
  },
  {
    icon: <FiAward />,
    title: 'Excellence',
    description: 'We strive for excellence in every test, every report, every interaction.'
  },
  {
    icon: <FiGlobe />,
    title: 'Accessibility',
    description: 'Making quality healthcare accessible to everyone, everywhere.'
  },
  {
    icon: <FiHeart />,
    title: 'Compassion',
    description: 'We treat every patient with empathy, care, and respect.'
  },
  {
    icon: <FiCheckCircle />,
    title: 'Accuracy',
    description: 'Precision and accuracy in every diagnostic report we deliver.'
  },
  {
    icon: <FiShield />,
    title: 'Integrity',
    description: 'Honest, transparent, and ethical in all our dealings.'
  }
];

const teamMembers = [
  {
    name: 'Dr. Arvind Sharma',
    role: 'CEO & Founder',
    description: 'Ex-AIIMS radiologist with 20+ years experience',
    emoji: '👨‍⚕️'
  },
  {
    name: 'Priya Patel',
    role: 'Chief Technology Officer',
    description: 'Former tech lead at leading healthtech startup',
    emoji: '👩‍💻'
  },
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Medical Director',
    description: 'Senior pathologist with NABL accreditation expertise',
    emoji: '🥼'
  },
  {
    name: 'Anjali Mehta',
    role: 'Operations Head',
    description: '15+ years in healthcare operations management',
    emoji: '👩‍💼'
  }
];