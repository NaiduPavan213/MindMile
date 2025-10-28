import React, { useState } from 'react';
import { LocationIcon } from '../icons/CardIcons';

const JobApplicationPage = ({ job, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    resumeVersion: 'My First Resume',
    coverLetter: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSubmitted) {
    return (
      <main className="flex-grow w-full bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center">
        <div className="text-center card p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Application Sent!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Your application for the {job.role} position at {job.company} has
            been successfully submitted.
          </p>
          <button onClick={onClose} className="btn btn-primary mt-6">
            Back to Jobs
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onClose}
          className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 mb-6"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Jobs
        </button>

        <div className="max-w-2xl mx-auto card overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700">
            {/* Header and Progress */}
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={job.logoUrl}
                alt={`${job.company} logo`}
                className="w-16 h-16 rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Apply to {job.company}
                </h1>
                <p className="text-md font-semibold text-gray-700 dark:text-gray-300">
                  {job.role}
                </p>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs font-semibold text-center">
              <div
                className={`flex-1 ${
                  step >= 1 ? 'text-purple-600' : 'text-gray-400'
                }`}
              >
                Contact Info
              </div>
              <div
                className={`flex-1 h-0.5 ${
                  step >= 2 ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              ></div>
              <div
                className={`flex-1 ${
                  step >= 2 ? 'text-purple-600' : 'text-gray-400'
                }`}
              >
                Resume
              </div>
              <div
                className={`flex-1 h-0.5 ${
                  step >= 3 ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              ></div>
              <div
                className={`flex-1 ${
                  step >= 3 ? 'text-purple-600' : 'text-gray-400'
                }`}
              >
                Review
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Step 1: Contact Information
                </h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-sm font-semibold">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Step 2: Resume & Cover Letter
                </h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-sm font-semibold">
                      Select MindMile Resume
                    </label>
                    <select
                      name="resumeVersion"
                      value={formData.resumeVersion}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option>My First Resume</option>
                      <option>AI/ML Focus Resume</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold">
                      Cover Letter (Optional)
                    </label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Why are you a good fit for this role?"
                      className="input-field"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Step 3: Review & Submit
                </h2>
                <div className="mt-4 space-y-3 text-sm border p-4 rounded-lg dark:border-gray-700">
                  <p>
                    <strong>Name:</strong> {formData.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                  <p>
                    <strong>Resume Attached:</strong> {formData.resumeVersion}
                  </p>
                  <p>
                    <strong>Cover Letter:</strong>{' '}
                    {formData.coverLetter || 'Not provided'}
                  </p>
                </div>
              </div>
            )}

            <div className="border-t dark:border-gray-700 pt-6 flex justify-between items-center">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="btn btn-secondary"
                >
                  Back
                </button>
              )}
              <div className="flex-grow"></div>
              {step < 3 && (
                <button
                  onClick={() => setStep(step + 1)}
                  className="btn btn-primary"
                >
                  Next
                </button>
              )}
              {step === 3 && (
                <button
                  onClick={() => setIsSubmitted(true)}
                  className="btn btn-primary"
                >
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobApplicationPage;
