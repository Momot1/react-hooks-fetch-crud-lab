import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleQuestionDelete(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method:"DELETE"
    })
      .then(resp => resp.json())
      .then(() => {
        onDeleteQuestion(question)
      })
  }

  function handleAnswerChange(answer){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex: parseInt(answer)})
    })
      .then(resp => resp.json())
      .then(data => onUpdateQuestion(data))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={e => handleAnswerChange(e.target.value)}>{options}</select>
      </label>
      <button onClick={handleQuestionDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
