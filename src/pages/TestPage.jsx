import React, { useState, useEffect } from 'react'
import nurse2nursestaffingimage from './images/nurse2nurse.png'
import Ratings from 'react-rating'
import TestData from './data/tests.json'
import SignatureCanvas from 'react-signature-canvas'
import AddRatings from '../components/AddRatings'

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
  const [checkBox, setCheckBox] = useState(false)
  const newTestData = TestData.tests
    .filter(category => category.category === setCategory)
    .filter(test => test.testName === setTest)[0].testData
  const [contactInformation, setContactInformation] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  })
  console.log(newTestData)
  const [frequencyRatingValue, setFrequencyRatingValue] = useState(0)
  const [proficiencyRatingValue, setProficiencyRatingValue] = useState(0)
  const handleChange = e => {
    e.persist()
    setContactInformation(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
                          emptySymbol="far fa-plus-square"
                          fullSymbol="fas fa-plus-square"
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
                          emptySymbol="far fa-plus-square"
                          fullSymbol="fas fa-plus-square"
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
      </section>
      <AddRatings newTestData={newTestData}/>
      <section className="wrapper">
      <section className="apiCallBox">
        <form>
          <legend>Contact Information</legend>
          <fieldset>
            <section className="row1">
              First Name:
              <input
                placeholder="First Name"
                name="firstName"
                value={contactInformation.firstName}
                onChange={e => handleChange(e)}
                required
              />
              <br></br>
              Last Name:
              <input
                placeholder="Last Name"
                name="lastName"
                value={contactInformation.lastName}
                onChange={e => handleChange(e)}
                required
              />
            </section>
            <section className="row2">
              Email:{' '}
              <input
                placeholder="Email"
                name="email"
                value={contactInformation.email}
                onChange={e => handleChange(e)}
                required
              />
              <br></br>
              Phone Number:{' '}
              <input
                type="number"
                placeholder="Phone Number"
                name="phoneNumber"
                value={contactInformation.phoneNumber}
                onChange={e => handleChange(e)}
                placeholder="Phone Number"
                required
              />
            </section>
          </fieldset>
        </form>
      </section>
      <section className="apiCallBox2">
        <p className="signature">Signature</p>
        <section className="sigCanvas"><SignatureCanvas
          backgroundColor="white"
          penColor="black"
          canvasProps={{ width: 250, height: 200, className: 'sigCanvas' }}
        /></section>
        <span>
          <input
            className="checkbox"
            type="checkbox"
            onChange={() => setCheckBox(true)}
            required
          />
          <p className="certification">
            I certify this test was filled out to the best of my knowledge
          </p>
        </span>
        <button className="submit" disabled={true}>
          Submit
        </button>
        {console.log(checkBox)}
      </section>
      </section>
    </>
  )
}

export default TestPage
