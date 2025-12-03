import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { courseAPI } from "../services/api";
import HeroSection from "./home/HeroSection";
import StatsSection from "./home/StatsSection";
import WhyChooseUsSection from "./home/WhyChooseUsSection";
import TopCoursesSection from "./home/TopCoursesSection";
import LearningTimelineSection from "./home/LearningTimelineSection";
import InstructorCTASection from "./home/InstructorCTASection";
import TestimonialsSection from "./home/TestimonialsSection";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [topCourses, setTopCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopCourses();
  }, []);

  const fetchTopCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getAllCourses({
        limit: 4,
        sortBy: "rating",
        sortOrder: "desc",
        status: "published",
      });
      setTopCourses(response.data || []);
    } catch (error) {
      console.error("Failed to fetch top courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    navigate(`/courses?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="space-y-16 py-8">
      <HeroSection onSearch={handleSearch} />
      <StatsSection />
      <WhyChooseUsSection />
      <TopCoursesSection courses={topCourses} loading={loading} />
      <LearningTimelineSection />
      <InstructorCTASection user={user} />
      <TestimonialsSection />
    </div>
  );
};

export default Home;
