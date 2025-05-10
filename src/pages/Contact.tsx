import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, Check } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about our products, orders, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-primary-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary-900" size={20} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">Visit Us</h3>
                    <p className="text-gray-600 mt-1">
                      123 Fashion Street<br />
                      Design District<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary-900" size={20} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">Call Us</h3>
                    <p className="text-gray-600 mt-1">
                      +1 (555) 123-4567
                    </p>
                    <p className="text-gray-600 mt-1">
                      Mon-Fri: 9am - 6pm
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary-900" size={20} />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">Email Us</h3>
                    <p className="text-gray-600 mt-1">
                      info@elegance.com
                    </p>
                    <p className="text-gray-600 mt-1">
                      support@elegance.com
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="font-medium text-gray-900 mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-900 hover:bg-primary-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.3,8.22A4.47,4.47,0,0,0,16.86,8a4.27,4.27,0,0,0-4.22,4.22,4.28,4.28,0,0,0,.49,2A12.09,12.09,0,0,1,9.4,13.06,12.29,12.29,0,0,1,5.7,9.68,4.05,4.05,0,0,0,5.16,12a4.17,4.17,0,0,0,1.87,3.54,4.2,4.2,0,0,1-1.95-.54v.05A4.24,4.24,0,0,0,8.5,19.1a4.42,4.42,0,0,1-1.95.07,4.25,4.25,0,0,0,4,2.94A8.56,8.56,0,0,1,5.6,23.45,12.1,12.1,0,0,0,12,24c4.17,0,8.19-1.42,11-4a12.11,12.11,0,0,0,3-8c0-.18,0-.37,0-.55a8.61,8.61,0,0,0,2.14-2.19,8.5,8.5,0,0,1-2.46.67A4.19,4.19,0,0,0,18.3,8.22Z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-900 hover:bg-primary-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.06,7.05a2.5,2.5,0,0,0-1.76-1.77C18.83,5,12,5,12,5s-6.83,0-8.29.29A2.53,2.53,0,0,0,1.94,7.05,26.07,26.07,0,0,0,1.64,12a26.07,26.07,0,0,0,.3,4.95,2.5,2.5,0,0,0,1.76,1.77C5.17,19,12,19,12,19s6.83,0,8.29-.29a2.5,2.5,0,0,0,1.76-1.77A26.07,26.07,0,0,0,22.36,12,26.07,26.07,0,0,0,22.06,7.05ZM10,15V9l5.19,3Z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-900 hover:bg-primary-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM4.38,12c0-3.18,0-3.56.06-4.81C4.56,4.5,5.7,3.36,8.38,3.24,9.64,3.18,10,3.17,12,3.17s2.36,0,3.62.07c2.68.12,3.82,1.25,3.94,3.94.05,1.26.07,1.64.07,4.82s0,3.56-.07,4.82c-.12,2.69-1.26,3.82-3.94,3.94-1.26.05-1.64.07-3.62.07s-2.36,0-3.62-.07C5.7,20.64,4.56,19.5,4.44,16.81,4.38,15.56,4.38,15.18,4.38,12Zm2.82,0A4.8,4.8,0,1,1,12,16.8,4.8,4.8,0,0,1,7.2,12Zm1,0A3.8,3.8,0,1,0,12,8.2,3.8,3.8,0,0,0,8.2,12ZM16.76,6.95a1.12,1.12,0,1,0,1.12,1.12A1.12,1.12,0,0,0,16.76,6.95Z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-900 hover:bg-primary-200 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2.5A9.5,9.5,0,0,0,2.5,12V24H8.25V12h-3a6.75,6.75,0,0,1,13.5,0h-3V24h5.75V12A9.5,9.5,0,0,0,12,2.5Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-primary-900 mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="bg-success-50 border border-success-100 text-success-700 px-6 py-8 rounded-md flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} className="text-success-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                          errors.name ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                          errors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject*
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                        errors.subject ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                        errors.message ? 'border-red-300' : 'border-gray-300'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn btn-primary flex items-center justify-center ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        
        {/* Map section */}
        <div className="mt-12">
          <div className="rounded-lg overflow-hidden shadow-md h-96 bg-gray-200">
            {/* Placeholder for a map - in a real app, you would integrate Google Maps or another map provider */}
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <MapPin size={48} className="mx-auto text-primary-900 mb-3" />
                <p className="text-gray-700">
                  123 Fashion Street, Design District, San Francisco, CA 94107
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;