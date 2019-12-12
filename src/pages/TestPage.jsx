import React, {useState, useEffect} from 'react'
import nurse2nursestaffingimage from './images/nurse2nurse.png'

const TestPage = props => {
  const [show, setShow] = useState(false)

  return (
  <>
  <section className="standardBox">
  <img src={nurse2nursestaffingimage} alt="Nurse 2 Nurse Staffing Image"/>
  <p>Skills Assessment Test: {props.match.params.test}</p>
  <button onClick={() => !show ? setShow(true) : setShow(false)}>Rating Scale</button>
  {show ? (<ul className="ratingsUl">
    <li className="proficiencyRatingsLi">
<p>Proficiency Rating Labels</p>
<p>Inexperienced - no experience</p>
<p>Novice - need assistance</p>
<p>Proficient - perform independently</p>
<p>Expert - serve as a resource</p>
</li>
<li className="frequencyRatingsLi">
<h1>Frequency Rating Labels</h1>
<p>Never - observed only</p>
<p>Sometimes - couple times a year</p>
<p>Often - couple times a month</p>
<p>Frequent - daily or weekly</p></li></ul>) : (<></>)}
  </section>
  <div>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  </>)
}

export default TestPage
