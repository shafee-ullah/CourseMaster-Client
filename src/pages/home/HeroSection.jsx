import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Star } from "lucide-react";
import SearchBar from "../../components/SearchBar";

const HeroSection = ({ onSearch }) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Unlock Your Future with{" "}
          <span className="text-red-600 dark:text-red-400">New Skills</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Join thousands of students learning from industry experts. Start your
          journey to success today with our comprehensive online courses.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-2xl transition-colors"
          >
            Explore Courses
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 border-2 border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold py-3 px-8 rounded-2xl transition-colors"
          >
            Learn More
          </Link>
        </div>
        {/* Search Bar */}
        <div className="max-w-md">
          <SearchBar onSearch={onSearch} placeholder="Search for courses..." />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-center h-64">
            <GraduationCap className="w-32 h-32 opacity-80" />
          </div>
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4"
        >
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-gray-900 dark:text-white">
              4.8/5 Rating
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

