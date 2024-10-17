import React from 'react'
import { formatDate } from '@/lib/utils'
import Button from './Button'

// Nous disons que nous faisons passer des propriétés en paramètres du composant, et qu'elle peut etre de tout type (car ce n'est qu'un test)
// entre accolades : le nom de la propriété (ici l'objet) que l'on souhaite faire passer
const ArticleCard:React.FC<any> = ({ article }) => {
  return (
    <div className='group border border-slate-700 p-6 rounded-md hover:bg-gray-600 cursor-pointer hover:-translate-y-2 duration-500' key="{article.id}">
        {/* Titre de l'article, nous l'appelons en fonction donné au champ en base de données */}
        <h2 className='text-xl font-bold'>{article.title}</h2>
        {/* Date et heure */}
        <p className='text-sm text-slate-300'>{formatDate(article.createdAt)}</p>
        {/* Liste des tags d'un article */}
        <div className='flex flex-wrap gap-2 my-4'>
        {
            article.tags.map((tagArticle: any) => (
            <span 
                className='px-3 py-2 text-xs rounded-full bg-neutral-500 group-hover:bg-red-400'
                key={tagArticle.tag.id}
            >
                {tagArticle.tag.name}
            </span>
            ))}                  
        </div>

        {/* Texte de l'article */}
        {/* Avec line-clamp sur tailwind (et en css classique) on peut limiter le texte sur le nombre de lignes que l'on souhaite */}
        <p className='line-clamp-4'>{article.text}</p>

        <Button label="Lire plus..." />              

    </div>
  )
}

export default ArticleCard