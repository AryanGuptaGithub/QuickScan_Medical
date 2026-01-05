'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import { FiFileText, FiUpload, FiUser } from 'react-icons/fi';

interface Step4Props {
  data: any;
  updateData: (data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export default function BookingStep4({ data, updateData, nextStep, prevStep }: Step4Props) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    // Simulate file upload
    setTimeout(() => {
      const newFiles = Array.from(files).map(file => file.name);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setUploading(false);
      
      // Update data with file references
      updateData({ 
        previousReports: [...(data.previousReports || []), ...newFiles].join(', ')
      });
    }, 1000);
  };

  const handleRemoveFile = (filename: string) => {
    setUploadedFiles(prev => prev.filter(f => f !== filename));
    updateData({
      previousReports: uploadedFiles.filter(f => f !== filename).join(', ')
    });
  };

  const medicalConditions = [
    'Diabetes',
    'Hypertension',
    'Heart Disease',
    'Kidney Disease',
    'Liver Disease',
    'Thyroid Disorder',
    'Asthma/COPD',
    'Cancer History',
    'None of the above'
  ];

  const allergies = [
    'Iodine Contrast',
    'Latex',
    'Penicillin',
    'Sulfa Drugs',
    'Aspirin',
    'Food Allergies',
    'None'
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Medical Information</h2>
      
      {/* Doctor Referral */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Doctor Referral</h3>
        <div className="flex items-center mb-6">
          <label className="flex items-center mr-8">
            <input
              type="checkbox"
              checked={data.doctorReferral}
              onChange={(e) => updateData({ doctorReferral: e.target.checked })}
              className="mr-3 h-5 w-5"
            />
            <span>I have a doctor's referral</span>
          </label>
        </div>
        
        {data.doctorReferral && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50 p-6 rounded-xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referring Doctor's Name
              </label>
              <input
                type="text"
                value={data.doctorName || ''}
                onChange={(e) => updateData({ doctorName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dr. Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor's Registration Number (Optional)
              </label>
              <input
                type="text"
                value={data.doctorRegistration || ''}
                onChange={(e) => updateData({ doctorRegistration: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Registration number"
              />
            </div>
          </div>
        )}
      </div>

      {/* Symptoms & Reason for Test */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Symptoms & Reason for Test</h3>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Please describe your symptoms or reason for this test
          </label>
          <textarea
            value={data.symptoms || ''}
            onChange={(e) => updateData({ symptoms: e.target.value })}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., Persistent headache for 2 weeks, dizziness, etc."
          />
        </div>
      </div>

      {/* Medical History */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Medical History</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Existing Medical Conditions (Select all that apply)
            </label>
            <div className="space-y-2">
              {medicalConditions.map((condition) => (
                <label key={condition} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={data.medicalConditions?.includes(condition) || false}
                    onChange={(e) => {
                      const current = data.medicalConditions || [];
                      const updated = e.target.checked
                        ? [...current, condition]
                        : current.filter((c: string) => c !== condition);
                      updateData({ medicalConditions: updated });
                    }}
                    className="mr-3"
                  />
                  <span>{condition}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Known Allergies (Select all that apply)
            </label>
            <div className="space-y-2">
              {allergies.map((allergy) => (
                <label key={allergy} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={data.allergies?.includes(allergy) || false}
                    onChange={(e) => {
                      const current = data.allergies || [];
                      const updated = e.target.checked
                        ? [...current, allergy]
                        : current.filter((a: string) => a !== allergy);
                      updateData({ allergies: updated });
                    }}
                    className="mr-3"
                  />
                  <span>{allergy}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Previous Reports Upload */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Previous Reports (Optional)</h3>
        
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
          <FiUpload className="text-4xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Upload previous medical reports for reference</p>
          
          <input
            type="file"
            id="report-upload"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <label htmlFor="report-upload">
            <Button
              variant="outline"
              className="cursor-pointer"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Choose Files'}
            </Button>
          </label>
          
          <p className="text-sm text-gray-500 mt-4">
            Supported formats: PDF, JPG, PNG, DOC (Max 10MB each)
          </p>
        </div>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Uploaded Files:</h4>
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center">
                  <FiFileText className="text-gray-500 mr-3" />
                  <span className="text-sm">{file}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(file)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Special Instructions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Special Instructions</h3>
        <textarea
          value={data.specialInstructions || ''}
          onChange={(e) => updateData({ specialInstructions: e.target.value })}
          rows={3}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Any special instructions for the lab/technician..."
        />
      </div>

      {/* Pregnancy & Other Conditions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Important Declarations</h3>
        <div className="space-y-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={data.isPregnant || false}
              onChange={(e) => updateData({ isPregnant: e.target.checked })}
              className="mr-3 mt-1"
            />
            <div>
              <span className="font-medium">I am pregnant or suspect I might be pregnant</span>
              <p className="text-sm text-gray-600">Important for certain tests like X-rays</p>
            </div>
          </label>
          
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={data.hasPacemaker || false}
              onChange={(e) => updateData({ hasPacemaker: e.target.checked })}
              className="mr-3 mt-1"
            />
            <div>
              <span className="font-medium">I have a pacemaker or metal implants</span>
              <p className="text-sm text-gray-600">Important for MRI scans</p>
            </div>
          </label>
          
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={data.hasClaustrophobia || false}
              onChange={(e) => updateData({ hasClaustrophobia: e.target.checked })}
              className="mr-3 mt-1"
            />
            <div>
              <span className="font-medium">I have claustrophobia (fear of enclosed spaces)</span>
              <p className="text-sm text-gray-600">Important for MRI scans</p>
            </div>
          </label>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          ← Back to Time & Location
        </Button>
        <Button onClick={nextStep} variant="primary">
          Continue to Review & Payment
        </Button>
      </div>
    </div>
  );
}