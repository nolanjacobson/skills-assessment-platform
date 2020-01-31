import React, { useState, useEffect } from 'react'

const HiddenTable = props => {
  const freqScores = props.freqScores
  const profScores = props.profScores
  const pageData = props.pageData
  const [newArray, setNewArray] = useState([])

  useEffect(() => {
    setNewArray(
      props.newTestData
        .map(item => item.questions)
        .reduce((a, b) => a.concat(b), [])
    )
  }, [])
  return (
    <table id="table" style={{ display: 'none' }}>
      <tbody>
        <>
          <tr>
            <td>Employee Name: {props.nurseName}</td>
            <td>Test Name: {props.testName}</td>
            <td>Date Completed: {props.dateCompleted}</td>
          </tr>
          <tr>
            <td>Overall Competency Score: {props.overallCompetencyScore}</td>
            <td>Overall Proficiency Score: {props.overallProficiencyScore}</td>
            <td>Overall Frequency Score: {props.overallFrequencyScore}</td>
          </tr>
          <tr>
            <td>Legend</td>
          </tr>
          <tr>
            <td>Proficiency Rating Labels</td>
            <td>Frequency Rating Labels</td>
          </tr>
          <tr>
            <td>1 = Inexperienced - no experience</td>
            <td>1 = Never - observed only</td>
          </tr>
          <tr>
            <td>2 = Novice - need assistance</td>
            <td>2 = Sometimes - couple times a year</td>
          </tr>
          <tr>
            <td>3 = Proficient - perform independently</td>
            <td>3 = Often - couple times a month</td>
          </tr>
          <tr>
            <td>4 = Expert - serve as a resource</td>
            <td>4 = Frequent - daily or weekly</td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td></td>
          </tr>
        </>
        {props.newTestData.map((header, sectionIndex) => {
          return (
            <>
              <tr>
                <td style={{ color: 'blue', textAlign: 'center' }}>
                  {header.header}{' '}
                </td>
                <td>
                  Avg Proficiency:
                  {props.proficiencyAverage[sectionIndex]}
                </td>
                <td>
                  Avg Frequency:
                  {props.frequencyAverage[sectionIndex]}
                </td>
              </tr>
            </>
          )
        })}
        {newArray.map((question, index) => {
          return (
            <>
              <tr>
                <td>{question}</td>
                <td>{profScores[index]}</td>
                <td>{freqScores[index]}</td>
              </tr>
            </>
          )
        })}

        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            I certify this test was filled out to the best of my knowledge.
          </td>
        </tr>
        <tr>
          <td>Signed by: {props.nurseName}</td>
        </tr>
        <tr>
          <td>{props.dateCompleted}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default HiddenTable
