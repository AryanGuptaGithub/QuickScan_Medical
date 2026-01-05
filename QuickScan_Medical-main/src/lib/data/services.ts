export const servicesData = {
   'mri-scan': {
    slug: 'mri-scan',
    name: 'MRI Scan (Magnetic Resonance Imaging)',
    title: 'MRI Scan (Magnetic Resonance Imaging)',
    description: 'Advanced imaging technique for detailed view of organs and tissues without radiation',
    price: 2500,
    discountedPrice: 2500,
    originalPrice: 3656,
    features: [
      '1.5T or 3T High-Resolution MRI Machine',
      'Expert Radiologist Interpretation',
      'Digital Report with Images',
      'Same Day Report Available',
      'No Radiation Exposure',
      'Free Digital Report Storage'
    ],
    testDetails: [
      'Brain MRI',
      'Spine MRI (Cervical, Thoracic, Lumbar)',
      'Joint MRI (Knee, Shoulder, Ankle)',
      'Abdomen & Pelvis MRI',
      'Cardiac MRI',
      'Angiography MRI'
    ],
    preparation: 'No special preparation required. Remove all metal objects. Inform about any implants or pacemakers.',
    reportTime: '24-48 hours (Same day for emergencies)',
    sampleRequired: 'Not Applicable',
    homeService: 'Available in metro cities',
    faqs: [
      {
        question: 'Is MRI scan painful?',
        answer: 'No, MRI is completely painless. You may hear loud tapping noises during the scan.'
      },
      {
        question: 'How long does MRI take?',
        answer: '15-45 minutes depending on the body part being scanned.'
      },
      {
        question: 'Is there any radiation in MRI?',
        answer: 'No, MRI uses magnetic fields and radio waves, not ionizing radiation.'
      },
      {
        question: 'Can I eat before MRI?',
        answer: 'Yes, unless it\'s an abdominal MRI where fasting may be required.'
      }
    ]
  },
   'ct-scan': {
    slug: 'ct-scan',
    name: 'CT Scan (Computed Tomography)',
    title: 'CT Scan (Computed Tomography)',
    description: 'Advanced X-ray imaging providing detailed cross-sectional views of the body',
    price: 2250,
    discountedPrice: 2250,
    originalPrice: 3656,
    features: [
      '128 Slice CT Scanner',
      '3D Reconstruction Available',
      'Contrast & Non-Contrast Studies',
      'Digital Images & Report',
      'Quick Results',
      'Low Radiation Protocols'
    ],
    testDetails: [
      'CT Brain',
      'CT Chest',
      'CT Abdomen & Pelvis',
      'CT Angiography',
      'CT Coronary Angiography',
      'CT Virtual Colonoscopy'
    ],
    preparation: 'Fasting required for contrast studies. Inform about kidney function and allergies.',
    reportTime: '24 hours (4-6 hours for emergencies)',
    sampleRequired: 'Not Applicable',
    homeService: 'Not Available (Fixed machine required)',
    faqs: [
      {
        question: 'What is the difference between CT and MRI?',
        answer: 'CT uses X-rays, MRI uses magnetic fields. CT is better for bones, MRI for soft tissues.'
      },
      {
        question: 'Is CT scan safe?',
        answer: 'Yes, modern CT uses minimal radiation with advanced safety protocols.'
      },
      {
        question: 'How long does CT scan take?',
        answer: '5-10 minutes for most scans.'
      },
      {
        question: 'Can I drive after CT scan?',
        answer: 'Yes, unless sedatives were given for the procedure.'
      }
    ]
  },
 'health-checkup': {
  slug: 'health-checkup',
  name: 'Full Body Health Checkup',
  title: 'Full Body Health Checkup',
  description: 'Comprehensive preventive health screening with 80+ tests',
  price: 3500,
  discountedPrice: 3500,
  originalPrice: 4050,
  features: [
    '80+ Comprehensive Tests',
    'Complete Blood Count (CBC)',
    'Liver & Kidney Function Tests',
    'Cardiac Risk Markers',
    'Thyroid Profile',
    'Vitamin D & B12 Levels',
    'Diabetes Screening',
    'Doctor Consultation Included'
  ],
  testDetails: [
    'Complete Blood Count (CBC)',
    'Lipid Profile',
    'Liver Function Test (LFT)',
    'Kidney Function Test (KFT)',
    'Thyroid Profile (TSH, T3, T4)',
    'Diabetes Screening (HbA1c, Fasting Sugar)',
    'Vitamin D & B12 Levels',
    'Electrolytes',
    'Urine Routine & Microscopy',
    'ECG',
    'Doctor Consultation'
  ],
  preparation: '8-12 hours fasting required. Drink water normally.',
  reportTime: '24-48 hours',
  sampleRequired: 'Blood & Urine',
  homeService: 'Available (Free in metro cities)',
  faqs: [
    {
      question: 'How long does the checkup take?',
      answer: 'Approximately 2-3 hours including sample collection and ECG.'
    },
    {
      question: 'Is fasting required?',
      answer: 'Yes, 8-12 hours fasting is required for accurate results.'
    },
    {
      question: 'Can I drink water before the test?',
      answer: 'Yes, you can drink normal water during fasting.'
    },
    {
      question: 'When will I get my reports?',
      answer: 'Within 24-48 hours. Digital reports will be sent to your email.'
    },
    {
      question: 'Is doctor consultation included?',
      answer: 'Yes, a free post-report doctor consultation is included.'
    }
  ],
  packages: [
    {
      name: 'Basic Health Checkup',
      price: 1999,
      tests: ['CBC', 'Blood Sugar', 'Lipid Profile', 'Urine Routine']
    },
    {
      name: 'Comprehensive Checkup',
      price: 3500,
      tests: ['80+ Tests', 'ECG', 'Doctor Consultation', 'All Basic Tests']
    },
    {
      name: 'Executive Health Checkup',
      price: 6500,
      tests: ['100+ Tests', 'Stress Test', 'Advanced Cardiac Markers', 'Full Body Analysis']
    }
  ]
}
}