import React from 'react'
import nurse2nursestaffingimage from './images/nurse2nurse.png'

const Success = () => {
  return (
    <>
      <a href="https://www.nurse2nursestaffing.com/">
        <img className="testPageLogo" src={nurse2nursestaffingimage} />
      </a>
      <h1 className="success">
        Your skills assessment test has been successfully submitted.{' '}
      </h1>
    </>
  )
}

export default Success
