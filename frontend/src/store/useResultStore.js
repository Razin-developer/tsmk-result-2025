import { create } from "zustand";
import toast from "react-hot-toast";

export const useResultStore = create((set) => ({
  resultOfOne: null,

  setResultOfOne: (data) => {
    try {
      set({ resultOfOne: data });
    } catch (error) {
      console.error("Error in setResultOfOne:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  },
}));
