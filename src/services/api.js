import axios from "axios";

/**
 * API Service Configuration
 * Centralized axios instance for API calls
 */
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * Auth API Service
 * Handles authentication-related API calls
 */
export const authAPI = {
  /**
   * Sync Firebase user to MongoDB
   * @param {Object} userData - Firebase user data
   * @returns {Promise}
   */
  syncUser: async (userData) => {
    const response = await api.post("/auth/sync", {
      firebaseUID: userData.uid,
      email: userData.email,
      displayName: userData.displayName || null,
      photoURL: userData.photoURL || null,
      emailVerified: userData.emailVerified || false,
    });
    return response.data;
  },

  /**
   * Get user profile by Firebase UID
   * @param {string} firebaseUID - Firebase user UID
   * @returns {Promise}
   */
  getUserProfile: async (firebaseUID) => {
    const response = await api.get(`/auth/profile/${firebaseUID}`);
    return response.data;
  },
};

/**
 * Course API Service
 * Handles course-related API calls
 */
export const courseAPI = {
  /**
   * Get all courses with filters
   * @param {Object} params - Query parameters (page, limit, search, category, etc.)
   * @returns {Promise}
   */
  getAllCourses: async (params = {}) => {
    const response = await api.get("/courses", { params });
    return response.data;
  },

  /**
   * Get single course by ID
   * @param {string} courseId - Course ID
   * @returns {Promise}
   */
  getCourseById: async (courseId) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  },

  /**
   * Create a new course
   * @param {Object} courseData - Course data (includes firebaseUID or email)
   * @returns {Promise}
   */
  createCourse: async (courseData) => {
    const { firebaseUID, email, ...data } = courseData;
    const headers = {};

    // Use Firebase UID if available, otherwise use email
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }

    const response = await api.post("/courses", data, { headers });
    return response.data;
  },

  /**
   * Update a course
   * @param {string} courseId - Course ID
   * @param {Object} courseData - Updated course data (includes firebaseUID or email)
   * @returns {Promise}
   */
  updateCourse: async (courseId, courseData) => {
    const { firebaseUID, email, ...data } = courseData;
    const headers = {};

    // Use Firebase UID if available, otherwise use email
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }

    const response = await api.put(`/courses/${courseId}`, data, { headers });
    return response.data;
  },

  /**
   * Delete a course
   * @param {string} courseId - Course ID
   * @param {string} firebaseUID - Firebase UID for auth (optional)
   * @param {string} email - Email for auth (optional, fallback)
   * @returns {Promise}
   */
  deleteCourse: async (courseId, firebaseUID, email) => {
    const headers = {};

    // Use Firebase UID if available, otherwise use email
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }

    const response = await api.delete(`/courses/${courseId}`, { headers });
    return response.data;
  },

  /**
   * Get courses by instructor
   * @param {string} instructorId - Instructor ID
   * @returns {Promise}
   */
  getCoursesByInstructor: async (instructorId) => {
    const response = await api.get(`/courses/instructor/${instructorId}`);
    return response.data;
  },
};

/**
 * Enrollment API Service
 * Handles enrollment-related API calls
 */
