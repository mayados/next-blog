// Le but de ce fichier est de récupérer facilement les articles. Soit pour en faire une api, soit de les récupérer d'une autre façon
// try et catch vont permettre, s'il y a une erreur, d'obtenir un debug plus intéressant

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

    try{
        // Ici on appel le nom du model (car on passe par l'ORM)
        // En NoSQL, le findAll est findMany
        // Ici on a apporté  le db que l'on a déclaré en global dans notre dossier lib (db.ts) grâce à ctrl + espace
        //  L'accolade dans le findMany permet d'insérer des arguments (pour trier etc...)
        const articles = await db.article.findMany({
            orderBy: {
            createdAt: 'desc'
            },
            // Pour les jointures avec Prisma, on utilise le paramètre iclude
            // On include les tags car le model Article possède des tags et on récupère l'objet tag en lui même
            include: {
            tags: {
                include: {
                tag: true
                }
            }
            }
        })

        // On retourne une réponse au format json avec la liste des articles
        return NextResponse.json(articles)

    } catch (error) {
        // Comme on exécute le console.log sur le serveur, on ne le retrouvera pas dans la console du navigateur, mais dans le terminall où on exécute le projet.
        // Nous sommes côté serveur : SSR
        console.log("[ARTICLES]", error)

        return new NextResponse("Internal error, {status: 500}")
    }

}