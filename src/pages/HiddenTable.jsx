import React from 'react'

const HiddenTable = props => {
  return (
    <table id="table" style={{ display: 'none' }}>
      <tbody>
        <>
          <tr>
            <td>
              <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gKgSUNDX1BST0ZJTEUAAQEAAAKQbGNtcwQwAABtbnRyUkdCIFhZWiAH3QAIAA4AFgAoAB1hY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAADhjcHJ0AAABQAAAAE53dHB0AAABkAAAABRjaGFkAAABpAAAACxyWFlaAAAB0AAAABRiWFlaAAAB5AAAABRnWFlaAAAB+AAAABRyVFJDAAACDAAAACBnVFJDAAACLAAAACBiVFJDAAACTAAAACBjaHJtAAACbAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABwAAAAcAHMAUgBHAEIAIABiAHUAaQBsAHQALQBpAG4AAG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAMgAAABwATgBvACAAYwBvAHAAeQByAGkAZwBoAHQALAAgAHUAcwBlACAAZgByAGUAZQBsAHkAAAAAWFlaIAAAAAAAAPbWAAEAAAAA0y1zZjMyAAAAAAABDEoAAAXj///zKgAAB5sAAP2H///7ov///aMAAAPYAADAlFhZWiAAAAAAAABvlAAAOO4AAAOQWFlaIAAAAAAAACSdAAAPgwAAtr5YWVogAAAAAAAAYqUAALeQAAAY3nBhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR7AABMzQAAmZoAACZmAAAPXP/bAEMABQMEBAQDBQQEBAUFBQYHDAgHBwcHDwsLCQwRDxISEQ8RERMWHBcTFBoVEREYIRgaHR0fHx8TFyIkIh4kHB4fHv/bAEMBBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIABgAGAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAABwYI/8QAJxAAAQMEAQMDBQAAAAAAAAAAAQIDBAAFBhEhEiIxBxNBFjJRYXH/xAAZAQACAwEAAAAAAAAAAAAAAAAAAwEEBQb/xAAjEQABAwMDBQEAAAAAAAAAAAABAAIDBAUREjHBITJBUWHR/9oADAMBAAIRAxEAPwDbTM5x+0YE5lYlx7hEZ6W1JhyEOkvK8NbBICufn4BNS+7et31DZJlonW6Lbo01Pt+83KJcbTvfIOgeBo615qNYplFvhTDCessNmySnEiWw2pXU5pCkpWVkk7T1E8Ac7/NVbJIuGW7DlS4NsTCQ5BLSAqO2tEpSk9ijvvQrz3A62N6oqbjI7DCN1bp7fGdUgcOiy8eEJLYmwVbbcOkFKu0jyRz92tUpiubWGBbXrbd8MiSYpTpo2+c7HU0oAd/QSpClk8lSgfNKNZyoGMbKRpRw4jWlAbT+q6Q9EfTy85RhMJN7aadQ06JVvZkOnpcaI0UqPI6SeQn+71ulKWWhz2tPn8KZTjuPocrO5xYo87KH3I9si2dMhKBHaRFUlKhyknpA7TxsnQApSlZVRVyQENaustVvpauMulYMj6Rzhf/Z" />
            </td>
          </tr>
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
      </tbody>
    </table>
  )
}

export default HiddenTable
