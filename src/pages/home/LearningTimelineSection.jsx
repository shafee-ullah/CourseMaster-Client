import { motion } from "framer-motion";
import { Code, GraduationCap } from "lucide-react";

const LearningTimelineSection = () => {
  const steps = [
    { step: "Step 1", title: "Enroll", desc: "Choose your course and enroll" },
    { step: "Step 2", title: "Watch", desc: "Learn from video lessons" },
    { step: "Step 3", title: "Certificate", desc: "Get your completion certificate" },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="relative">
            <Code className="w-48 h-48 text-red-600 dark:text-red-400 opacity-50" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <GraduationCap className="w-24 h-24 text-red-400" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Go from Beginner to Master in 30 Days
          </h2>
          <p className="text-gray-300 mb-8">
            Follow our structured learning path and transform your skills with
            expert guidance.
          </p>
          <div className="space-y-4">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningTimelineSection;

