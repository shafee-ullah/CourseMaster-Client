import { motion } from "framer-motion";
import { Code, GraduationCap, Rocket, Target, Award, ChevronRight } from "lucide-react";

const LearningTimelineSection = () => {
  const steps = [
    { 
      step: "01", 
      title: "Choose Your Path", 
      desc: "Select from 100+ career-focused courses",
      icon: Target,
      color: "from-red-500 to-orange-500"
    },
    { 
      step: "02", 
      title: "Learn by Doing", 
      desc: "Hands-on projects and real-world scenarios",
      icon: Code,
      color: "from-red-600 to-pink-500"
    },
    { 
      step: "03", 
      title: "Get Certified", 
      desc: "Earn industry-recognized certificates",
      icon: Award,
      color: "from-red-700 to-purple-500"
    },
    { 
      step: "04", 
      title: "Launch Career", 
      desc: "Get job-ready with portfolio building",
      icon: Rocket,
      color: "from-red-400 to-yellow-400"
    },
  ];

  return (
    <section className="relative overflow-hidden py-8 px-8">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-500/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-red-500/10 to-transparent"></div>
        {/* Animated Orbs */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-red-500/5 to-transparent rounded-full"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-tl from-red-500/5 to-transparent rounded-full"
        />
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Visual Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Graphic */}
            <div className="relative">
              {/* Center Circle */}
              <div className="relative w-64 h-64 mx-auto">
                {/* Outer Rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-red-500/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 border-4 border-red-600/20 rounded-full"
                />
                
                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-400 rounded-full blur-xl opacity-50"></div>
                    <div className="relative w-40 h-40 bg-gradient-to-br from-red-600 to-red-400 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-20 h-20 text-white" />
                    </div>
                  </div>
                </div>

                {/* Floating Icons */}
                {steps.map((step, index) => {
                  const angle = (index * 360) / steps.length;
                  const radian = (angle * Math.PI) / 180;
                  const radius = 140;
                  const x = radius * Math.cos(radian);
                  const y = radius * Math.sin(radian);

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.3 }}
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                      style={{
                        position: 'absolute',
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress Indicator */}
              <div className="mt-12 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Beginner</span>
                  <span className="text-sm font-semibold text-red-600 dark:text-red-400">Expert Level</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2 }}
                    className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Steps */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-4 py-2 rounded-full mb-4"
              >
                <Rocket className="w-4 h-4" />
                <span className="text-sm font-medium">Learning Path</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Your Journey to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Mastery</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Follow our proven 4-step path from beginner to expert in just 30 days
              </p>
            </div>

            {/* Steps List */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ x: 10 }}
                  className="group flex items-center gap-6 p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-slate-700/50 hover:border-red-200/50 dark:hover:border-red-900/30 transition-all duration-300"
                >
                  {/* Step Number */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                    {step.step}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                        {step.title}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.desc}
                    </p>
                  </div>

                  {/* Connecting Line (except last) */}
                  {index < steps.length - 1 && (
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-red-600/20 to-transparent"></div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">30</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Days to Mastery</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">95%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LearningTimelineSection;