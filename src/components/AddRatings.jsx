import React, { useState } from 'react'
import Ratings from 'react-rating'
import { exportNamespaceSpecifier } from '@babel/types'

const AddRatings = props => {
  const [frequencyRating, setFrequencyRating] = useState(1)
  const [proficiencyRating, setProficiencyRating] = useState(1)
  const newTestData = props.newTestData
  return (
    <ul className="newTestData">
      {newTestData.map((name, index) => {
        return (
          <li className="newTestData">
            {name.includes('*') ? (
              <h1 className="newCategory">{name}</h1>
            ) : (
              <span className="testDataText">{name}</span>
            )}
            {'  '}
            <section className="frequencyProficiency">
              {index > 0 ? (
                <Ratings
                  start={0}
                  stop={4}
                  initialRating={proficiencyRating}
                  emptySymbol="far fa-plus-square"
                  fullSymbol="fas fa-plus-square"
                  // placeholderSymbol="fas fa-heartbeat"
                  onClick={newRating => setProficiencyRating(newRating)}
                />) : (
                <></>
              )}
              {index > 0 ? (<>
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
      })}
    </ul>
  )
}

export default AddRatings
