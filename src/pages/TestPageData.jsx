import React, { useState, useEffect, useRef } from 'react'
import nurse2nursestaffingimage from './images/nurse2nurse.png'
import TestData from './data/tests.json'
import AddRatings from '../components/AddRatings'
import FormSubmission from '../components/FormSubmission'
import RenderHeader from '../components/RenderHeader'
import axios from 'axios'
import CategoryHeader from '../components/CategoryHeader'
import * as jsPDF from 'jspdf'
import 'jspdf-autotable'
import HiddenTable from './HiddenTable'
const TestPageData = props => {
  const [show, setShow] = useState(false)
  const [anotherValue, setAnotherValue] = useState(false)
  const setCategory = props.match.params.category
  const setTest = decodeURIComponent(props.match.params.test)
  const newTestData = TestData.tests
    .filter(category => category.category === setCategory)
    .filter(test => test.testname === setTest)[0].sections
  console.log(newTestData)
  const [checkBox, setCheckBox] = useState(false)
  const [contactInformation, setContactInformation] = useState({
    firstName: '',
    lastName: '',
    nurseEmail: '',
    phoneNumber: '',
    recruiterEmail: '',
    signatureCanvas: 'val',
    testDataPdf: '',
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
  const [headers, setHeaders] = useState([])
  const [pageData, setPageData] = useState({})

  const [temp, setTemp] = useState('')

  const updatePageData = (section, question, freq, prof) => {
    setPageData(prev => {
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [question]: { freq, prof },
        },
      }
    })
  }

  const save = () => {
    contactInformation.signatureCanvas = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL('image/png')
      .toString()
    console.log(contactInformation.signatureCanvas)
    setImage(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'))

    console.log(contactInformation.testDataPdf)
    console.log('data:application/pdf;filename=generated.pdf;base64,'.length)
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

  useEffect(() => {
    if (eventListener) {
      newTestData.map((header, sectionIndex) => {
        setProfSum(previous => {
          return [
            ...previous,
            Object.values(pageData[header.header]).reduce(
              (prev, { prof }) => prev + prof,
              0
            ),
          ]
        })
        setFreqSum(previous => {
          return [
            ...previous,
            Object.values(pageData[header.header]).reduce(
              (prev, { freq }) => prev + freq,
              0
            ),
          ]
        })
        setLengths(previous => {
          return [...previous, Object.keys(pageData[header.header]).length]
        })
        setCheckBox(true)
      })
    }
  }, [eventListener])

  useEffect(() => {
    if (checkBox) {
      profSum.map((prof, index) => {
        setProfAverage(previous => {
          return [...previous, Math.floor(prof / lengths[index])]
        })
      })

      freqSum.map((freq, index) => {
        setFreqAverage(previous => {
          return [...previous, Math.floor(freq / lengths[index])]
        })
      })
    }
    if (freqSum.length > 0) {
      console.log(freqSum)
      const add = (a, b) => a + b

      const freqTotal = freqSum.reduce(add)
      const profTotal = profSum.reduce(add)
      const questionLength = lengths.reduce(add)
      setOverallFreqScore(freqTotal / questionLength)
      setOverallProfScore(profTotal / questionLength)
    }

    setShowNow(true)
  }, [checkBox])

  useEffect(() => {
    if (showNow) {
      setAnotherShowNow(true)
      var doc = new jsPDF()
      doc.setFontSize(40)
      doc.text('Hello World', 35, 25)
      doc.autoTable({
        html: '#table',
        includeHiddenHtml: true,
        didParseCell: data => {
          for (let i = 0; i < data.table.body.length; i++) {
            if (data.table.body[i].cells[1].text[0].includes('Proficiency:')) {
              data.table.body[i].cells[0].styles.fillColor = '#4f63aa'
              data.table.body[i].cells[0].styles.fontStyle = 'bold'
              data.table.body[i].cells[0].styles.fontSize = 20
              data.table.body[i].cells[1].styles.fillColor = '#4f63aa'
              data.table.body[i].cells[0].styles.textColor = '#FFFFFF'
              data.table.body[i].cells[1].styles.textColor = '#FFFFFF'
            }
          }
        },
      })
      var output = doc.output('datauristring')
      contactInformation.testDataPdf = output

      doc.save('test')
    }
  }, [showNow])

  const [anotherShowNow, setAnotherShowNow] = useState(false)
  const [showNow, setShowNow] = useState(false)
  const [lengths, setLengths] = useState([])
  const [profSum, setProfSum] = useState([])
  const [freqSum, setFreqSum] = useState([])
  const [profAverage, setProfAverage] = useState([])
  const [freqAverage, setFreqAverage] = useState([])
  const [overallFreqScore, setOverallFreqScore] = useState()
  const [overallProfScore, setOverallProfScore] = useState()
  return (
    <>
      {console.log(contactInformation.testDataPdf)}
      <section id="wrapEverything">
        <RenderHeader
          show={show}
          setTest={setTest}
          setShow={setShow}
          nurse2nursestaffingimage={nurse2nursestaffingimage}
        />
        <ul id="newTestData" className="newTestData">
          {newTestData.map((header, sectionIndex) => {
            return (
              <>
                <li className="newTestDataLi">
                  <CategoryHeader header={header.header} />
                  {newTestData[sectionIndex].questions.map(
                    (question, index) => {
                      return (
                        <AddRatings
                          pageData={pageData}
                          section={header.header}
                          question={question}
                          index={index}
                          key={index}
                          pageData={pageData}
                          updatePageData={updatePageData}
                        />
                      )
                    }
                  )}
                </li>
                {anotherShowNow && (
                  <HiddenTable
                    newTestData={newTestData}
                    freqAverage={freqAverage}
                    profAverage={profAverage}
                  />
                )}
                {console.log(freqAverage)}
                {console.log(freqAverage[sectionIndex])}
              </>
            )
          })}
        </ul>
        <FormSubmission
          sendEmail={sendEmail}
          clear={clear}
          save={save}
          sigCanvas={sigCanvas}
          handleChange={handleChange}
          contactInformation={contactInformation}
        />
      </section>
    </>
  )
}

export default TestPageData
