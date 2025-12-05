import { motion } from "framer-motion";
import { GraduationCap, Target, Users, Globe } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-red-500/10 to-transparent rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-red-500/10 to-transparent rounded-full translate-x-32 translate-y-32"></div>
      </div>

      <div className="relative z-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-2 rounded-full"
            >
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">Our Journey Since 2018</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Revolutionizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Education</span> for the Digital Age
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
                At CourseMaster, we believe that quality education should be accessible to everyone, everywhere. We're building the future of learning by connecting passionate instructors with curious students worldwide.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-slate-700/50"
              >
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Users className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">500K+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Students Enrolled</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-slate-700/50"
              >
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Globe className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">150+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Countries Reached</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Illustration */}
            <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-400 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden shadow-2xl shadow-red-500/20">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6">
                  <GraduationCap className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-white" />
                </div>

                <div className="space-y-4 text-white">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Learn Without Limits</h3>
                  <p className="text-sm sm:text-base md:text-lg text-red-100">
                    Join a global community committed to lifelong learning and skill development
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              {/* <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 shadow-lg"
              >
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">4.9★</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Rating</p>
                </div>
              </motion.div> */}

              {/* <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 shadow-lg"
              >
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">98%</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Success Rate</p>
                </div>
              </motion.div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;