// Fonction pour le formattage de la date 
// Le dépendance est à installer "date-fns" avec npm
import { format } from "date-fns";

// On formatte la date reçue en commentaire, et s'il n'y a rien ou autre on affiche un message
export function formatDate(date: Date): string{
    return format(new Date(date), "MMMM do, yyyy HH:mm") ?? "Date not available";
}