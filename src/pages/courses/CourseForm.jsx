import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CourseForm = ({ course, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    thumbnail: "",
    category: "",
    tags: "",
    status: "draft",
    syllabus: [],
  });

  const [lessonForm, setLessonForm] = useState({
    lessonTitle: "",
    lessonDescription: "",
    videoUrl: "",
    duration: 0,
    order: 1,
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        description: course.description || "",
        price: course.price || 0,
        thumbnail: course.thumbnail || "",
        category: course.category || "",
        tags: course.tags ? course.tags.join(", ") : "",
        status: course.status || "draft",
        syllabus: course.syllabus || [],
      });
    }
  }, [course]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLessonChange = (e) => {
    const { name, value } = e.target;
    setLessonForm({
      ...lessonForm,
      [name]: name === "duration" || name === "order" ? Number(value) : value,
    });
  };

  const addLesson = () => {
    if (!lessonForm.lessonTitle.trim()) {
      alert("Please enter a lesson title");
      return;
    }

    const newLesson = {
      ...lessonForm,
      order: formData.syllabus.length + 1,
    };

    setFormData({
      ...formData,
      syllabus: [...formData.syllabus, newLesson],
    });

    setLessonForm({
      lessonTitle: "",
      lessonDescription: "",
      videoUrl: "",
      duration: 0,
      order: formData.syllabus.length + 2,
    });
  };

  const removeLesson = (index) => {
    const updatedSyllabus = formData.syllabus.filter((_, i) => i !== index);
    // Reorder lessons
    updatedSyllabus.forEach((lesson, i) => {
      lesson.order = i + 1;
    });
    setFormData({
      ...formData,
      syllabus: updatedSyllabus,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.syllabus.length === 0) {
      alert("Please add at least one lesson to the syllabus");
      return;
    }

    const submitData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      price: Number(formData.price),
    };

    onSubmit(submitData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Course Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          maxLength={200}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="Enter course title"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={5}
          maxLength={5000}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
          placeholder="Enter course description"
        />
      </div>

      {/* Price and Category Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Price ($) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category *
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="e.g., Web Development"
          />
        </div>
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Thumbnail URL *
        </label>
        <input
          type="url"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="React, JavaScript, Web Development"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Syllabus Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Course Syllabus *
        </label>

        {/* Add Lesson Form */}
        <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl mb-4 space-y-3">
          <input
            type="text"
            name="lessonTitle"
            value={lessonForm.lessonTitle}
            onChange={handleLessonChange}
            placeholder="Lesson Title *"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <textarea
            name="lessonDescription"
            value={lessonForm.lessonDescription}
            onChange={handleLessonChange}
            placeholder="Lesson Description"
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="url"
              name="videoUrl"
              value={lessonForm.videoUrl}
              onChange={handleLessonChange}
              placeholder="Video URL"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <input
              type="number"
              name="duration"
              value={lessonForm.duration}
              onChange={handleLessonChange}
              placeholder="Duration (minutes)"
              min="0"
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
          <button
            type="button"
            onClick={addLesson}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
          >
            Add Lesson
          </button>
        </div>

        {/* Lessons List */}
        {formData.syllabus.length > 0 && (
          <div className="space-y-2">
            {formData.syllabus.map((lesson, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white dark:bg-slate-700 p-3 rounded-xl border border-gray-200 dark:border-gray-600"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {index + 1}. {lesson.lessonTitle}
                  </p>
                  {lesson.duration > 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {lesson.duration} minutes
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeLesson(index)}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : course ? "Update Course" : "Create Course"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 text-gray-800 dark:text-white font-semibold py-3 px-6 rounded-2xl transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
};

export default CourseForm;

