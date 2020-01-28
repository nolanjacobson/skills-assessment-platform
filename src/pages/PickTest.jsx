import React, { useState, useEffect } from 'react'
import nurse2nursestaffingimage from './images/nurse2nurse.png'
import data from './data/categories.json'
import { Link } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'

const PickTest = () => {
  const [listen, setListen] = useState('Advanced Practice')
  const [showNext, setShowNext] = useState(false)
  const [secondListen, setSecondListen] = useState()
  const [testDropDown, setTestDropDown] = useState([])
  const [buttonDrop, setButtonDrop] = useState(false)
  const uri = encodeURIComponent(secondListen)
  useEffect(() => {
    if (listen) {
      setShowNext(true)
      setTestDropDown(
        data.categories.filter(f => f.category === listen)[0].tests
      )
    } else if (!listen) {
      setShowNext(false)
      setButtonDrop(false)
    }
  }, [listen])

  useEffect(() => {
    if (secondListen) {
      setButtonDrop(true)
    } else if (!secondListen || !listen) {
      setButtonDrop(false)
    }
  }, [secondListen])

  const [button, setButton] = useState(false)
  const googleIsAuthorized = () => {
    setButton(true)
    localStorage.setItem('isAuthorized', true)
    console.log(localStorage.getItem('isAuthorized'))
  }
  return (
    <div className="outerBox">
      <section className="box">
        <img className="nurse2nurseHome" src={nurse2nursestaffingimage} />
        <p className="chooseTest">Please choose a Skills Assessment Test</p>
        <p className="homePagePTag">Category *</p>
        <select
          className="categorySelect"
          onChange={e => setListen(e.target.value)}
        >
          {/* <option value={null}></option> */}
          {data.categories.map((categoryName, index) => {
            return (
              <option key={index} value={categoryName.category}>
                {categoryName.category}
              </option>
            )
          })}
        </select>

        {showNext && (
          <>
            <p className="homePagePTag">Test *</p>
            <select
              className="testSelect"
              onChange={e => setSecondListen(e.target.value)}
            >
              <option value={null}></option>
              {testDropDown.map((category, index) => {
                return <option key={index}>{category}</option>
              })}
            </select>
          </>
        )}
        {buttonDrop ? (
          <div className="recaptcha">
            <ReCAPTCHA
              sitekey="6LcokdMUAAAAAEwvq_XO8FnSmbJ9TARpFoHuyOBf"
              onChange={googleIsAuthorized}
            />
          </div>
        ) : (
          <></>
        )}
        {button && (
          <Link to={`/${listen}/${uri}`}>
            <button className="submit">Start</button>
          </Link>
        )}
      </section>
    </div>
  )
}

export default PickTest
