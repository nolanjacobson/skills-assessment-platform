import React, { useState, useEffect } from 'react'
import nurse2nursestaffingimage from './images/nurse2nurse.png'
import Ratings from 'react-rating'
import TestData from './data/tests.json'

const TestPage = props => {
  const [show, setShow] = useState(false)
  const proficiencyRatingsList = [
    'Proficiency Rating Labels',
    'Inexperienced - no experience',
    'Novice - need assistance',
    'Proficient - perform independently',
    'Expert - serve as a resource',
  ]
  const frequencyRatingsList = [
    'Frequency Rating Labels',
    'Never - observed only',
    'Sometimes - couple times a year',
    'Often - couple times a month',
    'Frequent - daily or weekly',
  ]
  const plusButton = '+ Rating Scale'
  const minusButton = '- Rating Scale'
  const setCategory = props.match.params.category
  const setTest = props.match.params.test
  const newTestData = TestData.tests
  .filter(category => category.category === setCategory)
  .filter(test => test.testName === setTest)[0].testData

  console.log(newTestData)
  return (
    <>
      <img
        className="testPageLogo"
        src={nurse2nursestaffingimage}
        alt="Nurse 2 Nurse Staffing Image"
      />
      <section className="standardBox">
        <p className="skillsAssessmentTest">
          Skills Assessment Test: {props.match.params.test}
        </p>
        <button
          className="ratingScale"
          onClick={() => (!show ? setShow(true) : setShow(false))}
        >
          {!show ? plusButton : minusButton}
        </button>
        {show ? (
          <ul className="ratingsUl">
            <li className="proficiencyRatingsLi">
              {proficiencyRatingsList.map((rating, index) => {
                {
                  if (index > 0) {
                    return (
                      <p className="ratingP">
                        <Ratings
                          start={0}
                          stop={index}
                          readonly={true}
                          emptySymbol="fas fa-heartbeat"
                          fullSymbol="fas fa-heartbeat"
                        />{' '}
                        {rating}
                      </p>
                    )
                  } else {
                    return <h4>{rating}</h4>
                  }
                }
              })}
            </li>
            <hr></hr>
            <li className="frequencyRatingsLi">
              {frequencyRatingsList.map((rating, index) => {
                {
                  if (index > 0) {
                    return (
                      <p className="ratingP">
                        <Ratings
                          start={0}
                          stop={index}
                          readonly={true}
                          emptySymbol="fas fa-heartbeat"
                          fullSymbol="fas fa-heartbeat"
                        />{' '}
                        {rating}
                      </p>
                    )
                  } else {
                    return <h4>{rating}</h4>
                  }
                }
              })}
            </li>
          </ul>
        ) : (
          <></>
        )}
        <ul>
          
            {newTestData.map(name => {
              return (
                <li>
                  <Ratings
                    start={0}
                    stop={4}
                    emptySymbol="fas fa-heartbeat"
                    fullSymbol="fas fa-heartbeat"
                  />
                  <p>{name}</p>
                </li>
              )
            })}
        </ul>
      </section>
    </>
  )
}

export default TestPage
