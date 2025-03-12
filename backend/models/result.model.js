import { model, Schema } from "mongoose";

const resultSchema = new Schema({
  className: {type: String, required: true},
  rollNumber: {type: String, required: true},
  admissionNumber: {type: String, required: true, unique: true},
  studentName: {  type: String, required: true },
  subjects: [{name: {type: String, required: true}, total:  {type: Number, required: true}, obtained:  {type: Number, required: true}}],
  totalMarks: {  type: Number, required: true },
  status: {  type: Boolean, required: true },
}, { timestamps: true })

const Result = model('Result', resultSchema)

export default Result