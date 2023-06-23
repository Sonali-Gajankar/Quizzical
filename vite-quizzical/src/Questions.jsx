import React from "react";
import {decode} from "he"
export default function Question(props){
    const radioBtns = props.choices.map(eachChoice => {
        
        const color = props.correct ? "green" : "red"
        return (<div className="radios">
            {props.endGame ? 
            <input 
            disabled
            className="question-radio-btn"
            id={eachChoice}
            name={props.id} 
            type="radio" 
            value={eachChoice} 
            onChange={props.handleFormData}/>
            :
            <input 
            className="question-radio-btn"
            id={eachChoice}
            name={props.id} 
            type="radio" 
            value={eachChoice} 
            checked={props.formData[props.id] == eachChoice}
            onChange={props.handleFormData}/>
            }
            {props.endGame ? 
            <label className={eachChoice == props.selectedAns ? "question-radio-label "+color : "question-radio-label"} htmlFor={eachChoice}>{eachChoice}</label>
            : 
            <label className={"question-radio-label "} htmlFor={eachChoice}>{decode(eachChoice)}</label>
            }
        </div>)
        })
    return (
        <section className="question-section">
            <h3 className="question">{decode(props.question)}</h3>
            <div className="radio-section">
                {radioBtns}
            </div>
            <hr />
        </section>
    )
}