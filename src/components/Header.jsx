import React from 'react'
import Ratings from 'react-rating'

const Header = props => {
  const proficiencyRatingsList = [
    'Proficiency Rating Labels',
    'Inexperienced - no experience',
    'Novice - need assistance',
    'Proficient - perform independently',
    'Expert - serve as a resource',
  ]
  const frequencyRatingsList = [
    'Frequency Rating Labels',
    'Never - observed only',
    'Sometimes - couple times a year',
    'Often - couple times a month',
    'Frequent - daily or weekly',
  ]
  const plusButton = '+ Rating Scale'
  const minusButton = '- Rating Scale'
  return (
    <section data-html2canvas-ignore>
      <img
        className="testPageLogo"
        src={props.nurse2nursestaffingimage}
        alt="Nurse 2 Nurse Staffing Image"
      />
      <nav className="standardBox">
        <p className="skillsAssessmentTest">
          Skills Assessment Test: {props.setTest}
        </p>
        <button
          className="ratingScale"
          onClick={() =>
            !props.show ? props.setShow(true) : props.setShow(false)
          }
        >
          {!props.show ? plusButton : minusButton}
        </button>
        {props.show ? (
          <ul className="ratingsUl">
            <li className="proficiencyRatingsLi">
              {proficiencyRatingsList.map((rating, index) => {
                {
                  if (index > 0) {
                    return (
                      <p className="ratingP">
                        <Ratings
                          className="ratingP"
                          start={0}
                          stop={index}
                          initialRating={index}
                          readonly={true}
                          emptySymbol="far fa-plus-square"
                          fullSymbol="fas fa-plus-square"
                        />{' '}
                        {rating}
                      </p>
                    )
                  } else {
                    return <h4>{rating}</h4>
                  }
                }
              })}
            </li>
            <li className="frequencyRatingsLi">
              {frequencyRatingsList.map((rating, index) => {
                {
                  if (index > 0) {
                    return (
                      <p className="ratingP">
                        <Ratings
                          start={0}
                          stop={index}
                          readonly={true}
                          initialRating={index}
                          emptySymbol="far fa-plus-square"
                          fullSymbol="fas fa-plus-square"
                        />{' '}
                        {rating}
                      </p>
                    )
                  } else {
                    return <h4>{rating}</h4>
                  }
                }
              })}
            </li>
          </ul>
        ) : (
          <></>
        )}
      </nav>
    </section>
  )
}

export default Header
