import { useQuery } from '@tanstack/react-query';
import supabase from '../app/supabase';

const getCommentsAllByAuthor = async (id: string) => {
    const { data: post, error } = await supabase.from('Post').select().eq('author_id', id);
    const postIds: string[] = [];
    if (error) {
        throw new Error(error.message);
    }

    post?.map(({ id }) => postIds.push(id));
    const { data: comments, error: commentsError } = await supabase.from('Coment').select().in('post_id', postIds);

    if (commentsError) {
        throw new Error(commentsError.message);
    }

    return comments.map(item => ({ ...item, postTitle: post.find(subitem => subitem.id === item.post_id).title }));
};

export const useGetCommentsAll = (id: string) => {
    return useQuery({
        queryFn: () => getCommentsAllByAuthor(id),
        queryKey: ['comments'],
    });
};
