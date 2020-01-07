import React, { useState, useEffect } from 'react'
import Ratings from 'react-rating'
import jsPDF from 'jspdf'
import axios from 'axios'

const AddRatings = props => {
  const [frequencyRating, setFrequencyRating] = useState(1)
  const [proficiencyRating, setProficiencyRating] = useState(1)

  useEffect(() => {
    props.updatePageData(props.name, frequencyRating, proficiencyRating)
  }, [frequencyRating, proficiencyRating])
  
  return (
    <li className="newTestDataLi">
      {/* {props.name.includes('*') ? (
        <>
          <h1 className="newCategory">{props.name}</h1>{' '}
          <section className="flexThem">
            <div className="headerProficiency">
              Proficiency Rating Frequency Rating
            </div>
          </section>
          <hr></hr>
        </>
      ) : ( */}
        <>
          <span className="testDataText">{props.name}</span>{' '}
          <section className="frequencyProficiency">
            <Ratings
              start={0}
              stop={4}
              initialRating={proficiencyRating}
              emptySymbol={'far fa-plus-square'}
              fullSymbol={'fas fa-plus-square'}
              // placeholderSymbol="fas fa-heartbeat"
              onClick={rating => setProficiencyRating(rating)}
            />
            &emsp;
            <Ratings
              start={0}
              stop={4}
              initialRating={frequencyRating}
              emptySymbol={<i class="far fa-plus-square"></i>}
              fullSymbol={<i class="fas fa-plus-square"></i>}
              placeholderSymbol="fas fa-heartbeat"
              onClick={rating => setFrequencyRating(rating)}
            />
          </section>
          <hr></hr>
        </>
      }
      {'  '}
    </li>
  )
}

export default AddRatings
