import { motion } from "framer-motion";
import { Smartphone, UserCheck, Clock, Award, TrendingUp, Users } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Learn Anywhere",
      description: "Mobile-friendly interface. Study on any device, anytime, anywhere.",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: UserCheck,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience.",
      gradient: "from-red-600 to-pink-500"
    },
    {
      icon: Clock,
      title: "Lifetime Access",
      description: "Unlimited access to purchased courses. Learn at your own pace forever.",
      gradient: "from-red-700 to-purple-500"
    },
    {
      icon: Award,
      title: "Certification",
      description: "Get industry-recognized certificates upon course completion.",
      gradient: "from-red-400 to-yellow-400"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Courses designed to boost your career and salary potential.",
      gradient: "from-red-500 to-rose-500"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join discussions and get help from peers and instructors.",
      gradient: "from-red-600 to-amber-500"
    },
  ];

  return (
    <section className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500 rounded-full translate-y-32 -translate-x-32"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-2 rounded-full mb-6"
          >
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Why We're Different</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Thousands</span> Choose CourseMaster
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Experience a learning platform built for modern students with cutting-edge features
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-red-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Card */}
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 rounded-2xl p-8 transition-all duration-300 group-hover:bg-white dark:group-hover:bg-slate-800 group-hover:shadow-xl group-hover:border-red-200/30 dark:group-hover:border-red-900/30">
                {/* Icon Container */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  className="h-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-full mt-4"
                />

                {/* Number Indicator */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </span>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                  <div className={`absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br ${feature.gradient} opacity-20 rounded-full`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl px-8 py-6">
            <div className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 dark:text-white">
                Start your learning journey today
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join thousands of successful learners
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;