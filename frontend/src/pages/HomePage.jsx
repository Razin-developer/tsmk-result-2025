import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Search, Loader2 } from "lucide-react";
import { useResultStore } from "../store/useResultStore";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ class: "", name: "" });
  const navigate = useNavigate();
  const [studentsOfAClass, setStudentsOfAClass] = useState([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const { setResultOfOne } = useResultStore();

  useEffect(() => {
    if (selectedClass) {
      setFormData((prev) => ({ ...prev, class: selectedClass }));
      getStudentsFromAClass(selectedClass);
    }
  }, [selectedClass]);

  const getStudentsFromAClass = async (classId) => {
    setIsLoadingStudents(true);
    try {
      const res = await axiosInstance.get(`/result/${classId}`);
      setStudentsOfAClass(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudentsOfAClass([]);
      toast.error("Failed to fetch students.");
    } finally {
      setIsLoadingStudents(false);
    }
  };

  const getResultOfOne = async ({ name, classId }) => {
    try {
      const res = await axiosInstance.get(`/result/${classId}/${name}`);
      console.log(res.data);
      
      setResultOfOne(res.data);
      navigate("/result");
    } catch (error) {
      console.error("Error fetching result:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.warn("Please select a student.");
      return;
    }

    setIsSubmitting(true);
    await getResultOfOne({ name: formData.name, classId: selectedClass });
    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-z-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md border border-gray-700"
      >
        <motion.h4
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-semibold text-center text-gray-300 mb-6"
        >
          Select a Class
        </motion.h4>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Class Selection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="form-control"
          >
            <label className="label">
              <span className="label-text text-gray-300 font-medium">
                Select Class
              </span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 size-5 text-gray-500" />
              <select
                className="input input-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={(e) => setSelectedClass(e.target.value)}
                value={selectedClass}
              >
                <option value="">Choose a class</option>
                {[1, 2, 3, 4, 6, 8, 9].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Student Selection */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="form-control"
          >
            <label className="label">
              <span className="label-text text-gray-300 font-medium">
                Select Student
              </span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 size-5 text-gray-500" />
              <select
                className="input input-bordered w-full pl-10 bg-gray-700 text-white border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedClass || isLoadingStudents}
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              >
                <option value="">
                  {isLoadingStudents
                    ? "Loading students..."
                    : "Choose a student"}
                </option>
                {studentsOfAClass.map((student, index) => (
                  <option key={index} value={student.studentName}>
                    {index + 1}. {student.studentName}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.1 }}
            type="submit"
            className="btn btn-primary w-full text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all"
            disabled={isSubmitting || !formData.name}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Search className="size-5" />
                Search
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default HomePage;
