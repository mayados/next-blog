import React from 'react'

interface ButtonProps {
  label:string;
}

const Button:React.FC<ButtonProps> = ({label}) => {
  return (
    <button className='px-5 py-2 mt-3 bg-cyan-900 hover:bg-cyan-800 cursor-pointer rounded-lg'>
        {/* On rend le texte du bouton variable */}
        {label}
    </button>
  )
}

export default Button