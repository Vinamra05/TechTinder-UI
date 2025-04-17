import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
  return (
    <div className="px-6 py-10 md:px-20 lg:px-40 text-gray transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-primary">About TechTinder</h1>

      <p className="mb-4 leading-relaxed text-base">
        <strong>TechTinder</strong> is your one-stop networking hub, crafted especially for developers, students, and tech enthusiasts looking to connect, collaborate, and grow. Whether you're building side projects, hunting for teammates, or just expanding your network — TechTinder gives you the right match at the right time.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-green-400">🔧 Core Features</h2>
      <ul className="list-disc list-inside space-y-2 text-base">
        <li>🎯 Skill-based profile matching — find users who actually match your vibe.</li>
        <li>🫱🏼‍🫲🏼 "Interested" or "Ignore" actions for clean and intuitive connections.</li>
        <li>📨 Real-time email notifications when someone sends you a request.</li>
        <li>📅 Daily cron jobs remind users about missed connection requests.</li>
        <li>🔒 Secure authentication, built with JWT and bcrypt hashing.</li>
        <li>🌐 Fully responsive UI with support for both Light and Dark modes.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-cyan-400">💎 Premium Subscriptions</h2>
      <p className="mb-4 leading-relaxed text-base">
        Upgrade to <strong>TechTinder Pro</strong> to unlock advanced filters, can send Infinite connection requests , Blue Tick , priority listing, AI-assisted suggestions, and deep profile analytics.
      </p>
      <p className="text-sm text-red-500 dark:text-red-400 mb-6">
        🚫 Note: All premium purchases will be final. We follow a strict <strong>no refund policy</strong> on premium plans.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-fuchsia-400">🧠 AI Integration – Coming Soon!</h2>
      <p className="mb-4 leading-relaxed text-base">
        We're cooking something big — soon you'll be able to get smart connection recommendations, automatic skill-based suggestions, and natural language insights from your network history using integrated AI models.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-accent">Meet the Developer 🚀</h2>
      <p className="mb-4 leading-relaxed text-base">
        Hi, I'm <strong>Vinamra Sharma</strong>, the creator behind TechTinder. I'm currently pursuing my Masters of Computer Applications and am passionate about building innovative, performance-optimized full-stack applications.
      </p>
      <p className="mb-4 leading-relaxed text-base">
      My tech stack includes <strong>MERN (MongoDB, Express, React, Node)</strong>, and I’m skilled in <strong>data structures, algorithms</strong>, and backend engineering. I also have hands‑on experience with cloud services like AWS (SES, EC2,IAM , Polly , S3), real‑time features, and email automation. Additionally, I’m proficient in HTML, CSS, Tailwind CSS, Redux, Django, RESTful APIs, Docker, Git & GitHub, and database management with MySQL and MongoDB. I believe in creating systems that are fast, scalable, and user-friendly.
      </p>
      <p className="mb-4 leading-relaxed text-base">
        This app is not just a project — it’s a reflection of what’s possible when passion meets code. Feel free to connect with me or reach out if you'd like to collaborate, discuss tech, or hire!
      </p>

      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-10">
        Built with ❤️ and JavaScript. All rights reserved © {new Date().getFullYear()} TechTinder.
      </p>

      <div className="mt-6 space-y-2 text-base">
        <p>
          📧 <strong>Email:</strong>{' '}
          <a href="mailto:vinamrasharma0523@gmail.com" className="text-purple-600 dark:text-purple-400 hover:underline">
            vinamrasharma0523@gmail.com
          </a>
        </p>
        <p>
          📞 <strong>Phone:</strong>{' '}
          <a href="tel:+919548640422" className="text-purple-600 dark:text-purple-400 hover:underline">
            +91 9548640422
          </a>
        </p>
        <p>
          💻 <strong>GitHub:</strong>{' '}
          <a href="https://github.com/vinamra05" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
            github.com/vinamra05
          </a>
        </p>
        <p>
          🔗 <strong>LinkedIn:</strong>{' '}
          <a href="https://www.linkedin.com/in/vinamra-sharma-84981a289/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
            linkedin.com/in/vinamrasharma
          </a>
        </p>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-10">
        Built with ❤️, caffeine, and JavaScript. All rights reserved © {new Date().getFullYear()} TechTinder.
      </p>


      
      <div className="mt-7">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-purple-500 cursor-pointer text-white rounded-md hover:bg-purple-700 transition-all"
        >
          ⬅️ Back to Home
        </button>
    
      </div>
    </div>
  );
};

export default About;
