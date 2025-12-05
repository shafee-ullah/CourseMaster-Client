import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, Users, TrendingUp, Award, Sparkles } from "lucide-react";

const InstructorCTASection = ({ user }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden "
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-red-400"></div>
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        {/* Animated Elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-white/20 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">For Experts & Professionals</span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Share Your <span className="text-yellow-300">Expertise</span> with the World
            </h2>
            
            <p className="text-xl text-red-100 mb-8">
              Join our community of top instructors and teach what you love. 
              Reach thousands of students worldwide and earn while making an impact.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">$2K+</p>
                  <p className="text-sm text-red-100">Avg. Monthly Income</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5K+</p>
                  <p className="text-sm text-red-100">Total Students</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {[
                "No upfront costs - we handle everything",
                "Keep 70% of your course revenue",
                "Professional video production support",
                "Global marketing and promotion"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  <span className="text-red-100">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            {/* <Link
              to={user ? "/admin/dashboard" : "/login"}
              className="group inline-flex items-center gap-3 bg-white text-red-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-2xl shadow-lg"
            >
              <span>Start Teaching Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link> */}
          </motion.div>

          {/* Right Content - Instructor Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              {/* Card Content */}
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-white to-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <GraduationCap className="w-12 h-12 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Meet Sarah Chen</h3>
                <p className="text-red-100 mb-4">Top Instructor • 25,000+ Students</p>
                <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Award className="w-4 h-4 text-yellow-300" />
                  <span className="text-white text-sm">$45K earned last month</span>
                </div>
              </div>

              {/* Course Stats */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">3</p>
                    <p className="text-sm text-red-100">Courses</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">4.9★</p>
                    <p className="text-sm text-red-100">Avg. Rating</p>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="relative">
                <div className="absolute -top-4 left-4 text-6xl text-white/20">"</div>
                <p className="text-red-100 italic relative z-10">
                  Teaching on CourseMaster has been life-changing. I get to share my passion 
                  while reaching students worldwide.
                </p>
                <div className="absolute -bottom-4 right-4 text-6xl text-white/20">"</div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-2xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-white" />
                <span className="text-sm font-bold text-white">Top 1%</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">500+ Students</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default InstructorCTASection;