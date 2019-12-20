import React, { useState, useEffect, useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import ReactPDF from '@react-pdf/renderer';
import MyDocument from '../components/MyDocument'
const FormSubmission = () => {
  const [contactInformation, setContactInformation] = useState({
    firstName: '',
    lastName: '',
    nurseEmail: '',
    phoneNumber: '',
    recruiterEmail: 'jeremy@nurse2nursestaffing.com',
  })

  const [checkBox, setCheckBox] = useState(false)
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
  const [image, setImage] = useState()
  const trim = () => {
    setImage(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'))
  
  }

const tokenStr = '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'
  const sendEmail = async () => {
    // trim()
    const response1 = await axios.post("https://api.sendgrid.com/v3/mail/send", { headers: {"Authorization" : `Bearer ${tokenStr}`, "content-type" : "application/json"}  , data: {"personalizations":[{"to":[{"email":"nolanjacobson0@gmail.com","name":"Nolan Jacobson"}],"subject":"test success"}],"content": [{"type": "text/plain", "value": "Heya!"}],"from":{"email":"nolanjacobson0@gmail.com","name":"Sam Smith"},"reply_to":{"email":"nolanjacobson0@gmail.com","name":"Sam Smith"}}})
    console.log(response1)
    // ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`)
    // console.log(image)
    // const response = await axios.post(
    //   'https://localhost:5001/api/NurseInformation',
    //   contactInformation
    // )
    
  }
  return (
    
    <section className="wrapper">
      {checkBox && <Redirect to ="/"/>}
      <section className="recruiterInformation">
        <p className="recruiterEmail">Recruiter Name *</p>
        <div className="recruiterEmailContainer">
          <select
            name="recruiterEmail"
            value={contactInformation.recruiterEmail}
            onChange={e => handleChange(e)}
            className="recruiterAddress"
            required
          >
            <option value={'jeremy@nurse2nursestaffing.com'}>Jeremy</option>
            <option value={'mary@nurse2nursestaffing.com'}>Mary</option>
            <option value={'mary@nurse2nursestaffing.com'}>Megan</option>
            <option value={'nikaela@nurse2nursestaffing.com'}>Nikaela</option>
            <option value={'tobin@nurse2nursestaffing.com'}>Tobin</option>
          </select>
        </div>
      </section>
      <section className="apiCallBox">
        <p className="contactInformation">Contact Information *</p>
        <form className="contactInformationForm">
          <fieldset>
            <section className="row1">
              <div>
                First Name:
                <input
                  placeholder="First Name *"
                  name="firstName"
                  value={contactInformation.firstName}
                  onChange={e => handleChange(e)}
                  required
                />{' '}
              </div>

              <br></br>
              <div>
                Last Name:
                <input
                  placeholder="Last Name *"
                  name="lastName"
                  value={contactInformation.lastName}
                  onChange={e => handleChange(e)}
                  required
                />
              </div>
            </section>
            <section className="row2">
              <div>
                Email:{' '}
                <input
                  placeholder="Email *"
                  name="nurseEmail"
                  value={contactInformation.nurseEmail}
                  onChange={e => handleChange(e)}
                  required
                />
              </div>
              <br></br>
              <div>
                Phone Number:{' '}
                <input
                  type="number"
                  placeholder="Phone Number *"
                  name="phoneNumber"
                  value={contactInformation.phoneNumber}
                  onChange={e => handleChange(e)}
                  placeholder="Phone Number *"
                  required
                />
              </div>
            </section>
          </fieldset>
        </form>
      </section>
      <p className="signature">Signature *</p>
      <section className="apiCallBox2">
        <section className="sigCanvas">
          <SignatureCanvas
            backgroundColor="white"
            penColor="black"
            canvasProps={{ width: 300, height: 100, className: 'sigCanvas' }}
            ref={sigCanvas}
          />
          <button className="clearButton" onClick={clear}>
            Clear
          </button>
        </section>
        <div className="finishSection">
          <p className="certification">
            I certify this test was filled out to the best of my knowledge.
          </p>
          <button
            className="finish"
            disabled={
              (contactInformation.firstName &&
                contactInformation.lastName &&
                contactInformation.phoneNumber &&
                contactInformation.nurseEmail ) == ''
            }
            onClick={sendEmail}
          >
            Finish
          </button>
        </div>
      </section>
      <img src={image}/>
    </section>
  )
}

export default FormSubmission
