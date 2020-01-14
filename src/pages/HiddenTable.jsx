import React from 'react'

const HiddenTable = props => {
  return (
    <table id="table" style={{ display: 'none' }}>
      <tbody>
        {props.newTestData.map((header, sectionIndex) => {
          return (
            <>
              <tr>
                <td style={{ color: 'blue', textAlign: 'center' }}>
                  {header.header}{' '}
                </td>
                <td>
                  Proficiency:
                  {props.profAverage.map(prof => {
                    console.log(prof)
                  })}
                  Frequency:
                  {props.freqAverage.map(freq => {
                    return console.log(freq)
                  })}
                </td>
              </tr>

              {props.newTestData[sectionIndex].questions.map(
                (question, index) => {
                  return (
                    <>
                      <tr>
                        <td>{question}</td>
                        {/* <td>
                      {eventListener &&
                        Object.values(pageData[header.header].freq)[index]}
                    </td> */}
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
