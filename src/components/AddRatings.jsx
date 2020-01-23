import React, { useState, useEffect } from 'react'
import Ratings from 'react-rating'

const AddRatings = props => {
  const [frequencyRating, setFrequencyRating] = useState(1)
  const [proficiencyRating, setProficiencyRating] = useState(1)
  const [question, setQuestion] = useState(props.question)
  useEffect(() => {
    props.updatePageData(
      props.section,
      question,
      frequencyRating,
      proficiencyRating
    )
  }, [frequencyRating, proficiencyRating])

  return (
    <>
      <span className="testDataText">
        {props.question.charAt(0)
          ? props.question.charAt(0).toUpperCase() + props.question.slice(1)
          : props.question}
      </span>{' '}
      <section className="frequencyProficiency">
        <Ratings
          start={0}
          stop={4}
          initialRating={proficiencyRating}
          emptySymbol={'far fa-plus-square'}
          fullSymbol={'fas fa-plus-square'}
          onClick={rating => setProficiencyRating(rating)}
        />
        &emsp;
        <Ratings
          start={0}
          stop={4}
          initialRating={frequencyRating}
          emptySymbol={'far fa-plus-square'}
          fullSymbol={'fas fa-plus-square'}
          placeholderSymbol="fas fa-heartbeat"
          onClick={rating => setFrequencyRating(rating)}
        />
      </section>
      <hr></hr>
    </>
  )
}

export default AddRatings
