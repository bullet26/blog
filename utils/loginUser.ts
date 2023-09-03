import supabase from '../app/supabase';

interface UserLogin {
    email: string;
    password: string;
}

export const login = async (user: UserLogin) => {
    const { data, error } = await supabase.auth.signInWithPassword(user);

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
