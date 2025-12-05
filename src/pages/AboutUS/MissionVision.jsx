import { motion } from "framer-motion";
import { Target, Eye, Rocket, Heart } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-2 rounded-full mb-4"
          >
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Our Purpose</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Our Mission & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Vision</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Driving educational transformation through innovation and accessibility
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              
              <div className="relative z-10">
                <div className="inline-flex p-3 sm:p-4 bg-gradient-to-br from-red-600 to-red-400 rounded-xl sm:rounded-2xl mb-6">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  To democratize quality education by making it accessible, affordable, and engaging for learners worldwide. We empower individuals to acquire relevant skills and knowledge that drive personal and professional growth.
                </p>

                <div className="space-y-3">
                  {[
                    "Provide accessible learning opportunities for all",
                    "Empower instructors to share their expertise",
                    "Foster a global community of lifelong learners",
                    "Bridge the gap between education and employment"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="relative bg-gradient-to-br from-red-600 to-red-400 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-32 translate-y-32"></div>
              </div>

              <div className="relative z-10 text-white">
                <div className="inline-flex p-3 sm:p-4 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl mb-6">
                  <Eye className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Our Vision
                </h3>
                <p className="text-red-100 mb-6">
                  To create a world where anyone, anywhere can transform their life through education. We envision a future where learning is personalized, interactive, and seamlessly integrated into everyone's daily life.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Rocket className="w-5 h-5 text-yellow-300" />
                    <span className="font-medium">Global Learning Ecosystem</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-red-200" />
                    <span className="font-medium">Lifelong Learning Culture</span>
                  </div>
                </div>

                {/* Vision Milestones */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                    <p className="text-2xl font-bold">2025</p>
                    <p className="text-sm text-red-100">1M+ Students</p>
                  </div>
                  <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                    <p className="text-2xl font-bold">2030</p>
                    <p className="text-sm text-red-100">Global Standard</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;