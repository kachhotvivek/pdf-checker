const ExamPaperUpload = ({ onChange }) => {
  return (
    <>
      <input type="file" accept=".pdf" onChange={(e) => onChange(e, "question")} />
      <input type="file" accept=".pdf" onChange={(e) => onChange(e, "correct")} />
      <input type="file" accept=".pdf" onChange={(e) => onChange(e, "student")} />
    </>
  );
};

export default ExamPaperUpload;
