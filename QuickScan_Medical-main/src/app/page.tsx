import HeroSection from '@/components/sections/HeroSection';
import StatsSection from '@/components/sections/StatsSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import FeaturesSection from '@/components/sections/FeaturesSection';
import Testimonials from '@/components/sections/Testimonials';
import FAQSection from '@/components/sections/FAQSection';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesGrid />
      <FeaturesSection />
      <Testimonials />
      <FAQSection />
      
      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container-custom px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Looking for something specific?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Book any medical test, scan, or health package with our expert guidance
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              href="/booking" 
              variant="secondary"
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 no-underline"
            >
              Book an MRI Scan
            </Button>
            <Button 
              href="/services" 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-blue-800 no-underline"
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}