import { useState } from "react";
import axios from "axios";
import ExamPaperUpload from "./ExamPaperUpload";

function App() {
  const [files, setFiles] = useState({});
  const [result, setResult] = useState(null);

  const handleChange = (e, type) => {
    setFiles({ ...files, [type]: e.target.files[0] });
  };

  const handleSubmit = async () => {
    console.log(files)
    const formData = new FormData();
    formData.append("questionPaper", files.question);
    formData.append("correctAnswer", files.correct);
    formData.append("studentAnswer", files.student);

    const res = await axios.post("http://localhost:5001/api/check", formData);
    setResult(res.data);
  };

  return (
    <div>
      <h2>PDF Answer Checker</h2>

      <ExamPaperUpload onChange={handleChange} />

      <button onClick={handleSubmit}>Check Answers</button>

      {result && (
        <div>
          <h3>Result</h3>
          <p>Marks: {result.marks}</p>
          <p>Wrong Answers: {result.wrongAnswers}</p>
        </div>
      )}
    </div>
  );
}

export default App;
