// Pour les types qui vont exister à plusieurs endroits, il est meilleur de les centraliser dans un fichier

interface TagType{
    id: string;
    name: string;
}

interface TagArticleType{
    id: string;
    // Ici c'est du chaînage : on réfère le type TagType comme type de la propriété tag de cette interface
    tag: TagType;
}

interface CommentType{
    id: string;
    text: string;
    userId: string;
    createdAt: Date;
}

interface ArticleWithTagsAndComments{
    id: string;
    title: string;
    text: string;
    slug: string;
    createdAt: Date;
    // Ici on iindique bien que c'est un tableau, car c'est un ensemble de tags
    tags: TagArticleType[];
    comments: CommentType[];
}

interface CommentType{
    id: string;
    text: string;
    articleId: string;
    article: ArticleWithTagsAndComments;
    userId: string;
    createdAt: Date;
}

