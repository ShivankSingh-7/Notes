import React from 'react'

function PrimaryButton({onClick, text}) {
  return (
    <div>
      <button 
      onClick={onClick}
      className='border-2 px-2 font-bold cursor-pointer bg-cyan-600 text-white hover:bg-cyan-700 py-1'>{text}</button>
    </div>
  )
}

export default PrimaryButton
