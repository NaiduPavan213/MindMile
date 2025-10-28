import React from 'react';
import { AdvancedAnalyticsIcon, AIMentorIcon, ExclusiveContentIcon, PremiumStarIcon } from '../icons/PageIcons';

const BenefitCard = ({ icon, title, description }) => (
  <div className="text-center p-6">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/50 mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const FeatureCheck = ({ children, isPremium }) => (
  <td className={`py-3 px-4 ${isPremium ? 'text-center' : ''}`}>
    {isPremium ? (
      <span className="inline-block text-purple-500">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    ) : (
      <span className="text-gray-500 dark:text-gray-400">{children}</span>
    )}
  </td>
);

const Premium = () => {
  return (
    <main className="flex-grow w-full bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-white dark:bg-gray-800">
        <PremiumStarIcon className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Unlock Your Full Potential with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
            MindMile Premium
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
          Accelerate your career with AI-powered mentorship, advanced analytics, and exclusive learning content.
        </p>
        <button className="btn btn-primary mt-8 text-lg px-8 py-3">Upgrade to Premium</button>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard
              icon={<AIMentorIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />}
              title="AI-Powered Mentor"
              description="Get 24/7 personalized career advice, resume reviews, and mock interview practice."
            />
            <BenefitCard
              icon={<AdvancedAnalyticsIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />}
              title="Advanced Analytics"
              description="See who's viewed your profile, how you compare to other applicants, and track skill growth."
            />
            <BenefitCard
              icon={<ExclusiveContentIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />}
              title="Exclusive Content"
              description="Access to premium-only courses, workshops, and learning roadmaps from industry experts."
            />
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-12">Compare Plans</h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">Feature</th>
                  <th scope="col" className="py-3 px-6 text-center">Basic (Free)</th>
                  <th scope="col" className="py-3 px-6 text-center">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Personalized Feed</td>
                  <FeatureCheck isPremium={true}></FeatureCheck>
                  <FeatureCheck isPremium={true}></FeatureCheck>
                </tr>
                <tr className="bg-gray-50 border-b dark:bg-gray-900/50 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Career Roadmaps</td>
                  <FeatureCheck isPremium={false}>Limited Access</FeatureCheck>
                  <FeatureCheck isPremium={true}></FeatureCheck>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Profile Analytics</td>
                  <FeatureCheck isPremium={false}>Basic Views</FeatureCheck>
                  <FeatureCheck isPremium={true}></FeatureCheck>
                </tr>
                <tr className="bg-gray-50 border-b dark:bg-gray-900/50 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">AI Mentor</td>
                  <FeatureCheck isPremium={false}>-</FeatureCheck>
                  <FeatureCheck isPremium={true}></FeatureCheck>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Exclusive Content</td>
                  <FeatureCheck isPremium={false}>-</FeatureCheck>
                  <FeatureCheck isPremium={true}></FeatureCheck>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Ready to Take the Next Step?</h2>
          <p className="mt-4 max-w-xl mx-auto text-gray-600 dark:text-gray-300">
            Join MindMile Premium today and start your journey towards success with the best tools at your disposal.
          </p>
          <button className="btn btn-primary mt-8 text-lg px-8 py-3">Upgrade Now</button>
        </div>
      </section>
    </main>
  );
};

export default Premium;
