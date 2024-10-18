"use client"

import Tag from '@/components/Tag'
import React, { useEffect, useState } from 'react'

// On appel bien la route à partir de ce paramètre articleId
const ArticleDetailPage = ({params}: {params: {articleId: string}}) => {

    // Utilisation de hooks
    // On utilise le hook useState afin de donner une valeur par défaut
    // | null => représente qu'on peut éventuellement récupérer quelque chose de null
    // Par défaut on définit le useState sur un type null (dernier mot de la ligne)
    const [article, setArticle] = useState<ArticleWithTagsAndComments | null>(null)

    useEffect(() => {
        const fetchArticle = async () => {
            // Ici on utilise les back quotes ``, et non les quotes normales, car on récupère quelque chose de dynamique
            const response = await fetch(`/api/article/${params.articleId}`)
            const data: ArticleWithTagsAndComments = await response.json()
            // On hydrate l'article avec les données récupérées
            setArticle(data)
        }
        // On appelle la fonction
        fetchArticle()
        // Le useEffect va être redéclenché si l'articleId change
    }, [params.articleId])

  return (
    <div>
        <h1 className='text-2xl font-bold'>{article?.title}</h1>
        <div className='my-5 flex flex-wrap gap-3'>
            {article?.tags.map((tagArticle: TagArticleType) => (
                <Tag key={tagArticle.tag.id} name={tagArticle.tag.name} />
            ))}
        </div>
        <p>{article?.text}</p>
    </div>
  )
}

export default ArticleDetailPage