const ExamPaperUpload = ({ onChange }) => {
  return (
    <>
      <label htmlFor="questionPaper">Question Paper</label>
      <input type="file" accept=".pdf" id="questionPaper" onChange={(e) => onChange(e, "question")} />
      <label htmlFor="correctAnswer">Correct Answer</label>
      <input type="file" accept=".pdf" id="correctAnswer" onChange={(e) => onChange(e, "correct")} />
      <label htmlFor="studentAnswer">Student Answer</label>
      <input type="file" accept=".pdf" id="studentAnswer" onChange={(e) => onChange(e, "student")} />
    </>
  );
};

export default ExamPaperUpload;