export const enrollmentAPI = {
  /**
   * Enroll in a course
   * @param {string} courseId - Course ID
   * @param {string} firebaseUID - Firebase UID for auth
   * @returns {Promise}
   */
  enroll: async (courseId, firebaseUID, email) => {
    const headers = {};

    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }

    const response = await api.post("/enrollments", { courseId }, { headers });
    return response.data;
  },

  /**
   * Get student's enrolled courses (My Courses)
   * @param {string} firebaseUID - Firebase UID for auth (optional)
   * @param {string} email - Email for auth (optional, fallback)
   * @param {string} status - Enrollment status (active, completed, dropped)
   * @returns {Promise}
   */
  getMyCourses: async (firebaseUID, email, status = "active") => {
    const headers = {};

    // Use Firebase UID if available, otherwise use email
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }

    const response = await api.get("/enrollments/my-courses", {
      params: { status },
      headers,
    });
    return response.data;
  },

  /**
   * Get single enrollment details
   * @param {string} enrollmentId - Enrollment ID
   * @param {string} firebaseUID - Firebase UID for auth (optional)
   * @param {string} email - Email for auth (optional, fallback)
   * @returns {Promise}
   */
  getEnrollmentById: async (enrollmentId, firebaseUID, email) => {
    const headers = {};

    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }

    const response = await api.get(`/enrollments/${enrollmentId}`, { headers });
    return response.data;
  },

  /**
   * Mark lesson as completed
   * @param {string} enrollmentId - Enrollment ID
   * @param {number} lessonIndex - Lesson index
   * @param {string} firebaseUID - Firebase UID for auth (optional)
   * @param {string} email - Email for auth (optional, fallback)
   * @returns {Promise}
   */
  markLessonComplete: async (enrollmentId, lessonIndex, firebaseUID, email) => {
    const headers = {};

    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }

    const response = await api.post(
      `/enrollments/${enrollmentId}/complete-lesson`,
      { lessonIndex },
      { headers }
    );
    return response.data;
  },

  /**
   * Update last accessed
   * @param {string} enrollmentId - Enrollment ID
   * @param {string} firebaseUID - Firebase UID for auth (optional)
   * @param {string} email - Email for auth (optional, fallback)
   * @returns {Promise}
   */
  updateLastAccessed: async (enrollmentId, firebaseUID, email) => {
    const headers = {};

    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }

    const response = await api.patch(
      `/enrollments/${enrollmentId}/access`,
      {},
      { headers }
    );
    return response.data;
  },

  /**
   * Admin: Get enrollment analytics (enrollments over time)
   */
  getEnrollmentAnalytics: async (firebaseUID, email, rangeDays = 30) => {
    const headers = {};
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }
    const response = await api.get("/enrollments/admin/analytics", {
      params: { rangeDays },
      headers,
    });
    return response.data;
  },

  /**
   * Admin: Get enrollments by course
   */
  getEnrollmentsByCourse: async (courseId, firebaseUID, email) => {
    const headers = {};
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }
    const response = await api.get(`/enrollments/admin/course/${courseId}`, {
      headers,
    });
    return response.data;
  },
};

/**
 * Quiz API Service
 * Handles quiz creation, retrieval, and submissions
 */
export const quizAPI = {
  /**
   * Create a quiz (admin)
   * @param {Object} quizData
   * @param {string} firebaseUID
   * @param {string} email
   */
  createQuiz: async (quizData, firebaseUID, email) => {
    const headers = {};
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }
    const response = await api.post("/quizzes", quizData, { headers });
    return response.data;
  },

  /**
   * Get quizzes for a course (student)
   */
  getQuizzesByCourse: async (courseId, firebaseUID, email) => {
    const headers = {};
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }
    const response = await api.get(`/quizzes/course/${courseId}`, { headers });
    return response.data;
  },

  /**
   * Get single quiz by ID
   */
  getQuizById: async (quizId, firebaseUID, email) => {
    const headers = {};
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }
    const response = await api.get(`/quizzes/${quizId}`, { headers });
    return response.data;
  },

  /**
   * Submit quiz answers
   */
  submitQuiz: async (quizId, answers, firebaseUID, email) => {
    const headers = {};
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }
    const response = await api.post(
      `/quizzes/${quizId}/submit`,
      { answers },
      { headers }
    );
    return response.data;
  },

  /**
   * Update a quiz (admin)
   */
  updateQuiz: async (quizId, quizData, firebaseUID, email) => {
    const headers = {};
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }
    const response = await api.put(`/quizzes/${quizId}`, quizData, { headers });
    return response.data;
  },

  /**
   * Delete a quiz (admin)
   */
  deleteQuiz: async (quizId, firebaseUID, email) => {
    const headers = {};
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }
    const response = await api.delete(`/quizzes/${quizId}`, { headers });
    return response.data;
  },

  /**
   * Get student's quiz results
   */
  getMyResults: async (firebaseUID, email) => {
    const headers = {};
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }
    const response = await api.get("/quizzes/my/results", { headers });
    return response.data;
  },
};

/**
 * Assignment API Service
 * Handles assignment submissions and retrieval
 */
export const assignmentAPI = {
  submitAssignment: async (data, firebaseUID, email) => {
    const headers = {};
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }
    const response = await api.post("/assignments", data, { headers });
    return response.data;
  },

  getMyAssignments: async (firebaseUID, email) => {
    const headers = {};
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }
    const response = await api.get("/assignments/my", { headers });
    return response.data;
  },

  // Admin: get all submitted assignments
  getAllAssignmentsAdmin: async (firebaseUID, email) => {
    const headers = {};
    if (firebaseUID) {
      headers["x-firebase-uid"] = firebaseUID;
    } else if (email) {
      headers["x-user-email"] = email;
    }
    const response = await api.get("/assignments/admin/all", { headers });
    return response.data;
  },
};

export default api;
