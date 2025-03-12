import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export default function AdminPage() {
  const [numSubjects, setNumSubjects] = useState(8);
  const [formData, setFormData] = useState({
    studentName: "",
    className: "2",
    rollNumber: "1",
    admissionNumber: "",
    subjects: Array(6).fill({ name: "", obtained: "", total: 50 }),
  });

  const [roll, setRoll] = useState(1);
  const [results, setResults] = useState([]);

  function getResults() {
    axiosInstance
      .get("/result/get")
      .then((res) => setResults(res.data.reverse()))
      .catch((err) => console.error(err));
  }

  // Fetch existing results
  useEffect(() => {
    getResults();
  }, []);

  // Handle input change
  const handleInputChange = (e, index, field) => {
    const updatedSubjects = [...formData.subjects];

    updatedSubjects[index] = {
      ...updatedSubjects[index],
      [field]: e.target.value,
      total: 50, // Ensuring total is always set
    };

    setFormData({ ...formData, subjects: updatedSubjects });
  };

  // Handle Number of Subjects change
  const handleSubjectCountChange = (e) => {
    const count = Number(e.target.value);
    setNumSubjects(count);
    setFormData({
      ...formData,
      subjects: Array(count).fill({ name: "", obtained: 0, total: 50 }),
    });
  };

  // Submit new result
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/result/create", formData);
      toast.success("Successfully Added");
      let newSubjects = [];
      let previousRollnumber = formData.rollNumber;
      console.log(previousRollnumber);
      setRoll(roll + 1);

      formData.subjects.map((subject, index) =>
        newSubjects.push({ name: subject.name, obtained: "", total: 50 })
      );

      setFormData({
        studentName: "",
        className: "2",
        rollNumber: roll + 1,
        admissionNumber: "",
        subjects: newSubjects,
      });
      getResults();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding result");
    }
  };

  // Delete a result
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/result/delete/${id}`);
      getResults();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error deleting result");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-gray-900 text-white p-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Admin Panel - Manage Results
      </motion.h1>

      {/* Add Result Form */}
      <motion.div
        className="bg-gray-800 p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Add Student Result</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Student Name"
              className="input-field"
              onChange={(e) =>
                setFormData({ ...formData, studentName: e.target.value })
              }
              required
              value={formData.studentName}
            />

            {/* Select Class Dropdown */}
            <select
              className="input-field"
              value={formData.className}
              onChange={(e) =>
                setFormData({ ...formData, className: e.target.value })
              }
              required
            >
              <option value="">Select Class</option>
              {[1, 2, 3, 4, 6, 8, 9].map((cls) => (
                <option key={cls} value={cls}>
                  Class {cls}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Roll Number"
              className="input-field"
              onChange={(e) =>
                setFormData({ ...formData, rollNumber: e.target.value })
              }
              required
              value={formData.rollNumber}
            />
            <input
              type="text"
              placeholder="Admission Number"
              className="input-field"
              onChange={(e) =>
                setFormData({ ...formData, admissionNumber: e.target.value })
              }
              required
              value={formData.admissionNumber}
            />
          </div>

          <label className="block text-gray-300">Number of Subjects:</label>
          <select
            className="input-field"
            value={numSubjects}
            onChange={handleSubjectCountChange}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          {/* Dynamic Subject Inputs */}
          {formData.subjects.map((subject, index) => (
            <div key={index} className="flex gap-2">
              <select
                className="input-field flex-1"
                onChange={(e) => handleInputChange(e, index, "name")}
                required
                value={formData.subjects[index].name}
              >
                <option value="">Select Subject</option>
                <option value="ഖുർആൻ">ഖുർആൻ</option>
                <option value="ഹിഫ്ള്">ഹിഫ്ള്</option>
                <option value="ഫിഖ്ഹ്">ഫിഖ്ഹ്</option>
                <option value="അഖീദ">അഖീദ</option>
                <option value="ലിസാനുൽ ഖുർആൻ">ലിസാനുൽ ഖുർആൻ</option>
                <option value="അഖ്‌ലാഖ്">അഖ്‌ലാഖ്</option>
              </select>
              <input
                type="number"
                placeholder="Marks Obtained"
                className="input-field obtained-input w-24"
                onChange={(e) => handleInputChange(e, index, "obtained")}
                value={formData.subjects[index].obtained}
                required
              />
              <input type="number" value={50} className="hidden" readOnly />
            </div>
          ))}

          <button type="submit" className="btn">
            Add Result
          </button>
        </form>
      </motion.div>

      {/* Display Results */}
      <motion.div
        className="mt-10 bg-gray-800 p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Existing Results</h2>
        <div className="space-y-4">
          {results.length === 0 ? (
            <p className="text-gray-400">No results found.</p>
          ) : (
            results.map((result) => (
              <motion.div
                key={result._id}
                className="flex justify-between items-center bg-gray-700 p-4 rounded-lg hover:scale-105 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <p className="font-bold">
                    {result.studentName} (Class {result.className})
                  </p>
                  <p className="text-sm text-gray-300">
                    Roll No: {result.rollNumber}, Admission:{" "}
                    {result.admissionNumber}
                  </p>
                </div>
                <button
                  className="btn bg-red-500 hover:bg-red-700"
                  onClick={() => handleDelete(result._id)}
                >
                  Delete
                </button>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
