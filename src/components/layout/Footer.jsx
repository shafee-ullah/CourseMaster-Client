import { Link, useLocation } from "react-router-dom";
import { BookOpen, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";


const Footer = () => {
  const location = useLocation();

  // Hide footer on the login page
  if (location && location.pathname === "/login") return null;

  return (
    <footer className="bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300 mt-16">
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-red-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">CourseMaster</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Your gateway to quality education. Learn from experts and unlock your potential.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors border border-gray-200 dark:border-transparent"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors border border-gray-200 dark:border-transparent"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors border border-gray-200 dark:border-transparent"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors border border-gray-200 dark:border-transparent"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              {/* <li>
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                  Login
                </Link>
              </li> */}
                            <li>
                <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                  About CourseMaster
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to get updates on new courses and offers.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition-colors"
              >
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 dark:border-slate-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} CourseMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;