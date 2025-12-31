import express from "express";
import multer from "multer";
import fs from "fs";
import { PDFParse } from "pdf-parse";
import { compareAnswers } from "../utils/pdfCompare.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage });

router.post(
  "/check",
  upload.fields([
    { name: "questionPaper" },
    { name: "correctAnswer" },
    { name: "studentAnswer" }
  ]),
  async (req, res) => {
    try {
      // console.log("object", req.files)
      const correctPdf = new PDFParse({ url: req.files.correctAnswer[0].path });
      const studentPdf = new PDFParse({ url: req.files.studentAnswer[0].path });

      const resultCorrectPdf = await correctPdf.getText();
      const resultStudentPdf = await studentPdf.getText();
      // console.log("resultCorrectPdf",resultCorrectPdf)
      // console.log("resultStudentPdf",resultStudentPdf)
      const result = compareAnswers(resultCorrectPdf.text, resultStudentPdf.text);

      res.json({
        success: true,
        marks: result.marks,
        wrongAnswers: result.wrongCount,
      });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

export default router;
