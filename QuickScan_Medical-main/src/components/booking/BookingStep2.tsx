'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import { FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

interface Step2Props {
  data: any;
  updateData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function BookingStep2({ data, updateData, nextStep, prevStep }: Step2Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.patientName?.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!data.patientEmail?.trim()) {
      newErrors.patientEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.patientEmail)) {
      newErrors.patientEmail = 'Email is invalid';
    }

    if (!data.patientPhone?.trim()) {
      newErrors.patientPhone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(data.patientPhone.replace(/\D/g, ''))) {
      newErrors.patientPhone = 'Enter valid 10-digit phone number';
    }

    if (data.patientAge && (data.patientAge < 0 || data.patientAge > 120)) {
      newErrors.patientAge = 'Enter valid age (0-120)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  const handleChange = (field: string, value: any) => {
    updateData({ [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Patient Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Patient Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiUser className="inline mr-2" />
            Patient Full Name *
          </label>
          <input
            type="text"
            value={data.patientName || ''}
            onChange={(e) => handleChange('patientName', e.target.value)}
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${
              errors.patientName 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Enter patient's full name"
          />
          {errors.patientName && (
            <p className="mt-1 text-sm text-red-600">{errors.patientName}</p>
          )}
        </div>

        {/* Patient Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiCalendar className="inline mr-2" />
            Age
          </label>
          <input
            type="number"
            min="0"
            max="120"
            value={data.patientAge || ''}
            onChange={(e) => handleChange('patientAge', parseInt(e.target.value) || '')}
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${
              errors.patientAge 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Enter age"
          />
          {errors.patientAge && (
            <p className="mt-1 text-sm text-red-600">{errors.patientAge}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <div className="flex space-x-4">
            {['male', 'female', 'other'].map((gender) => (
              <label key={gender} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  checked={data.patientGender === gender}
                  onChange={() => handleChange('patientGender', gender)}
                  className="mr-2"
                />
                <span className="capitalize">{gender}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiMail className="inline mr-2" />
            Email Address *
          </label>
          <input
            type="email"
            value={data.patientEmail || ''}
            onChange={(e) => handleChange('patientEmail', e.target.value)}
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${
              errors.patientEmail 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Enter email address"
          />
          {errors.patientEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.patientEmail}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FiPhone className="inline mr-2" />
            Phone Number *
          </label>
          <input
            type="tel"
            value={data.patientPhone || ''}
            onChange={(e) => handleChange('patientPhone', e.target.value)}
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${
              errors.patientPhone 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="Enter 10-digit mobile number"
          />
          {errors.patientPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.patientPhone}</p>
          )}
        </div>

        {/* Relationship (if not booking for self) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Booking For
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="bookingFor"
                checked={!data.bookingForOthers}
                onChange={() => handleChange('bookingForOthers', false)}
                className="mr-2"
              />
              <span>Myself</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="bookingFor"
                checked={data.bookingForOthers}
                onChange={() => handleChange('bookingForOthers', true)}
                className="mr-2"
              />
              <span>Someone else (family member/friend)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Emergency Contact (Optional) */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Emergency Contact (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Name
            </label>
            <input
              type="text"
              value={data.emergencyContactName || ''}
              onChange={(e) => handleChange('emergencyContactName', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Emergency contact name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Phone
            </label>
            <input
              type="tel"
              value={data.emergencyContactPhone || ''}
              onChange={(e) => handleChange('emergencyContactPhone', e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Emergency contact phone"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          ← Back to Service Selection
        </Button>
        <Button onClick={handleNext} variant="primary">
          Continue to Time & Location
        </Button>
      </div>
    </div>
  );
}