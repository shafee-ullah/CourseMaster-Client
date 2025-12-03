import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Web Developer",
      text: "CourseMaster transformed my career. The courses are comprehensive and the instructors are amazing!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      text: "Best investment I've made. The quality of content is outstanding and the learning path is clear.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "UI/UX Designer",
      text: "I love how I can learn at my own pace. The lifetime access is a game-changer!",
      rating: 5,
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          What Our Students Say
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Real feedback from real students
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          key={currentTestimonial}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12"
        >
          <Quote className="w-12 h-12 text-red-600 dark:text-red-400 mb-4" />
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            "{testimonials[currentTestimonial].text}"
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {testimonials[currentTestimonial].name}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {testimonials[currentTestimonial].role}
              </p>
            </div>
            <div className="flex gap-1">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentTestimonial
                  ? "bg-red-600 dark:bg-red-400"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

