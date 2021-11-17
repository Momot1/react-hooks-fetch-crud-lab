import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(resp => resp.json())
      .then(data => setQuestions(data))
  }, [])

  function deleteQuestion(question){
    const updatedQuestions = questions.filter(item => item.id !== question.id)
    setQuestions(updatedQuestions)
  }

  function updateQuestion(question){
    const updatedQuestions = questions.map(item => {
      if(item.id === question.id){
        return {...question, correctIndex: question.correctIndex}
      } else{
        return item
      }
    })

    setQuestions(updatedQuestions)
  }

  const displayQuestions = questions.map(question => 
    <QuestionItem key = {question.id} question={question} onDeleteQuestion = {deleteQuestion} onUpdateQuestion = {updateQuestion}/>)

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestions}</ul>
    </section>
  );
}

export default QuestionList;
