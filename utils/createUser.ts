import supabase from '../app/supabase';

interface User {
    username: string;
    email: string;
    password: string;
    role: string;
}

export const createUser = async (user: User) => {
    const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
    });
    //If Confirm email is disabled, the error message, User already registered is returned.
    if (error) {
        throw new Error(error.message);
    }

    const { data: insertData, error: insertError } = await supabase.from('User').insert({
        username: user.username,
        role: user.role,
        id: data?.user?.id,
    });

    if (insertError) {
        throw new Error(insertError.message);
    }

    return insertData;
};
