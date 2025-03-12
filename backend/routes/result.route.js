import { Router } from "express";
import { createResult, deleteResult, getresult, getStudentResult, getStudents } from "../controllers/result.controller.js";

const router = Router()

router.get('/get', getresult)

router.post('/create', createResult)

router.delete('/delete/:id', deleteResult)

router.get('/:classId', getStudents)

router.get('/:classId/:name', getStudentResult)

export default router