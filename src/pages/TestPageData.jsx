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
import { Redirect } from 'react-router-dom'
import base64_source from '../utils/image.constants'
import { Spinner } from 'react-bootstrap'
const TestPageData = props => {
  const [isAuthorized, setIsAuthorized] = useState(true)
  const [show, setShow] = useState(false)
  const [spinnerVal, setSpinnerVal] = useState(false)
  const setCategory = props.match.params.category
  const setTest = decodeURIComponent(props.match.params.test)
  const newTestData = TestData.tests
    .filter(category => category.category === setCategory)
    .filter(test => test.testname === setTest)[0].sections
  const [checkBox, setCheckBox] = useState(0)
  const [contactInformation, setContactInformation] = useState({
    firstName: '',
    lastName: '',
    nurseEmail: '',
    phoneNumber: '',
    recruiterEmail: 'jeremy@nurse2nursestaffing.com',
    skillsTestName: setTest,
    testDataPdf: '',
  })
  const [signatureCanvas, setSignatureCanvas] = useState('val')
  const [showNow, setShowNow] = useState(false)
  const [lengths, setLengths] = useState([])
  const [profSum, setProfSum] = useState([])
  const [freqSum, setFreqSum] = useState([])
  const [freqScores, setFreqScores] = useState([])
  const [profScores, setProfScores] = useState([])
  const [profAverage, setProfAverage] = useState([])
  const [freqAverage, setFreqAverage] = useState([])
  const [recruiters, setRecruiters] = useState([])
  const [overallFreqScore, setOverallFreqScore] = useState(0)
  const [overallProfScore, setOverallProfScore] = useState(0)
  const [eventListener, setEventListener] = useState(0)
  const [success, setSuccess] = useState(false)
  const [pageData, setPageData] = useState({})
  const sigCanvas = useRef(null)
  const clear = () => {
    sigCanvas.current.clear()
  }

  useEffect(() => {
    if (!localStorage.getItem('isAuthorized')) {
      setIsAuthorized(false)
    }
  }, [])
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

  const handleChange = e => {
    e.persist()
    setContactInformation(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const generatePdf = () => {
    var doc = new jsPDF()
    doc.setFontSize(40)
    var header = function(data) {
      doc.setTextColor(40)
      doc.setFontStyle('normal')
      doc.addImage(base64_source, 'JPEG', data.settings.margin.left, 20, 80, 20)
    }

    doc.autoTable({
      html: '#table',
      includeHiddenHtml: true,
      margin: { top: 50, bottom: 40 },
      didDrawPage: header,
      didParseCell: data => {
        for (let i = 0; i < data.table.body.length; i++) {
          if (data.table.body[i].cells[1].text[0].includes('Proficiency:')) {
            data.table.body[i].cells[0].styles.fillColor = '#4f63aa'
            data.table.body[i].cells[0].styles.fontStyle = 'bold'
            data.table.body[i].cells[0].styles.fontSize = 20
            data.table.body[i].cells[1].styles.fillColor = '#4f63aa'
            data.table.body[i].cells[2].styles.fillColor = '#4f63aa'
            data.table.body[i].cells[0].styles.textColor = '#FFFFFF'
            data.table.body[i].cells[1].styles.textColor = '#FFFFFF'
            data.table.body[i].cells[2].styles.textColor = '#FFFFFF'
          } else if (data.table.body[0]) {
            data.table.body[0].cells[0].styles.fillColor = '#FFFFFF'
            data.table.body[0].cells[1].styles.fillColor = '#FFFFFF'
            data.table.body[0].cells[2].styles.fillColor = '#FFFFFF'
            data.table.body[0].cells[0].styles.fontSize = 10
            data.table.body[0].cells[1].styles.fontSize = 10
            data.table.body[0].cells[2].styles.fontSize = 10
            data.table.body[0].cells[0].styles.textColor = '#000000'
            data.table.body[0].cells[1].styles.textColor = '#000000'
            data.table.body[0].cells[2].styles.textColor = '#000000'
            data.table.body[1].cells[1].styles.cellWidth = 'wrap'
            data.table.body[1].cells[2].styles.cellWidth = 'wrap'
          }
        }

        data.table.body[1].cells[0].styles.fillColor = '#FFFFFF'
        data.table.body[1].cells[1].styles.fillColor = '#FFFFFF'
        data.table.body[1].cells[1].styles.cellWidth = 'wrap'
        data.table.body[1].cells[2].styles.cellWidth = 'wrap'

        data.table.body[1].cells[2].styles.fillColor = '#FFFFFF'
        data.table.body[data.table.body.length - 1].cells[0].styles.fillColor =
          '#FFFFFF'
        // data.table.body[data.table.body.length - 1].cells[0].styles.fontStyle =
        //   'bold'
        data.table.body[
          data.table.body.length - 1
        ].cells[0].styles.fontSize = 10
        data.table.body[
          data.table.body.length - 2
        ].cells[0].styles.fontSize = 10

        data.table.body[data.table.body.length - 3].cells[0].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 3].cells[1].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 3].cells[2].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 5].cells[0].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 5].cells[1].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 5].cells[2].styles.fillColor =
          '#FFFFFF'

        data.table.body[data.table.body.length - 7].cells[0].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 7].cells[1].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 7].cells[2].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 9].cells[0].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 9].cells[1].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 9].cells[2].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 11].cells[0].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 11].cells[1].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 11].cells[2].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 13].cells[0].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 13].cells[1].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 13].cells[2].styles.fillColor =
          '#FFFFFF'

        data.table.body[data.table.body.length - 2].cells[0].styles.fontStyle =
          'bold'
        data.table.body[data.table.body.length - 1].cells[1].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 1].cells[2].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 2].cells[0].styles.fillColor =
          '#FFFFFF'

        data.table.body[data.table.body.length - 2].cells[1].styles.fillColor =
          '#FFFFFF'
        data.table.body[data.table.body.length - 2].cells[2].styles.fillColor =
          '#FFFFFF'

        data.table.body[1].cells[0].styles.fontSize = 10
        data.table.body[1].cells[1].styles.fontSize = 10
        data.table.body[1].cells[2].styles.fontSize = 10
        data.table.body[1].cells[0].styles.textColor = '#000000'
        data.table.body[1].cells[1].styles.textColor = '#000000'
        data.table.body[1].cells[2].styles.textColor = '#000000'
        data.table.body[2].cells[0].styles.fontSize = 12
        data.table.body[2].cells[0].styles.textColor = '#505050'
        data.table.body[2].cells[0].styles.fontStyle = 'bold'

        data.table.body[3].cells[0].styles.fillColor = '#F5F5F5'
        data.table.body[3].cells[1].styles.fillColor = '#F5F5F5'
        data.table.body[3].cells[2].styles.fillColor = '#F5F5F5'
        data.table.body[3].cells[0].styles.textColor = '#000000'
        data.table.body[3].cells[1].styles.textColor = '#000000'

        data.table.body[3].cells[0].styles.fontStyle = 'bold'
        data.table.body[3].cells[1].styles.fontStyle = 'bold'
        data.table.body[3].cells[0].styles.fontSize = 12
        data.table.body[3].cells[1].styles.fontSize = 12
        data.table.body[5].cells[0].styles.fillColor = '#F5F5F5'
        data.table.body[5].cells[1].styles.fillColor = '#F5F5F5'
        data.table.body[5].cells[2].styles.fillColor = '#F5F5F5'
        data.table.body[7].cells[0].styles.fillColor = '#F5F5F5'
        data.table.body[7].cells[1].styles.fillColor = '#F5F5F5'
        data.table.body[7].cells[2].styles.fillColor = '#F5F5F5'
      },
    })
    doc.addImage(
      signatureCanvas,
      'JPEG',
      30,
      doc.autoTable.previous.finalY,
      30,
      30
    )
    var output = doc.output('datauristring')
    contactInformation.testDataPdf = output
  }

  const save = () => {
    setEventListener(eventListener + 1)
    const sig = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png')
    setSignatureCanvas(sig)
  }

  const setSpinner = e => {
    e.preventDefault()
    setSpinnerVal(true)
  }

  const sendEmail = async () => {
    generatePdf()
    const response = await axios.post(
      'https://new-nurse-2-nurse-api.herokuapp.com/api/NurseInformation',
      contactInformation
    )
    if (response.status === 200) {
      setSuccess(true)
    }
  }

  useEffect(() => {
    if (spinnerVal) {
      sendEmail()
    }
  })

  useEffect(() => {
    const getRecruiters = async () => {
      const response = await axios.get(
        'https://new-nurse-2-nurse-api.herokuapp.com/AllRecruiters'
      )

      if (response.status === 200) {
        setRecruiters(response.data)
      }
    }
    getRecruiters()
  }, [])
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
        newTestData[sectionIndex].questions.map(rating => {
          setFreqScores(previous => {
            return [
              ...previous,
              Object.values(pageData[header.header][rating])[0],
            ]
          })
          setProfScores(previous => {
            return [
              ...previous,
              Object.values(pageData[header.header][rating])[1],
            ]
          })
        })
        setCheckBox(checkBox + 1)
      })
    }
  }, [eventListener])

  useEffect(() => {
    if (checkBox) {
      profSum.map((prof, index) => {
        setProfAverage(previous => {
          return [
            ...previous,
            (Math.round((prof / lengths[index]) * 4) / 4).toFixed(2),
          ]
        })
      })

      freqSum.map((freq, index) => {
        setFreqAverage(previous => {
          return [
            ...previous,
            (Math.round((freq / lengths[index]) * 4) / 4).toFixed(2),
          ]
        })
      })
    }
    if (freqSum.length > 0) {
      const add = (a, b) => a + b

      const freqTotal = freqSum.reduce(add)
      const profTotal = profSum.reduce(add)
      const questionLength = lengths.reduce(add)
      setOverallFreqScore(freqTotal / questionLength)
      setOverallProfScore(profTotal / questionLength)
    }

    if (!showNow) {
      setShowNow(true)
    } else {
      setShowNow(false)
    }
  }, [checkBox])

  return (
    <>
      {success &&
        window.parent.location.replace('https://www.nurse2nursestaffing.com/')}
      {isAuthorized ? (
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
                            spinnerVal={spinnerVal}
                            setSpinnerVal={setSpinnerVal}
                          />
                        )
                      }
                    )}
                  </li>
                </>
              )
            })}
          </ul>
          <FormSubmission
            setSpinner={setSpinner}
            spinnerVal={spinnerVal}
            clear={clear}
            save={save}
            sigCanvas={sigCanvas}
            handleChange={handleChange}
            contactInformation={contactInformation}
            signatureCanvas={signatureCanvas}
            recruiters={recruiters}
          />
          <HiddenTable
            newTestData={newTestData}
            frequencyAverage={freqAverage}
            proficiencyAverage={profAverage}
            overallCompetencyScore={(
              (Math.round((overallProfScore * 4) / 4) +
                Math.round((overallFreqScore * 4) / 4)) /
              2
            ).toFixed(2)}
            overallFrequencyScore={(
              Math.round(overallFreqScore * 4) / 4
            ).toFixed(2)}
            overallProficiencyScore={(
              Math.round(overallProfScore * 4) / 4
            ).toFixed(2)}
            freqScores={freqScores}
            profScores={profScores}
            testName={setTest}
            nurseName={`${contactInformation.firstName} ${contactInformation.lastName}`}
            dateCompleted={new Date()
              .toLocaleString()
              .replace(',', '')
              .replace(/:.. /, ' ')}
            pageData={pageData}
            signature={contactInformation.signatureCanvas}
          />
        </section>
      ) : (
        <Redirect to="/" />
      )}
    </>
  )
}

export default TestPageData
