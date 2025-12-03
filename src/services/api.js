import axios from "axios";

/**
 * API Service Configuration
 * Centralized axios instance for API calls
 */
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
  enroll: async (courseId, firebaseUID) => {
    const response = await api.post(
      "/enrollments",
      { courseId },
      {
        headers: {
          "x-firebase-uid": firebaseUID,
        },
      }
    );
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
};

export default api;
