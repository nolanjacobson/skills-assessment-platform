import React, { useState, useEffect, useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'
const FormSubmission = props => {
  return (
    <>
      {props.success &&
        window.location.replace('https://www.nurse2nursestaffing.com/')}
      <section className="wrapper">
        <section className="recruiterInformation">
          <p className="recruiterEmail">Recruiter Name *</p>
          <div className="recruiterEmailContainer">
            <select
              name="recruiterEmail"
              value={props.contactInformation.recruiterEmail}
              onChange={e => props.handleChange(e)}
              className="recruiterAddress"
              required
            >
              {props.recruiters.map(recruiter => {
                return (
                  <option value={recruiter.recruiterEmail}>
                    {recruiter.recruiterName}
                  </option>
                )
              })}
            </select>
          </div>
        </section>
        <section className="apiCallBox">
          <p className="contactInformation">Contact Information *</p>
          <form className="contactInformationForm" onSubmit={props.setSpinner}>
            <section className="shrinkThis">
              <section className="row1">
                <div>
                  First Name:
                  <input
                    placeholder="First Name *"
                    name="firstName"
                    value={props.contactInformation.firstName}
                    onChange={e => props.handleChange(e)}
                    required
                  />{' '}
                </div>

                <br></br>
                <div>
                  Last Name:
                  <input
                    placeholder="Last Name *"
                    name="lastName"
                    value={props.contactInformation.lastName}
                    onChange={e => props.handleChange(e)}
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
                    value={props.contactInformation.nurseEmail}
                    onChange={e => props.handleChange(e)}
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
                    value={props.contactInformation.phoneNumber}
                    onChange={e => props.handleChange(e)}
                    placeholder="Phone Number *"
                    required
                  />
                </div>
              </section>
            </section>
            <p className="signature">Signature *</p>
            <section className="apiCallBox2">
              <section className="sigCanvas">
                <SignatureCanvas
                  backgroundColor="white"
                  penColor="black"
                  canvasProps={{ className: 'siggCanvas' }}
                  ref={props.sigCanvas}
                />
                <section className="flexButtons">
                  <button
                    type="button"
                    className="saveButton"
                    onClick={props.save}
                  >
                    Save *
                  </button>
                  <button
                    type="button"
                    className="clearButton"
                    onClick={props.clear}
                  >
                    Clear
                  </button>
                </section>
              </section>
              <div className="finishSection">
                <p className="certification">
                  I certify this test was filled out to the best of my
                  knowledge.
                </p>
                {props.spinnerVal ? (
                  <Spinner variant="primary" animation="border" role="status">
                    <span>Loading...</span>
                  </Spinner>
                ) : (
                  <button
                    className="finish"
                    disabled={props.signatureCanvas === 'val'}
                    type="submit"
                  >
                    Finish
                  </button>
                )}
              </div>
            </section>
          </form>
        </section>
      </section>
    </>
  )
}

export default FormSubmission
