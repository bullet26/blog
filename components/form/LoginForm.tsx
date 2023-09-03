'use client';
import { useRouter } from 'next/navigation';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { login } from '@/utils';
import { initialValuesLogin, validationSchemaLogin } from './utils';
import s from './Form.module.css';

interface IFormInput {
    email: string;
    password: string;
}

const LoginForm = () => {
    const router = useRouter();
    const client = useQueryClient();

    const { mutate, isError, isSuccess, error } = useMutation({
        mutationFn: login,
        onSuccess: () => client.invalidateQueries(['authUser', 'user']),
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchemaLogin),
        defaultValues: initialValuesLogin,
    });

    const onSubmit: SubmitHandler<IFormInput> = data => {
        mutate(data);
        reset();
    };

    useEffect(() => {
        if (isSuccess) {
            router.push('/posts');
        }
    }, [isSuccess]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={s.formContainer}>
                <Controller name='email' control={control} render={({ field }) => <TextField {...field} type='email' label='email' />} />
                <div className={s.errorMessage}>{errors.email?.message}</div>
                <Controller name='password' control={control} render={({ field }) => <TextField {...field} label='password' type='password' />} />
                <div className={s.errorMessage}>{errors.password?.message}</div>
                <Button variant='outlined' type='submit'>
                    Login
                </Button>
            </form>
            {isError && <div className={s.errorMessage}> {(error as { message?: string })?.message || 'Something went wrong'}</div>}
        </>
    );
};

export default LoginForm;
