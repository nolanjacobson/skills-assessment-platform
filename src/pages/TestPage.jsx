import React, { useState, useEffect, useRef} from 'react'
import nurse2nursestaffingimage from './images/nurse2nurse.png'
import Ratings from 'react-rating'
import TestData from './data/tests.json'
import SignatureCanvas from 'react-signature-canvas'
import AddRatings from '../components/AddRatings'
import {Redirect} from 'react-router-dom'

const TestPage = props => {
  const [show, setShow] = useState(true)
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
  const setTest = decodeURIComponent(props.match.params.test)
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
  const [recruiterAddress, setRecruiterAddress] = useState({recruiterAddress: ''})
  const handleChange = e => {
    e.persist()
    setContactInformation(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const sigCanvas = useRef(null)
  const clear = () => {
    sigCanvas.current.clear()
  }
  const [image, setImage] = useState(null)
  const trim = () => {
    if (!sigCanvas.current.isEmpty()) {
    setImage(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'))
    console.log(image)
    }
  }
  return (
    <>
      <img
        className="testPageLogo"
        src={nurse2nursestaffingimage}
        alt="Nurse 2 Nurse Staffing Image"
      />
      {/* <Redirect to="/"/><p>Back</p> */}
      <section className="standardBox">
        <p className="skillsAssessmentTest">
          Skills Assessment Test: {setTest}
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
      <ul className="newTestData">
      {newTestData.map((name, index) => {
        return (
      <AddRatings name={name} index={index}/>)})}
        </ul>
      <section className="wrapper">
        <section className="optionalRecruiterInformation">
          <legend className="recruiterAddressLegend">Recruiter Email (Optional)</legend> 
          <input className="recruiterAddress" name="recruiterAddress" value={recruiterAddress.recruiterAddress} onChange={(e) => setRecruiterAddress(e.target.value)} placeholder="Recruiter Email Address"></input>
        </section>
      <section className="apiCallBox">
        <form>
          <legend className="contactInformation">Contact Information *</legend>
          <fieldset>
            <section className="row1">
              <span>First Name:
              <input
                placeholder="First Name *"
                name="firstName"
                value={contactInformation.firstName}
                onChange={e => handleChange(e)}
                required
              />  </span>

              <br></br>
              <span>Last Name:
              <input
                placeholder="Last Name *"
                name="lastName"
                value={contactInformation.lastName}
                onChange={e => handleChange(e)}
                required
              /></span>
            </section>
            <section className="row2">
              <span>Email:{' '}
              <input
                placeholder="Email *"
                name="email"
                value={contactInformation.email}
                onChange={e => handleChange(e)}
                required
              /></span>
              <br></br>
              <span>Phone Number:{' '}
              <input
                type="number"
                placeholder="Phone Number *"
                name="phoneNumber"
                value={contactInformation.phoneNumber}
                onChange={e => handleChange(e)}
                placeholder="Phone Number *"
                required
              /></span>
            </section>
          </fieldset>
        </form>
      </section>
        <p className="signature">Signature *</p>
      <section className="apiCallBox2">
        <section className="sigCanvas"><SignatureCanvas
          backgroundColor="white"
          penColor="black"
          canvasProps={{ width: 300, height: 200, className: 'sigCanvas' }}
          ref={sigCanvas}
        /></section>
      <button className="clearButton" onClick={clear}>Clear</button>
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
          Finish
        </button>
      </section>
      </section>
    </>
  )
}

export default TestPage
