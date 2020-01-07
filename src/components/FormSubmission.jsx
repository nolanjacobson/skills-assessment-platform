import React, { useState, useEffect, useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import ReactPDF from '@react-pdf/renderer'
import MyDocument from '../components/MyDocument'
import AddRatings from '../components/AddRatings'
import * as jsPDF from 'jspdf'
import ReactDOMServer from 'react-dom/server'
import html2canvas from 'html2canvas'

const FormSubmission = props => {
  return (
    <section className="wrapper" data-html2canvas-ignore>
      {props.checkBox && <Redirect to="/" />}
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
            <option value={'jeremy@nurse2nursestaffing.com'}>Jeremy</option>
            <option value={'mary@nurse2nursestaffing.com'}>Mary</option>
            <option value={'mary@nurse2nursestaffing.com'}>Megan</option>
            <option value={'nikaela@nurse2nursestaffing.com'}>Nikaela</option>
            <option value={'tobin@nurse2nursestaffing.com'}>Tobin</option>
            <option value={'nolanjacobson0@Gmail.com'}>Nolan</option>
          </select>
        </div>
      </section>
      <section className="apiCallBox">
        <p className="contactInformation">Contact Information *</p>
        <form className="contactInformationForm" onSubmit={props.sendEmail}>
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
                canvasProps={{ width: 300, height: 150 }}
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
                I certify this test was filled out to the best of my knowledge.
              </p>
              <button
                className="finish"
                disabled={props.contactInformation.signatureCanvas === 'val'}
                type="submit"
                onClick={props.sendEmail}
              >
                Finish
              </button>
            
            </div>
          </section>
        </form>
      </section>
    </section>
  )
}

export default FormSubmission
