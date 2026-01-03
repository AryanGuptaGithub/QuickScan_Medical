import { ReactNode } from 'react';
import Button from './Button';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

interface ServiceCardProps {
  service: {
    id: number;
    name: string;
    originalPrice: number;
    discountedPrice: number;
    features: string[];
    image?: string;
    isPopular?: boolean;
  };
  onBook: () => void;
}

export const ServiceCard = ({ service, onBook }: ServiceCardProps) => {
  return (
    <Card className="hover:shadow-xl transition duration-300">
      {service.isPopular && (
        <div className="bg-red-500 text-white text-sm font-semibold py-1 px-3 absolute top-4 left-4 rounded-full">
          Popular
        </div>
      )}
      
      {service.image && (
        <div className="h-48 bg-blue-100 flex items-center justify-center">
          <div className="text-4xl">🩺</div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{service.name}</h3>
        
        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ₹{service.discountedPrice}
          </span>
          {service.originalPrice > service.discountedPrice && (
            <>
              <span className="text-gray-500 line-through ml-3">
                ₹{service.originalPrice}
              </span>
              <span className="text-green-600 font-semibold ml-3">
                Save ₹{service.originalPrice - service.discountedPrice}
              </span>
            </>
          )}
        </div>
        
        <ul className="space-y-2 mb-6">
          {service.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <span className="text-green-500 mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={onBook} 
          variant="primary" 
          fullWidth
          className="w-full border-0"
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
};

export default Card;