import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, Users, Rocket, ArrowRight, MapPin, Clock, DollarSign, Award } from "lucide-react";

const CareerOpportunities = () => {
  const positions = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote",
      salary: "$120K - $160K"
    },
    {
      title: "Product Designer",
      department: "Design",
      type: "Full-time",
      location: "San Francisco, CA",
      salary: "$100K - $140K"
    },
    {
      title: "Learning Experience Specialist",
      department: "Education",
      type: "Full-time",
      location: "Remote",
      salary: "$90K - $130K"
    },
    {
      title: "Growth Marketing Manager",
      department: "Marketing",
      type: "Full-time",
      location: "New York, NY",
      salary: "$110K - $150K"
    }
  ];

  const benefits = [
    { icon: Rocket, title: "Career Growth", description: "Clear promotion paths and skill development" },
    { icon: Users, title: "Great Team", description: "Work with passionate, talented colleagues" },
    { icon: Award, title: "Impact", description: "Make a real difference in education" },
    { icon: DollarSign, title: "Competitive Pay", description: "Above-market compensation packages" }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-2 rounded-full mb-4"
          >
            <Briefcase className="w-4 h-4" />
            <span className="text-sm font-medium">Join Our Team</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Build The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Education</span> With Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            Join our mission-driven team and help shape the future of online learning
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Open Positions */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Open Positions
            </h3>
            
            <div className="space-y-4">
              {positions.map((position, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-slate-700/50 transition-all duration-300 group-hover:shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {position.title}
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm">
                            {position.department}
                          </span>
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                            <MapPin className="w-3 h-3" /> {position.location}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:items-end gap-2">
                        <span className="text-lg font-bold text-red-600 dark:text-red-400">
                          {position.salary}
                        </span>
                        <button className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold text-sm">
                          Apply Now
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 border-2 border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                <span>View All Positions</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div> */}
          </div>

          {/* Benefits & Culture */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why Join CourseMaster?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg border border-gray-200/50 dark:border-slate-700/50"
                >
                  <div className="inline-flex p-3 bg-red-100 dark:bg-red-900/30 rounded-xl mb-3">
                    <benefit.icon className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Culture Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-red-600 to-red-400 rounded-2xl p-6 sm:p-8 text-white"
            >
              <h4 className="text-xl font-bold mb-4">Our Culture</h4>
              <p className="text-red-100 mb-6">
                We foster a culture of innovation, collaboration, and continuous learning. 
                Every team member has the opportunity to grow, contribute, and make an impact.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                  <p className="text-2xl font-bold">4.8/5</p>
                  <p className="text-xs text-red-100">Employee Satisfaction</p>
                </div>
                <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                  <p className="text-2xl font-bold">50%</p>
                  <p className="text-xs text-red-100">Women in Leadership</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl sm:rounded-3xl p-8 sm:p-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Make an Impact?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Join our team of passionate educators, engineers, and innovators building 
              the future of online learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/careers"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25"
              >
                <Briefcase className="w-5 h-5" />
                <span>View Open Positions</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-red-600 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold py-3 px-8 rounded-xl transition-all duration-300"
              >
                <span>Contact Our Team</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default CareerOpportunities;