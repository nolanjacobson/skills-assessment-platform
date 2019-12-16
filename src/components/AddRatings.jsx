import React, { useState } from 'react'
import Ratings from 'react-rating'

const AddRatings = props => {
  const [frequencyRating, setFrequencyRating] = useState(1)
  const [proficiencyRating, setProficiencyRating] = useState(1)
  return (
          <li className="newTestData">
            {props.name.includes('*') ? (
              <h1 className="newCategory">{props.name}</h1>
            ) : (
              <span className="testDataText">{props.name}</span>
            )}
            {'  '}
            <section className="frequencyProficiency">
              {props.index > 0 ? (
                <Ratings
                  start={0}
                  stop={4}
                  initialRating={proficiencyRating}
                  emptySymbol="far fa-plus-square"
                  fullSymbol="fas fa-plus-square"
                  // placeholderSymbol="fas fa-heartbeat"
                  onClick={(rating) => setProficiencyRating(rating)}
                />) : (
                <></>
              )}
              {props.index > 0 ? (<>
              &emsp;
                <Ratings
                  start={0}
                  stop={4}
                  initialRating={frequencyRating}
                  emptySymbol="far fa-plus-square"
                  fullSymbol="fas fa-plus-square"
                  // placeholderSymbol="fas fa-heartbeat"
                  onClick={newRating => setFrequencyRating(newRating)}
                /></>
              ) : (
                <></>
              )}
            </section>
            <hr></hr>
          </li>
        )
}

export default AddRatings
