import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";


// Asynchrone : il attend une promesse
export async function DELETE(req: NextRequest, {params}: {params: {commentId: string}})
{
    const { commentId } = params;

    try{

        // Récupérer le commentaire à supprimer
        const comment = await db.comment.delete({
            where: {
                id: commentId
            }
        })


        // revalidatePath("/article");
        return new NextResponse(JSON.stringify({ success: true, message: 'Commentaire supprimé avec succès' }), {
            status: 200,
        });

    } catch (error) {
        // Comme on exécute le console.log sur le serveur, on ne le retrouvera pas dans la console du navigateur, mais dans le terminall où on exécute le projet.
        // Nous sommes côté serveur : SSR
        console.log("[COMMENT]", error)

        return new NextResponse("Internal error, {status: 500}")
    }


}