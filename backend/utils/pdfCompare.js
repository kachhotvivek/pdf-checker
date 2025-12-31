import natural from "natural";

const splitByQuestion = (text) =>
  text.split(/Q\d+\./i).map(a => a.trim()).filter(Boolean);

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;
const normalize = (text) =>
  tokenizer
    .tokenize(text.toLowerCase())
    .map(w => stemmer.stem(w))
    .filter(w => w.length > 2);

const keywordScore = (correct, student) => {
  const cWords = new Set(normalize(correct));
  const sWords = new Set(normalize(student));

  let matched = 0;
  cWords.forEach(word => {
    if (sWords.has(word)) matched++;
  });

  return matched / cWords.size;
};    

export const compareAnswers = (correctText, studentText) => {
  const correctAnswers = splitByQuestion(correctText);
  const studentAnswers = splitByQuestion(studentText);

  let marks = 0;
  let wrongCount = 0;

  correctAnswers.forEach((correct, i) => {
    const student = studentAnswers[i] || "";

    const similarity = natural.JaroWinklerDistance(correct, student);
    const keywordMatch = keywordScore(correct, student);

    if (similarity > 0.7 || keywordMatch > 0.5) {
      marks++;
    } else {
      wrongCount++;
    }
  });

  return { marks, wrongCount };
};
