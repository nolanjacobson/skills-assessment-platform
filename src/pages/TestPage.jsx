import React, { useState, useEffect, useRef } from 'react'
import nurse2nursestaffingimage from './images/nurse2nurse.png'
import TestData from './data/tests.json'
import AddRatings from '../components/AddRatings'
import FormSubmission from '../components/FormSubmission'
import Header from '../components/Header'
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import axios from 'axios'

const TestPage = props => {
  console.log(TestData)
  const [show, setShow] = useState(true)
  const [anotherValue, setAnotherValue] = useState(false)
  const setCategory = props.match.params.category
  const setTest = decodeURIComponent(props.match.params.test)
  const newTestData = TestData.tests
    .filter(category => category.category === setCategory)
    .filter(test => test.testname === setTest)[0].testData
  console.log(newTestData)
  const [checkBox, setCheckBox] = useState(false)
  const [contactInformation, setContactInformation] = useState({
    firstName: '',
    lastName: '',
    nurseEmail: '',
    phoneNumber: '',
    recruiterEmail: '',
    signatureCanvas: 'val',
    pdfOutput: '',
  })

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
  const [image, setImage] = useState('')
  const [newImage, setNewImage] = useState('')
  const [eventListener, setEventListener] = useState(false)

  const [pageData, setPageData] = useState({})

  const [temp, setTemp] = useState('')

  const updatePageData = (question, freq, prof) => {
    setPageData(prev => {
      return {
        ...prev,
        [question]: { freq, prof },
      }
    })
  }

  const print = () => {
    setAnotherValue(true)
    const filename =
      contactInformation.firstName + '-' + contactInformation.lastName + '.pdf'

    html2canvas(document.body, { scale: 2 }).then(canvas => {
      // document.querySelectorAll('.fa-plus-square').style.display-none
      let pdf = new jsPDF('p', 'mm', 'a4', [297, 210])
      let imgWidth = 210
      let pageHeight = 295
      let imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let imgData = canvas.toDataURL('image/png')
      let position = 0

      pdf.addImage(imgData, 'PNG', 297, 210)
      // heightLeft -= pageHeight

      // while (heightLeft >= 0) {
      //   position = heightLeft - imgHeight
      //   pdf.addPage()
      //   pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      //   heightLeft -= pageHeight
      // }
      // pdf.addImage(image, 'PNG', 0, 0)
      // pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298)
      pdf.save(filename)
      // console.log(pdf.output('datauristring'))
    })
  }
  const save = () => {
    contactInformation.signatureCanvas = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL('image/png')
      .toString()
    console.log(contactInformation.signatureCanvas)
    setImage(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'))
    setEventListener(true)
  }

  const sendEmail = async e => {
    e.preventDefault()
    console.log(contactInformation.signatureCanvas)
    const response = await axios.post(
      'https://localhost:5001/api/NurseInformation',
      contactInformation
    )
    setCheckBox(true)
  }

  return (
    <>
      <section id="wrapEverything">
        <Header
          show={show}
          setTest={setTest}
          setShow={setShow}
          nurse2nursestaffingimage={nurse2nursestaffingimage}
        />
        <ul id="newTestData" className="newTestData">
          {newTestData.map((name, index) => {
            return (
              <>
                <AddRatings
                  name={name}
                  index={index}
                  key={index}
                  pageData={pageData}
                  updatePageData={updatePageData}
                />
              </>
            )
          })}
          {/* <span>{setSum(sum += frequencyRating[index])}</span> */}
        </ul>
        <FormSubmission
          sendEmail={sendEmail}
          clear={clear}
          save={save}
          sigCanvas={sigCanvas}
          handleChange={handleChange}
          contactInformation={contactInformation}
        />
        <button className="pdf" type="button" onClick={print}>
          Download
        </button>
      </section>
    </>
  )
}

export default TestPage
