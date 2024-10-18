import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Endpoint en GET qui admet un paramètre dynamique nommé articleId
// Asynchrone : il attend une promesse
export async function GET(req: NextRequest, {params}: {params: {articleId: string}})
{
    // Du params, on stocke l'articleId
    // La notation équivalente de cette ligne serait : const articleId = params.articleId; Mais est plus complexe au niveau de la notation
    const { articleId } = params;

    try{

        // Récupérer un article spécifique
        // db.article fait bien référence au model article de prisma
        // Await car il attend de récupérer les éléments pour travailler avec 
        const article = await db.article.findUnique({
            where: {
                id: articleId
            },
            // Si on récupère uniquement tags: true ca récupère uniquement l'id, articleId et tagId. C'est pour cela qu'en plus il faut effectuer un include de tag
            include: {
                tags: {
                    include: {
                        tag: true
                    }
                },
                // Ici il n'y a pas d'imbrication à faire car dans article j'ai directement accès
                comments: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
            
        })

        // On return l'article trouvé
        return NextResponse.json(article)

    } catch (error) {
        // Comme on exécute le console.log sur le serveur, on ne le retrouvera pas dans la console du navigateur, mais dans le terminall où on exécute le projet.
        // Nous sommes côté serveur : SSR
        console.log("[ARTICLE]", error)

        return new NextResponse("Internal error, {status: 500}")
    }


}