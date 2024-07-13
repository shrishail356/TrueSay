import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-black text-gray-300 py-4 mb-4 text-center">
      <p>
        Designed and Developed by{" "}
        <a
          href="https://chinmay.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-200 font-bold"
        >
          Chinmay Patil
        </a>{" "}
        and{" "}
        <a
          href="https://devfolio.co/@shrishail_000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-200 font-bold"
        >
          Shrishail Patil
        </a>{" "}
        for the <span className="font-bold">Hacker House Goa 2024</span>
      </p>
    </footer>
  );
};

export default Footer;
