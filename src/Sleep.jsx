import React from 'react'

const Sleep = ({ isSleep }) => {
  return (
    <div className={isSleep ? '' : "hidden"}>
      <h1>
        You will be redirected to Main page in about ~10 seconds
      </h1>
    </div>
  )
}

export default Sleep