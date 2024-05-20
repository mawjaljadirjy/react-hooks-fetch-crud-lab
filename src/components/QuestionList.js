import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestionList(data);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestionList(questionList.filter((question) => question.id !== id));
    });
  };

  const handleUpdate = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    }).then((response) => response.json())
      .then((updatedQuestion) => {
        setQuestionList(questionList.map((question) =>
          question.id === id ? updatedQuestion : question
        ));
      });
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionList.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
