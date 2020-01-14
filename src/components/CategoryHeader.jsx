import React from 'react'

const CategoryHeader = props => {
  return (
    <>
      <h1 className="newCategory">{props.header}</h1>
      <section className="flexThem">
        <div className="headerProficiency">
          {props.checkBox ? (
            <>
              Proficiency Rating {props.profRating} Frequency Rating{' '}
              {props.freqRating}
            </>
          ) : (
            <>Proficiency Rating Frequency Rating</>
          )}
        </div>
      </section>
      <hr></hr>
    </>
  )
}

export default CategoryHeader
