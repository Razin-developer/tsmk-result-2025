import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useResultStore } from "../store/useResultStore";
import { Link } from "react-router-dom";

const ResultPage = () => {
  const { resultOfOne } = useResultStore();

  useEffect(() => {
    console.log(resultOfOne);
    
  })

  if (resultOfOne) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"
        >
          <h2 className="text-center text-gray-300 text-xl font-semibold mb-4">
            7221 THA'ALEEMUSWIBYAN MADRASSA KANDAMANGALAM
          </h2>
          <h3 className="text-center text-gray-400 text-lg mb-6">
            EXAMINATION RESULT
          </h3>

          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <p className="text-gray-300">Class: {resultOfOne.className}</p>
            <p className="text-gray-300">
              Roll Number: {resultOfOne.rollNumber}
            </p>
            <p className="text-gray-300">
              Admission Number: {resultOfOne.admissionNumber}
            </p>
            <p className="text-gray-300">
              Student Name: {resultOfOne.studentName}
            </p>
          </div>

          <table className="w-full border-collapse border border-gray-600 text-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 p-2">Subject</th>
                <th className="border border-gray-600 p-2">Total</th>
                <th className="border border-gray-600 p-2">Obtained</th>
              </tr>
            </thead>
            <tbody>
              {resultOfOne.subjects &&
                resultOfOne.subjects.map((subject, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="odd:bg-gray-200 even:bg-gray-300"
                  >
                    <td className="border border-gray-900 text-gray-800 font-semibold p-2">
                      {subject.name}
                    </td>
                    <td className="border border-gray-900 text-gray-800 font-semibold p-2 text-center">
                      {subject.total}
                    </td>
                    <td className="border border-gray-900 text-gray-800 font-semibold p-2 text-center">
                      {subject.obtained}
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>

          <div className="bg-gray-700 p-4 rounded-lg mt-4 text-gray-300">
            <p>Total Marks: {resultOfOne.totalMarks}</p>
            <p>
              Rank: {resultOfOne.rank}/{resultOfOne.totalStudents}
            </p>
            <p>
              Status:{" "}
              {resultOfOne.status ? (
                <span className="font-bold text-green-400">{"PASSED"}</span>
              ) : (
                <span className="font-bold text-red-400">{"FAILED"}</span>
              )}{" "}
            </p>
          </div>

          <div className="flex justify-between mt-6">
            <Link
              to={"/"}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
            >
              Back
            </Link>
            <Link
              to={"/"}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
            >
              Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  } else {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"
      >
        <h2 className="text-center text-gray-300 text-xl font-semibold mb-4">
          7221 THA'ALEEMUSWIBYAN MADRASSA KANDAMANGALAM
        </h2>
        <h3 className="text-center text-gray-400 text-lg mb-6">
          EXAMINATION RESULT
        </h3>

        <div className="flex justify-between mt-6">
          <Link
            to={"/"}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
          >
            Back
          </Link>
          <Link
            to={"/"}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
          >
            Home
          </Link>
        </div>
      </motion.div>
    </div>
    );
  }
};

export default ResultPage;
