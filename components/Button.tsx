import React from 'react'
// On importe le type LucideIcon pour pouvoir faire passer l'icone voulue
import {LucideIcon} from 'lucide-react'


interface ButtonProps {
  label:string;
  icon: LucideIcon;
  actionButton?: () => void;
}

const Button:React.FC<ButtonProps> = ({label, icon: Icon, actionButton}) => {
  return (
    <button className='flex f px-5 py-2 mt-3 bg-cyan-900 hover:bg-cyan-800 cursor-pointer rounded-lg' onClick={actionButton}>
        {/* On rend le texte du bouton variable */}
        {label} 
        <Icon className="mx-2" />
    </button>
  )
}

export default Button