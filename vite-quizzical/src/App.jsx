import React from "react";
import Question from "./Questions";
import {nanoid} from "nanoid"

function App() {

  const [startGame, setStartGame] = React.useState(true)
  const [endGame, setEndGame] = React.useState(false)
  const [gameCounter, setGameCounter] = React.useState(0)
  const [questions, setQuestions] = React.useState(["test data"])
  const [formData, setFormData] = React.useState({})
  const [correctCount, setCorrectCount] = React.useState(0)

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then(res => res.json())
    .then(res => getQuestions(res))
  }, [gameCounter])

  function getQuestions(data) {
    const qList =[]
    for(let i=0; i<5; i++){
      const ans = data.results[i].correct_answer
      const origChoices=[]
      origChoices.push(ans, ...data.results[i].incorrect_answers)
      const shuffledChoices = origChoices.sort((a, b) => 0.5 - Math.random())
      
      qList.push({
        id: nanoid(),
        question: data.results[i].question,
        choices: shuffledChoices,
        answer: ans,
        correct: false
      })
    }
    setQuestions(qList)
  }

  function newGame() {
    setCorrectCount(0)
    setStartGame(!startGame) 
    setGameCounter(prevCount => prevCount+1)
  }

  function handleFormData(event) {
    const {name, value} = event.target
    setFormData(prevData => ({...prevData, [name]: value}))
  }

  
  const questElements = questions.map(item => 
  <Question 
  key={item.id} 
  id={item.id}
  question={item.question} 
  choices={item.choices} 
  correct={item.correct} 
  endGame={endGame}
  selectedAns={item.selectedAns}
  formData={formData}
  handleFormData={handleFormData}/>)
  

  function checkAnswers(event) {
    event.preventDefault()
    if (!endGame) {
      setEndGame(true)
      for(let i=0; i<5; i++){
        if(formData[questions[i].id] && formData[questions[i].id] == questions[i].answer) {
          questions[i].correct = true
          setCorrectCount(prevCount => prevCount + 1)
        }
        questions[i].selectedAns = formData[questions[i].id]
      }
    }
    else {
      newGame()
      setEndGame(false)
    }
  }

  return (
    <main>
      {
      startGame ? 
      <div className="main-content">
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
        <button className="main-btn" onClick={()=>newGame()}>Start Quiz</button>
      </div>
      : 
      <form className="form-elements" onSubmit={checkAnswers}>
        {questElements}
        <div className="result_play_btn">
          {endGame && <p className="question">You Scored {correctCount}/5 correct answers</p>}
          <button className="form-btn">{endGame ? "Play Again" : "Check Answers"}</button>
        </div>
        
      </form>
      
      }    
    </main>
    
  )
}

export default App