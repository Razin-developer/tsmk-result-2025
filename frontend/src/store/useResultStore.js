import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useResultStore = create((set, get) => ({
  studentsOfAClass: null,
  resultOfOne: null,
  isLoadingStudents: false,
  isLoadingResult: false,

  // ✅ Get Students of a Class
  getStudentsFromAClass: async (classId) => {
    set({ isLoadingStudents: true });
    try {
      const res = await axiosInstance.get(`/result/${classId}`);
      set({ studentsOfAClass: res.data });
    } catch (error) {
      console.error("Error in getStudentsFromAClass:", error);
      set({ studentsOfAClass: null });
    } finally {
      set({ isLoadingStudents: false });
    }
  },

  // ✅ Get a Single Student's Result
  getResultOfOne: async ({ name, classId }) => {
    set({ isLoadingResult: true });
    try {
      const res = await axiosInstance.get(`/result/${classId}/${name}`);
      set({resultOfOne: res.data});
    } catch (error) {
      console.error("Error in getResultOfOne:", error);
      toast.error(error.response.data.message);
      return null;
    } finally {
      set({ isLoadingResult: false });
    }
  },
}));
