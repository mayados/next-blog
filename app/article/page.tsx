// On transforme notre page en composant client et non plus serveur. Il faut faire ainsi car nous importons un composant qui a besoin de useEffect, il faut donc que l'un de ses parents soit marqué avec "use client"
"use client"
import { formatDate } from '@/lib/utils'
import React, { useEffect, useState } from 'react'

const ArticlePage = () =>  {
  //VERSION 1 : La liste des articles provient de la requête située dans app/api/article/route.ts, car nous l'appelons sous forme d'api

  // VERSION 2 : HOOKS
  // Un setter avec un use state : est fait pour faire varier la valeur d'un élément
  // Ici, le use effect est utilisé uniquement dans le cadre de la consommation d'api
  // Toujours appeler le setter avec set+ le même nom que la constante elle-même
  //  Ici par défaut, la collection est un tableau vide
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/api/article')
      const data = await response.json()
      // J'hydrate mon objet article avec les datas récupérés
      setArticles(data)
    }

    fetchArticles()
  })



  return (
    // Mettre une div qui n'aura pas de style (par exemple de className) est une mauvaise pratique, c'est pour cela qu'on utilise les fragments <></> à la place. 
    <>
        <h1>Blog</h1>
        {/* Liste des articles */}
        {
          // Liste des articles
          // Faire une boucle en react dans un composant
          // Chaque parent de l'élément de la boucle doit être identifié par une clé (key), car ici chaque article doit être unique
          //  any est juste mis à des fins de test pour le moment. C'est une mauvaise pratique de typer les éléments aisni
          articles.map((article: any) => (
            <div className='mb-6' key="{article.id}">
              {/* Titre de l'article, nous l'appelons en fonction donné au champ en base de données */}
              <h2 className='text-emerald-700'>{article.title}</h2>
              {/* Date et heure */}
              <p>{formatDate(article.createdAt)}</p>
              {/* Liste des tags d'un article */}
              {
                article.tags.map((tagArticle: any) => (
                  <span key={tagArticle.tag.id}>
                    {tagArticle.tag.name}
                  </span>
                ))}
              {/* Texte de l'article */}
              <p>{article.text}</p>
            </div>
          ))}
    </>
  )
}

export default ArticlePage