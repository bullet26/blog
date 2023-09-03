import supabase from '../app/supabase';

interface IComent {
    content: string;
    title: string;
    post_id: string;
    author_id: string;
}

export const creteComent = async (comment: IComent) => {
    const { data, error } = await supabase.from('Coment').insert({
        content: comment.content,
        title: comment.title,
        author_id: comment.author_id,
        post_id: comment.post_id,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
