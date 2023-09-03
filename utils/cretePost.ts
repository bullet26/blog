import supabase from '../app/supabase';

interface IPost {
    content: string;
    title: string;
    author_id: string;
}

export const cretePost = async (post: IPost) => {
    const { data, error } = await supabase.from('Post').insert({
        content: post.content,
        title: post.title,
        author_id: post.author_id,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
