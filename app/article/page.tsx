import { db } from '@/lib/db'
import React from 'react'

// En programmation JS côté serveur, nous travaillons en asynchrone
const ArticlePage = async () => {

  //Récupérer la liste des articles
  // Ici on appel le nom du model (car on passe par l'ORM)
  // En NoSQL, le findAll est findMany
  // Ici on a apporté  le db que l'on a déclaré en global dans notre dossier lib (db.ts) grâce à ctrl + espace
  //  L'accolade dans le findMany permet d'insérer des arguments (pour trier etc...)
  const articles = await db.article.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div>
        <h1>Blog</h1>
        {/* Liste des articles */}
        {
          // Liste des articles
          // Faire une boucle en react dans un composant
          // Chaque parent de l'élément de la bouce doit être identifié par une clé (key), car ici chaque article doit être unique
          articles.map((article: any) => (
            <div className='mb-6' key="{article.id}">
              {/* Titre de l'article, nous l'appelons en fonction donné au champ en base de données */}
              <h2 className='text-emerald-700'>{article.title}</h2>
              {/* Texte de l'article */}
              <p>{article.text}</p>
            </div>
          ))}
    </div>
  )
}

export default ArticlePage