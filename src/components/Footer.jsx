import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const baseClass = `
    relative text-md font-medium px-1 transition duration-300
    after:content-[''] after:absolute after:left-0 after:-bottom-1
    after:h-[2px] after:bg-indigo-500 after:transition-all after:duration-300
    after:w-0 hover:after:w-full
  `;

  const activeClass = `
    text-indigo-500 after:w-full
  `;

  return (
    <footer className="bg-base-300 text-base-content p-4 text-center shadow-md w-full mt-auto">
      <div className="flex flex-wrap justify-center gap-4 items-center mb-3">
        <NavLink
          to="/privacy-policy"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          Privacy Policy
        </NavLink>

        <NavLink
          to="/terms"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          Terms & Conditions
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          About
        </NavLink>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-3">
          <a
            href="https://github.com/Vinamra05"
            target="_blank"
            className="hover:opacity-80 transition duration-300"
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/github.png"
              alt="GitHub"
              className="h-7 w-7 filter dark:invert"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/vinamra-sharma-84981a289/"
            target="_blank"
            className="hover:opacity-80 transition duration-300"
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/linkedin.png"
              alt="LinkedIn"
              className="h-7 w-7 filter dark:invert"
            />
          </a>
          <a
            href="https://x.com/VinamraSharma05"
            target="_blank"
            className="hover:opacity-80 transition duration-300"
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/twitter.png"
              alt="Twitter"
              className="h-7 w-7 filter dark:invert"
            />
          </a>
        </div>

        <p className="text-[16px] opacity-70 transition duration-300">
          techTinder © {new Date().getFullYear()} Made with ❤️ by Vinamra.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
