import React, { useState } from "react";
import logo from '../../assets/logo.png' 
import './footer.css'

const Footer = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-blue-400 transition">Home</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition">About</a></li>
              <li><a href="#Contact" className="hover:text-blue-400 transition">Contact</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Get Started</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">About Our Project</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">Welcome to Memoria, your trusted partner in cognitive care. We offer an advanced suite of AI and IoT solutions, ensuring an exceptional support experience for families and caregivers. Our commitment to compassionate innovation and patient well-being sets us apart in health technology</p>
            <a href='#home' aria-label='logo'>
            <img
              src={logo}
              alt="Company Logo"
              className="hov h-10 w-auto mb-4"
            />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6">
                                                
                        <div className="card">
                        <ul>
                            <li className="iso-pro">
                            <span></span>
                            <span></span>
                            <span></span>
                            <a href="https://www.linkedin.com/in/marwane-haddane/" target="blank">
                                <svg
                               viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="svg"
                                >
                                <path
                                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg></a>
                            <div className="text">Marwane</div>
                            </li>
                            <li className="iso-pro">
                            <span></span>
                            <span></span>
                            <span></span>
                            {/* -------------------------------- link achraf */}
                            <a href="">
                                <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="svg"
                                >
                                <path
                                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                                </svg>
                            </a>
                            <div className="text">achraf</div>
                            </li>
                            <li className="iso-pro">
                            <span></span>
                            <span></span>
                            <span></span>
                            {/* -------------------------------- link hajar */}
                            <a href="">
                                <svg
                               viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="svg"
                                >
                                <path
                                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                                </svg>
                            </a>
                            <div className="text">Hajar</div>
                            </li>
                            <li className="iso-pro">
                            <span></span>
                            <span></span>
                            <span></span>
                            {/* -------------------------------- link kawtar */}
                            <a href="">
                                <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="svg"
                                >
                                <path
                                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                                </svg>
                            </a>
                            <div className="text">Kawtar</div>
                            </li>
                        </ul>
                        </div>

            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookie Settings</a>
            </div>

            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Memoria. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer

