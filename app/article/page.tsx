// On transforme notre page en composant client et non plus serveur. Il faut faire ainsi car nous importons un composant qui a besoin de useEffect, il faut donc que l'un de ses parents soit marqué avec "use client"
"use client"
import ArticleCard from '@/components/ArticleCard'
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
        <h1 className='mb-3'>Blog</h1>
        {/* Tailwind est mobile first, donc nous commençons d'abord par noter ce que nous souhaitons pour le mobile */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {/* Liste des articles */}
          {
            // Liste des articles
            // Faire une boucle en react dans un composant
            // Chaque parent de l'élément de la boucle doit être identifié par une clé (key), car ici chaque article doit être unique
            //  any est juste mis à des fins de test pour le moment. C'est une mauvaise pratique de typer les éléments aisni
            articles.map((article: any) => (
              <>
                {/* // On renvoie le composant ArticleCard
                // Le premier article est le nom de la propriété générique dans le composant
                // Le deuxième article est le nom de la variable que l'on souhaite faire passer */}
                <ArticleCard article={article} />
              </>

            ))}          
        </div>
    </>
  )
}

export default ArticlePage