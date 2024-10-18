import React from 'react'

// Nom de l'interface => NomComposant + Props (conseillé)
// Ensemble de règles
interface TagProps {
    // J'impose ici que la propriété name soit une chaîne de caractères
    name: string;
}

// On impose que le Tag implémente l'interface (= l'ensemble de règles) TagProps
const Tag:React.FC<TagProps> = ({name}) => {
  return (
    <span 
        className='px-3 py-2 text-xs rounded-full bg-neutral-500 group-hover:bg-blue-400'
    >
        {name}
    </span>
  )
}

export default Tag