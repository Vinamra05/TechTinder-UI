import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content p-4 text-center fixed bottom-0 shadow-md w-full mt-auto">
      <div className="flex flex-col items-center gap-2">
        
       
        <div className="flex gap-3">
          <a href="https://github.com/Vinamra05" target="_blank" className="hover:opacity-80 transition duration-300">
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/github.png"
              alt="GitHub"
              className="h-7 w-7 filter dark:invert"
            />
          </a>
          <a href="https://www.linkedin.com/in/vinamra-sharma-84981a289/" target="_blank" className="hover:opacity-80 transition duration-300">
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/linkedin.png"
              alt="LinkedIn"
              className="h-7 w-7 filter  dark:invert"
            />
          </a>
          <a href="https://x.com/VinamraSharma05"  target="_blank"  className="hover:opacity-80 transition duration-300">
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
