import React from 'react'
import {Triangle} from 'react-loader-spinner'

const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <Triangle type="ThreeDots" color="#2BAD60" height="50" width="200" />
      <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner
