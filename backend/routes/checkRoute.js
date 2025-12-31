import express from "express";
import multer from "multer";
import fs from "fs";
import {PDFParse} from "pdf-parse";
import { compareAnswers } from "../utils/pdfCompare.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/check",
  upload.fields([
    { name: "questionPaper" },
    { name: "correctAnswer" },
    { name: "studentAnswer" }
  ]),
  async (req, res) => {
    try {
console.log("object",req)
        return 
      const correctPdf = await new PDFParse(fs.readFileSync(req.files.correctAnswer[0].path));
      const studentPdf = await new PDFParse(fs.readFileSync(req.files.studentAnswer[0].path));

      const result = compareAnswers(correctPdf.text, studentPdf.text);

      res.json({
        success: true,
        marks: result.marks,
        wrongAnswers: result.wrongCount
      });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

export default router;
