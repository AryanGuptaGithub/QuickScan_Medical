import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
        
        <RegisterForm />
      </div>
    </div>
  );
}