import React, { useState, useEffect } from 'react'
import nurse2nursestaffingimage from './images/nurse2nurse.png'
import data from './data/categories.json'
import {Link} from 'react-router-dom'
const HomePage = () => {
  const [listen, setListen] = useState()
  const [showNext, setShowNext] = useState(false)
  const [secondListen, setSecondListen] = useState()
  const [testDropDown, setTestDropDown] = useState([])
  const [buttonDrop, setButtonDrop] = useState(false)
  useEffect(() => {
    console.log({ listen })
    if (listen) {
      setShowNext(true)
      setTestDropDown(
        data.categories.filter(f => f.category === listen)[0].tests
        // filter returns an array and we want the first element inside it
      )}
    else if (!listen) {
      setShowNext(false)
      setButtonDrop(false)
    }
  }, [listen])

  useEffect(() => {
    console.log({ secondListen })
    if (secondListen) {
      setButtonDrop(true)
      }
    else if (!secondListen || !listen) {
      setButtonDrop(false)
    }
  }, [secondListen])

  return (
    <div className="outerBox">
      <section className="box">
        <img className="nurse2nurseHome" src={nurse2nursestaffingimage} />
        <p className="chooseTest">Please choose a Skills Assessment Test</p>
        <select className="categorySelect" onChange={e => setListen(e.target.value)}>
          <option value={null}></option>
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
          <select className="testSelect" onChange={e => setSecondListen(e.target.value)}>
             <option value={null}></option>
            {testDropDown.map((category, index) => {
              return <option key={index}>{category}</option>
            })}
          </select>
          </>
        )}
        {buttonDrop ? <Link to={`/${listen}/${secondListen}`}><button className="tempSubmit">Submit</button></Link> : (<></>)}
            {console.log (buttonDrop)}
      </section>
    </div>
  )
}

export default HomePage
