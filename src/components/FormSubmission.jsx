import React, { useState, useEffect, useRef} from 'react'
import SignatureCanvas from 'react-signature-canvas'

const FormSubmission = () => {
  const [contactInformation, setContactInformation] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  })
const [recruiterAddress, setRecruiterAddress] = useState({recruiterAddress: ''})
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
const [image, setImage] = useState(null)
const trim = () => {
if (!sigCanvas.current.isEmpty()) {
setImage(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'))
console.log(image)
}
}

  return (
  <section className="wrapper">
        <section className="optionalRecruiterInformation">
          <legend className="recruiterAddressLegend">Recruiter Email (Optional)</legend> 
          <div className="recruiterAddressContainer"><input className="recruiterAddress" name="recruiterAddress" value={recruiterAddress.recruiterAddress} onChange={(e) => setRecruiterAddress(e.target.value)} placeholder="Recruiter Email Address"></input></div>
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
  )
}

export default FormSubmission;
