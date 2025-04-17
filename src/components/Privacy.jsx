import React from 'react';

const Privacy = () => {
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto  text-gray">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-indigo-400">
        Privacy Policy
      </h1>

      <p className="mb-4 text-base leading-relaxed">
        At <strong>TechTinder</strong>, your privacy is our priority. This Privacy Policy describes how we collect, use, and protect your personal information when you use our platform.
      </p>
      
      <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <p className="mb-4 text-base leading-relaxed">
        We collect personal information you provide when creating an account, such as name, email, and tech skills. We also collect usage data to improve user experience.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4 text-base leading-relaxed">
        Your data helps us:
        <ul className="list-disc ml-6 mt-2">
          <li>Match you with relevant connections</li>
          <li>Improve platform features</li>
          <li>Send important updates (e.g., connection requests, policy changes)</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Data Protection</h2>
      <p className="mb-4 text-base leading-relaxed">
        We implement modern security practices to safeguard your information, including encryption and secure data storage. No third-party shares without your consent.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Third-Party Services</h2>
      <p className="mb-4 text-base leading-relaxed">
        We may integrate third-party services (like Razorpay) for features such as payments. These services have their own privacy policies which we encourage you to read.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Your Rights</h2>
      <p className="mb-4 text-base leading-relaxed">
        You can access, edit, or delete your data anytime by visiting your profile settings. For any privacy-related concerns, email us at <a href="mailto:support@techtinder.live" className="text-indigo-600 underline dark:text-indigo-400">support@techtinder.live</a>.
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-10">
        Last updated: April 2025
      </p>
    </div>
  );
};

export default Privacy;
