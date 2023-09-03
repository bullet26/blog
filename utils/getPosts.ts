import { useQuery } from '@tanstack/react-query';
import supabase from '../app/supabase';

const getPostsAll = async () => {
    const { data, error } = await supabase.from('Post').select();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const useGetPostsAll = () => {
    return useQuery({
        queryFn: getPostsAll,
        queryKey: ['posts'],
    });
};

const getPostsByAuthor = async (id: string) => {
    const { data, error } = await supabase.from('Post').select().eq('author_id', id);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const useGetPostsByAuthor = (id: string) => {
    return useQuery({
        queryFn: () => getPostsByAuthor(id),
        queryKey: ['posts'],
    });
};
