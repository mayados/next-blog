import React from 'react'

const Button:React.FC<any> = ({label}) => {
  return (
    <button className='px-5 py-2 mt-3 bg-cyan-900 hover:bg-cyan-800 cursor-pointer rounded-lg'>
        {/* On rend le texte du bouton variable */}
        {label}
    </button>
  )
}

export default Button