import { Link } from 'react-router-dom';
import logo from '../images/sn2.png'; // Alternate logo if needed

const Footer = () => {
  return (
    <footer className="w-full bg-blue-900 text-white mt-20 border-t-8 border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo and Social Links */}
        <div className="flex flex-col items-center mb-12">
          <Link to="/" className="mb-8 hover:scale-110 transition-transform duration-300">
            <img 
              src={logo} 
              alt="SecureNotez Logo" 
              className="h-64 w-auto"
            />
          </Link>
          
          <div className="flex space-x-6 mb-8">
            <a href="#" className="text-blue-300 hover:text-white transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            
            <a href="#" className="text-blue-300 hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-blue-300">SecureNotez</h3>
            <p className="text-sm text-blue-200">
              Your trusted digital notebook with military-grade security and seamless synchronization.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-blue-300">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-blue-200 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/seeNotes" className="text-blue-200 hover:text-white transition-colors">My Notes</Link></li>
              <li><Link to="/security" className="text-blue-200 hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-blue-300">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-blue-300">Contact</h3>
            <p className="text-blue-200">support@securenotez.com</p>
            <p className="text-blue-200">+91 6367710137</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-blue-800 text-center">
          <p className="text-sm text-blue-300">
            &copy; {new Date().getFullYear()} SecureNotez. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;