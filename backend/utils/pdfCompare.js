import natural from "natural";

export const compareAnswers = (correctText, studentText) => {
  const correctLines = correctText.split("\n").filter(l => l.trim());
  const studentLines = studentText.split("\n").filter(l => l.trim());

  let marks = 0;
  let wrongCount = 0;

  correctLines.forEach((correctLine, index) => {
    const studentLine = studentLines[index] || "";
    const similarity =
      natural.JaroWinklerDistance(correctLine, studentLine);

    if (similarity > 0.75) {
      marks += 1;
    } else {
      wrongCount += 1;
    }
  });

  return { marks, wrongCount };
};
