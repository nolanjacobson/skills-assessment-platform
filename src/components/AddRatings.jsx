import React, { useState, useEffect } from 'react'
import Ratings from 'react-rating'

const AddRatings = props => {
  const [frequencyRating, setFrequencyRating] = useState(0)
  const [proficiencyRating, setProficiencyRating] = useState(0)
  const [frequencyRatingSum, setFrequencyRatingSum] = useState([])
  const [proficiencyRatingSum, setProficiencyRatingSum] = useState([])

  // useEffect(() => {
  //   setProficiencyRatingSum(prev => prev += proficiencyRating)
  //   console.log(proficiencyRatingSum)
  // }, [proficiencyRating])

  return (
    <li className="newTestDataLi">
      {props.name.includes('*') ? (
        <>
          <h1 className="newCategory">{props.name}</h1>{' '}
          <section className="flexThem">
            <div className="headerProficiency">
              Proficiency Rating Frequency Rating
            </div>
          </section>
          <hr></hr>
        </>
      ) : (
        <>
          <span className="testDataText">{props.name}</span>{' '}
          <section className="frequencyProficiency">
            <Ratings
              start={0}
              stop={4}
              initialRating={proficiencyRating}
              emptySymbol="far fa-plus-square"
              fullSymbol="fas fa-plus-square"
              // placeholderSymbol="fas fa-heartbeat"
              onClick={rating => setProficiencyRating(rating)}
            />
            &emsp;
            <Ratings
              start={0}
              stop={4}
              initialRating={frequencyRating}
              emptySymbol="far fa-plus-square"
              fullSymbol="fas fa-plus-square"
              // placeholderSymbol="fas fa-heartbeat"
              onClick={newRating => setFrequencyRating(newRating)}
            />
          </section>
          <hr></hr>
        </>
      )}
      {'  '}
    </li>
  )
}

export default AddRatings
