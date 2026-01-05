"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const contactMethods = [
    {
      icon: <FiPhone />,
      title: "Call Us",
      details: ["1800-123-4567", "+91-9876543210"],
      description: "Available 24/7 for emergencies",
    },
    {
      icon: <FiMail />,
      title: "Email Us",
      details: ["info@quickscan.com", "support@quickscan.com"],
      description: "Response within 2 hours",
    },
    {
      icon: <FiMapPin />,
      title: "Visit Us",
      details: ["123 Medical Street, Mumbai", "400001, Maharashtra, India"],
      description: "Head Office: 9 AM - 7 PM",
    },
  ];

  const subjects = [
    "Booking Related Query",
    "Report Issue",
    "Billing & Payments",
    "Partner with Us",
    "Career Opportunities",
    "Feedback & Suggestions",
    "Other",
  ];

  return (
    <div className="pt-35 pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 py-16">
        <div className="container-custom px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need assistance? We&apos;re here to help you 24/7.
            Reach out through any of these channels.
          </p>
        </div>
      </div>

      <div className="container-custom px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Methods */}
          <div>
            <div className="space-y-8">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                  <div className="text-blue-600 text-3xl mb-4">
                    {method.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{method.title}</h3>
                  <div className="space-y-2 mb-3">
                    {method.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-700">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              ))}
            </div>

            {/* Emergency Contact */}
            <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-800 mb-3">
                🚨 Emergency Contact
              </h3>
              <p className="text-red-700 mb-4">
                For medical emergencies requiring immediate attention
              </p>
              <div className="text-2xl font-bold text-red-600">108 / 102</div>
              <p className="text-sm text-red-600 mt-2">
                Ambulance & Emergency Services
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible
              </p>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please describe your query in detail..."
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full md:w-auto border-0"
                >
                  <FiSend className="inline mr-2" />
                  Send Message
                </Button>
              </form>

              {/* Response Time */}
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center text-green-600">
                  <FiCheckCircle className="mr-2" />
                  <span className="font-medium">
                    Average response time: 30 minutes
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Our support team works round the clock to ensure you get
                  timely assistance
                </p>
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="mt-8 bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6">Quick Answers</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">
                    How can I track my report?
                  </h4>
                  <p className="text-gray-600">
                    Login to your dashboard or use the tracking link sent to
                    your email/SMS.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    Can I reschedule my appointment?
                  </h4>
                  <p className="text-gray-600">
                    Yes, you can reschedule up to 12 hours before your
                    appointment through your dashboard.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    Do you provide corporate health checkups?
                  </h4>
                  <p className="text-gray-600">
                    Yes, we offer customized corporate health packages. Contact
                    our corporate team.
                  </p>
                </div>
              </div>
              <Button
                href="/faq"
                variant="outline"
                className="mt-6 no-underline"
              >
                View All FAQs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
