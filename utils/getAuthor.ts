import { useQuery } from '@tanstack/react-query';
import supabase from '../app/supabase';

const getAuthorById = async (id: string) => {
    const { data, error } = await supabase.from('User').select().eq('id', id).single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const useGetAuthorById = (id: string) => {
    return useQuery({
        queryFn: () => getAuthorById(id),
        queryKey: ['user'],
    });
};
