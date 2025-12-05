import { motion } from "framer-motion";
import { Heart, Target, Users, Shield, TrendingUp, Zap, Globe, Award } from "lucide-react";

const CompanyValues = () => {
  const values = [
    {
      icon: Heart,
      title: "Student Success",
      description: "We measure our success by the achievements of our students",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every course and interaction",
      color: "from-red-600 to-orange-500"
    },
    {
      icon: Users,
      title: "Community",
      description: "We foster a supportive learning community worldwide",
      color: "from-red-700 to-purple-500"
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We maintain transparency and trust in all relationships",
      color: "from-red-400 to-yellow-400"
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We continuously innovate to enhance learning experiences",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: Zap,
      title: "Accessibility",
      description: "We make quality education accessible to everyone",
      color: "from-red-600 to-amber-500"
    }
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
      <div className="">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-2 rounded-full mb-4"
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Our Values</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            The Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Values</span> That Guide Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            These principles shape every decision we make and every course we create
          </motion.p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative"
            >
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-200/50 dark:border-slate-700/50 transition-all duration-300 group-hover:shadow-2xl">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${value.color} mb-6`}>
                  <value.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-600/30 dark:group-hover:border-red-400/30 transition-colors duration-300 pointer-events-none"></div>
              </div>

              {/* Connecting Lines (Desktop Only) */}
              {index < values.length - 1 && (
                <div className="hidden lg:block">
                  <div className={`absolute top-1/2 right-0 w-8 h-0.5 bg-gradient-to-r ${value.color} -translate-y-1/2 translate-x-1/2 ${
                    (index + 1) % 3 === 0 ? 'hidden' : ''
                  }`}></div>
                  {index < 2 && (
                    <div className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-gradient-to-b from-red-600 to-red-400 -translate-x-1/2 translate-y-1/2"></div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Value Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 sm:mt-20 bg-gradient-to-r from-red-600 to-red-400 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-white overflow-hidden"
        >
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <Globe className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 opacity-80" />
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Our Commitment to Global Education
            </h3>
            <p className="text-lg sm:text-xl text-red-100 mb-8">
              We're dedicated to breaking down barriers to education and creating opportunities 
              for learners worldwide. Every feature, every course, and every partnership is built 
              with this mission in mind.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10">
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-yellow-300" />
                <p className="text-2xl sm:text-3xl font-bold">25+</p>
                <p className="text-sm text-red-100">Awards Won</p>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-red-100" />
                <p className="text-2xl sm:text-3xl font-bold">2K+</p>
                <p className="text-sm text-red-100">Expert Instructors</p>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <Globe className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-red-100" />
                <p className="text-2xl sm:text-3xl font-bold">50+</p>
                <p className="text-sm text-red-100">Languages</p>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-red-100" />
                <p className="text-2xl sm:text-3xl font-bold">99%</p>
                <p className="text-sm text-red-100">Retention Rate</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyValues;