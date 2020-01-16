import React from 'react'

const HiddenTable = props => {
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
          </tr>
          <tr>
            <td>1 = Inexperienced - no experience</td>
          </tr>
          <tr>
            <td>2 = Novice - need assistance</td>
          </tr>
          <tr>
            <td>3 = Proficient - perform independently</td>
          </tr>
          <tr>
            <td>4 = Expert - serve as a resource</td>
          </tr>
          <tr>
            <td>Frequency Rating Labels</td>
          </tr>
          <tr>
            <td>1 = Never - observed only</td>
          </tr>
          <tr>
            <td>2 = Sometimes - couple times a year</td>
          </tr>
          <tr>
            <td>3 = Often - couple times a month</td>
          </tr>
          <tr>
            <td>4 = Frequent - daily or weekly</td>
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

              {props.newTestData[sectionIndex].questions.map(
                (question, index) => {
                  return (
                    <>
                      <tr>
                        <td>{question}</td>
                        <td>{props.profScores[index]}</td>
                        <td>{props.freqScores[index]}</td>
                      </tr>
                    </>
                  )
                }
              )}
            </>
          )
        })}
        <tr>
          <td>Date Completed: {props.dateCompleted}</td>
        </tr>
        <tr>
          <td>Employee Name: {props.nurseName}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default HiddenTable
