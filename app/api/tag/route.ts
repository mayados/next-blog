// Le but de ce fichier est de récupérer facilement les articles. Soit pour en faire une api, soit de les récupérer d'une autre façon
// try et catch vont permettre, s'il y a une erreur, d'obtenir un debug plus intéressant

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

    try{
        const tags = await db.tag.findMany({
            orderBy: {
            name: 'asc'
            }
        })

        // On retourne une réponse au format json avec la liste des articles
        return NextResponse.json(tags)

    } catch (error) {
        // Comme on exécute le console.log sur le serveur, on ne le retrouvera pas dans la console du navigateur, mais dans le terminall où on exécute le projet.
        // Nous sommes côté serveur : SSR
        console.log("[TAGS]", error)

        return new NextResponse("Internal error, {status: 500}")
    }

}