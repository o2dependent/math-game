import { resetWarningCache } from "prop-types"
import React, { useState } from "react"
import "./AdditionGame.css"

export default function AdditionGame() {
  // Create selectable options
  const getOptions = solution => {
    const magicNum = Math.floor(Math.random() * 4)
    const set = new Set()

    for (let i = 0; i < 4; i++) {
      if (i === magicNum) {
        set.add(solution)
      } else {
        let option
        do {
          option = solution + Math.floor(Math.random() * 5 - 5)
        } while (set.has(option))
        set.add(option)
      }
    }

    return set
  }

  // Create a new problem
  const createProblem = () => {
    const num1 = Math.floor(Math.random() * 10)
    const num2 = Math.floor(Math.random() * 10)
    const solution = num1 + num2

    const options = getOptions(solution)

    return { num1, num2, solution, options }
  }

  // State variable
  const [curProblem, setCurProblem] = useState(createProblem())
  const [selected, setSelected] = useState(null)
  const [incorrect, setIncorrect] = useState(new Set())

  // Extracted values
  const { num1, num2, solution, options } = curProblem

  // New game
  const resetBoard = () => {
    setIncorrect(new Set())
    setSelected(null)
    setCurProblem(createProblem())
  }

  // Handle submitting an answer
  const handleSubmit = () => {
    if (selected === solution) {
      resetBoard()
    } else {
      setIncorrect(new Set([...incorrect, selected]))
      setSelected(null)
    }
  }

  return (
    <div className="Game">
      <div className="Game__header">
        <p>Render's Addition Game</p>
      </div>
      <div className="Game__problem">
        <p>
          {num1} + {num2}
        </p>
      </div>
      <div className="Game__option__container">
        {Array.from(options).map(x => (
          <button
            className={`Game__option ${
              x === selected ? "Game__selected" : ""
            } ${incorrect.has(x) ? "Game__disabled" : ""}`}
            key={x}
            onClick={() => setSelected(x)}
          >
            {x}
          </button>
        ))}
      </div>
      <button className="Game__submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}
