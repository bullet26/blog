import { useQuery } from '@tanstack/react-query';
import supabase from '../app/supabase';

const getUser = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id || '';

    const { data, error } = await supabase.from('User').select().eq('id', userId).single();

    if (error) {
        throw new Error(error.message);
    }

    if (!data) {
        throw new Error('User not found');
    }

    return data;
};

export const useGetAuthUser = () => {
    return useQuery({
        queryFn: getUser,
        queryKey: ['authUser'],
    });
};
