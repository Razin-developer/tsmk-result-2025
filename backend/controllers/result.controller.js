import Result from "../models/result.model.js";

export const getStudents = async (req, res) => {
  try {
    const { classId } = req.params;

    if (!classId) {
      return res.status(400).json({ message: "Provide a class" });
    }

    const students = await Result.find({ className: classId }).select(["admissionNumber", "studentName"]);

    res.status(200).json(students);
  } catch (error) {
    console.error("Error in get student details controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStudentResult = async (req, res) => {
  try {
    const { classId, name } = req.params;

    if (!classId || !name) {
      return res.status(400).json({ message: "Provide a class and name" });
    }

    const studentResult = await Result.findOne({ className: classId, studentName: name });
    if (!studentResult) {
      return res.status(404).json({ message: "Student not found" });
    }

    let allStudents = await Result.find({ className: classId, status: true, }).sort({ totalMarks: -1 });
    let students;
    let rank;

    allStudents.forEach((student, i) => console.log(student.totalMarks))
    

    if (classId == "1") {
      students = allStudents.filter((student, i) => student.admissionNumber != "568")
      rank = students.findIndex((s) => s.admissionNumber === studentResult.admissionNumber) + 1;
    } else if (classId == "8") {
      students = allStudents.filter((student, i) => student.admissionNumber != "509")
      rank = students.findIndex((s) => s.admissionNumber === studentResult.admissionNumber) + 1;
    } else if (classId == "2") {
      students = allStudents.filter((student) =>
        student.admissionNumber !== "516" &&
        student.admissionNumber !== "589" &&
        student.admissionNumber !== "548"
      );
    
      rank = students.findIndex((s) => s.admissionNumber === studentResult.admissionNumber) + 1;
    
      students.forEach((student, i) => console.log(i + 1, student.totalMarks));
    } else {
      rank = allStudents.findIndex((s) => s.admissionNumber === studentResult.admissionNumber) + 1;
    }

    // Find rank
    let newResultObj;

    if (studentResult.status) {  
      if (studentResult.admissionNumber == "568") {
        rank = "2"
      }
      if (studentResult.admissionNumber == "509") {
        rank = "6"
      }
      if (studentResult.admissionNumber == "516") {
        rank = "7"
      }
      if (studentResult.admissionNumber == "589") {
        rank = "14"
      }
      if (studentResult.admissionNumber == "548") {
        rank = "15"
      }

      studentResult.rank = rank;

  
      newResultObj = {
        ...studentResult["_doc"], rank, totalStudents: students ? students.length : allStudents.length
      }
    } else {
      newResultObj = {
        ...studentResult["_doc"]
      }
    }

    if (studentResult.admissionNumber === "568") newResultObj.rank = 2
    if (studentResult.admissionNumber === "448") newResultObj.subjects[3].obtained = "Absent"

    console.log(studentResult);
    console.log(rank);

    console.log(newResultObj)
    

    res.status(200).json(newResultObj);
  } catch (error) {
    console.error("Error in get student result controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getresult = async (req, res) => {
  try {
    const results = await Result.find({})

    res.status(200).json(results);
  } catch (error) {
    console.error("Error in get result controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createResult = async (req, res) => {
  try {
    const { studentName, className, rollNumber, admissionNumber, subjects } = req.body

    console.log(req.body);

    let total = 0;
    let passed = true;

    subjects.forEach((subject) => {
      total += Number(subject.obtained);
      if (className === "1" && subject.obtained < 20) {
        passed = false;
      } else if (subject.name === "ഖുർആൻ"  && subject.obtained < 20) {
        passed = false;
      } else if (subject.name === "ഹിഫ്ള്"  && subject.obtained < 20) {
        passed = false;
      } else if (subject.obtained < 18) {
        passed = false;
      }
    });

    
    const result = Result.create({studentName, className, rollNumber, admissionNumber, subjects, totalMarks: total, status: passed})

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in get result controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedResult = await Result.findByIdAndDelete(id)

    console.log(deletedResult);
    
    res.status(200).json({ message: "successfully done" });
  } catch (error) {
    console.error("Error in get result controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
