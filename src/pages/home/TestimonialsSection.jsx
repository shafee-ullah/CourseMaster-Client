import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star, Users, Award, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior Web Developer at Google",
      text: "CourseMaster completely transformed my career trajectory. The quality of instruction and hands-on projects helped me land my dream job at Google. The community support was incredible!",
      rating: 5,
      avatar: "SJ",
      achievement: "Got promoted within 3 months",
      color: "from-red-500 to-orange-500"
    },
    {
      name: "Michael Chen",
      role: "Software Engineer at Microsoft",
      text: "The React Masterclass was game-changing. The instructor's real-world experience and the practical assignments gave me the confidence to contribute to major projects immediately.",
      rating: 5,
      avatar: "MC",
      achievement: "40% salary increase",
      color: "from-red-600 to-pink-500"
    },
    {
      name: "Emily Rodriguez",
      role: "Lead UI/UX Designer at Airbnb",
      text: "As a designer, I was skeptical about online courses, but CourseMaster exceeded all expectations. The portfolio projects alone were worth the investment. My design skills improved dramatically.",
      rating: 5,
      avatar: "ER",
      achievement: "Launched 2 successful products",
      color: "from-red-700 to-purple-500"
    },
    {
      name: "David Kim",
      role: "Data Scientist at Netflix",
      text: "The Data Science Bootcamp was intense but incredibly rewarding. The mentorship and career support helped me transition from finance to tech. Best decision I ever made!",
      rating: 5,
      avatar: "DK",
      achievement: "Career switch success",
      color: "from-red-400 to-yellow-400"
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative overflow-hidden py-8 px-8">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-red-500/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-red-500/5 to-transparent"></div>
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
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Student Success Stories</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Hear From Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Successful</span> Students
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Real stories from learners who transformed their careers with CourseMaster
          </motion.p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Cards */}
          <div className="relative h-[500px] overflow-hidden">
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentTestimonial;
              const isPrev = index === (currentTestimonial - 1 + testimonials.length) % testimonials.length;
              const isNext = index === (currentTestimonial + 1) % testimonials.length;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                  animate={{ 
                    opacity: isActive ? 1 : isPrev || isNext ? 0.5 : 0,
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.9 : 0.8
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`absolute inset-0 ${isActive ? 'z-10' : isPrev || isNext ? 'z-5' : 'z-0'}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                    {/* Testimonial Card */}
                    <div className="relative">
                      <div className="absolute -top-6 -left-6 text-8xl text-red-600/10 dark:text-red-400/10">
                        <Quote />
                      </div>
                      
                      <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-10 h-full">
                        {/* Quote */}
                        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                          "{testimonial.text}"
                        </p>

                        {/* Author Info */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-xl`}>
                            {testimonial.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white text-lg">
                              {testimonial.name}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex gap-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <span className="text-gray-600 dark:text-gray-400 ml-2">
                            5.0 Rating
                          </span>
                        </div>

                        {/* Achievement */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 text-red-700 dark:text-red-300 px-4 py-2 rounded-full">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm font-medium">{testimonial.achievement}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Card */}
                    <div className="relative">
                      <div className="bg-gradient-to-br from-red-600 to-red-400 rounded-3xl p-8 md:p-10 text-white h-full">
                        {/* Achievement Icon */}
                        <div className="flex justify-center mb-6">
                          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Award className="w-10 h-10 text-yellow-300" />
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="space-y-6">
                          <div className="text-center">
                            <p className="text-4xl font-bold mb-2">95%</p>
                            <p className="text-red-100">Career Advancement Rate</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                              <p className="text-2xl font-bold">4.8/5</p>
                              <p className="text-sm text-red-100">Avg. Course Rating</p>
                            </div>
                            <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                              <p className="text-2xl font-bold">30K+</p>
                              <p className="text-sm text-red-100">Jobs Landed</p>
                            </div>
                          </div>

                          {/* Progress Bars */}
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Skill Improvement</span>
                                <span>94%</span>
                              </div>
                              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: "94%" }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Student Satisfaction</span>
                                <span>98%</span>
                              </div>
                              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: "98%" }}
                                  transition={{ duration: 1, delay: 0.7 }}
                                  className="h-full bg-gradient-to-r from-green-300 to-green-400 rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentTestimonial ? 1 : -1);
                  setCurrentTestimonial(index);
                }}
                className="group"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <div className="relative">
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "bg-red-600 dark:bg-red-400 scale-125"
                        : "bg-gray-300 dark:bg-gray-600 group-hover:bg-red-400 dark:group-hover:bg-red-500"
                    }`}
                  />
                  {index === currentTestimonial && (
                    <motion.div
                      layoutId="activeTestimonial"
                      className="absolute inset-0 rounded-full border-2 border-red-600 dark:border-red-400"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Auto-play Status */}
          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full animate-pulse"></div>
              <span>Auto-playing student success stories</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;