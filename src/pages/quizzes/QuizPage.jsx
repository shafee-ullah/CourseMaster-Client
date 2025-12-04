import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { quizAPI } from "../../services/api";
import toast from "react-hot-toast";

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await quizAPI.getQuizById(
          quizId,
          user?.uid || null,
          user?.email || null
        );
        setQuiz(res.quiz);
        setAnswers(new Array(res.quiz.questions.length).fill(-1));
      } catch (error) {
        console.error("Failed to load quiz:", error);
        toast.error(error.response?.data?.message || "Failed to load quiz");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (quizId && user) {
      fetchQuiz();
    }
  }, [quizId, user, navigate]);

  const handleSelect = (qIndex, optIndex) => {
    if (result) return; // lock after submit
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optIndex;
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quiz) return;

    if (answers.some((a) => a < 0)) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await quizAPI.submitQuiz(
        quizId,
        answers,
        user?.uid || null,
        user?.email || null
      );
      setResult(res.result);
      toast.success(`You scored ${res.result.score}%`);
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      toast.error(error.response?.data?.message || "Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">
          Please log in to take this quiz.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading quiz...</p>
      </div>
    );
  }

  if (!quiz) {
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {quiz.title}
          </h1>
          {quiz.description && (
            <p className="text-gray-600 dark:text-gray-400">
              {quiz.description}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {quiz.questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 space-y-3"
            >
              <p className="font-semibold text-gray-900 dark:text-white">
                {qIndex + 1}. {q.questionText}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, optIndex) => (
                  <label
                    key={optIndex}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer border ${
                      answers[qIndex] === optIndex
                        ? "border-red-600 bg-red-50 dark:bg-red-900/30"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    <input
                      type="radio"
                      className="w-4 h-4"
                      checked={answers[qIndex] === optIndex}
                      onChange={() => handleSelect(qIndex, optIndex)}
                    />
                    <span className="text-gray-800 dark:text-gray-100">
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={submitting || !!result}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Submitting..."
                : result
                ? "Submitted"
                : "Submit Quiz"}
            </button>
            {result && (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Score: <span className="font-semibold">{result.score}%</span> (
                {result.correctAnswers}/{result.totalQuestions} correct)
              </p>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default QuizPage;
