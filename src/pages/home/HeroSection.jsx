import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Users, Award, Star, CheckCircle } from "lucide-react";

const HeroSection = ({ onSearch }) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-8 lg:py-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-2 rounded-full"
          >
            <Star className="w-4 h-4 fill-red-500" />
            <span className="text-sm font-medium">Trusted by 5000+ Students</span>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Master Your Future with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                Interactive
              </span>{" "}
              Learning
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg">
              Join our community of learners and get access to industry-leading courses taught by expert instructors.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Users className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">5K+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Award className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">100+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Expert Courses</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <CheckCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">98%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/courses"
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
            >
              <span>Start Learning Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            {/* <Link
              to="/courses"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-700 hover:border-red-600 dark:hover:border-red-400 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-semibold py-4 px-8 rounded-xl transition-all duration-300"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Watch Demo</span>
            </Link> */}
          </div>
        </motion.div>

        {/* Right Content - Interactive Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-400 rounded-3xl p-8 lg:p-10 shadow-2xl shadow-red-500/20 overflow-hidden">
            {/* Card Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <PlayCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Live Now</h3>
                    <p className="text-red-100 text-sm">Web Development Bootcamp</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm">3.2k watching</span>
                </div>
              </div>

              {/* Card Body - Course Preview */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-6">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-900 rounded-xl mb-4 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/90 dark:bg-slate-900/90 rounded-full flex items-center justify-center group hover:scale-110 transition-transform">
                      <PlayCircle className="w-8 h-8 text-red-600 group-hover:text-red-700" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 dark:text-white">Advanced React Patterns</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-300 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Alex Johnson</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">4.8</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="space-y-3">
                <div className="flex justify-between text-white text-sm">
                  <span>Course Progress</span>
                  <span className="font-semibold">65%</span>
                </div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-white to-red-100 rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            {/* <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Award className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">4.8/5</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Platform Rating</p>
                </div>
              </div>
            </motion.div> */}

            {/* <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-300 rounded-full border-2 border-white dark:border-slate-800"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">+500</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Joined Today</p>
                </div>
              </div>
            </motion.div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;