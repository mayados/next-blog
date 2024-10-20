"use client"
import Comment from '@/components/Comment'
import Tag from '@/components/Tag'
import React, { useEffect, useState } from 'react'

// On appel bien la route à partir de ce paramètre articleId
const ArticleDetailPage = ({params}: {params: {articleId: string}}) => {

    // Utilisation de hooks
    // On utilise le hook useState afin de donner une valeur par défaut
    // | null => représente qu'on peut éventuellement récupérer quelque chose de null
    // Par défaut on définit le useState sur un type null (dernier mot de la ligne)
    const [article, setArticle] = useState<ArticleWithTagsAndComments | null>(null)
    const [comments, setComments] = useState<CommentType[]>([]);


    useEffect(() => {
        const fetchArticle = async () => {
            // Ici on utilise les back quotes ``, et non les quotes normales, car on récupère quelque chose de dynamique
            const response = await fetch(`/api/article/${params.articleId}`)
            const data: ArticleWithTagsAndComments = await response.json()
            // On hydrate l'article avec les données récupérées
            setArticle(data)
            // Car on a un use state pour les commentaire, on gérera leur état à part
            setComments(data.comments); 

        }
        // On appelle la fonction
        fetchArticle()
        // Le useEffect va être redéclenché si l'articleId change
    }, [params.articleId])


    const deleteComment = async (commentId: string) => {
        try {
            const response = await fetch(`/api/comment/${commentId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                // Si l'appel à l'API fonctionne, on supprime le commentaire localement
                setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du commentaire :", error);
        }
      }

  return (
    <div>
        <h1 className='text-2xl font-bold'>{article?.title}</h1>
        <div className='my-5 flex flex-wrap gap-3'>
            {article?.tags.map((tagArticle: TagArticleType) => (
                <Tag key={tagArticle.tag.id} name={tagArticle.tag.name} />
            ))}
        </div>
        <p>{article?.text}</p>
        <section>
            <h2 className='my-3'>Commentaires ({comments.length})</h2>
            {comments.map((comment) => (

                <Comment key={comment.id} comment={comment} action={() => deleteComment(comment.id)}  />
            ))}
            
        </section>
    </div>
  )

}

export default ArticleDetailPage