import React, { useState } from 'react'
import nurse2nursestaffingimage from './images/nurse2nurse.png'
import TestData from './data/tests.json'
import AddRatings from '../components/AddRatings'
import FormSubmission from '../components/FormSubmission'
import Header from '../components/Header'
const TestPage = props => {
  const [show, setShow] = useState(true)
  const setCategory = props.match.params.category
  const setTest = decodeURIComponent(props.match.params.test)
  const newTestData = TestData.tests
    .filter(category => category.category === setCategory)
    .filter(test => test.testName === setTest)[0].testData
    console.log(newTestData)
    const [frequencyRatingValue, setFrequencyRatingValue] = useState(0)
    const [proficiencyRatingValue, setProficiencyRatingValue] = useState(0)
        
  return (
    <>
    <section className="wrapEverything">
      <Header
      show = {show}
      setTest = {setTest}
      setShow = {setShow}
      nurse2nursestaffingimage = {nurse2nursestaffingimage}/>
      <ul className="newTestData">
      {newTestData.map((name, index) => {
        return (
      <AddRatings name={name} index={index}  key={index} />)})}
        </ul>
        <FormSubmission/>
    </section>
    </>
  )
}

export default TestPage
