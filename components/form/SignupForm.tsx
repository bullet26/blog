'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button, MenuItem, TextField, Select, InputLabel } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '@/utils';
import { initialValuesSignup, validationSchemaSignup } from './utils';
import s from './Form.module.css';

interface IFormInput {
    username: string;
    email: string;
    password: string;
    role: string;
}

const SignupForm = () => {
    const { mutate, isError, isSuccess, error } = useMutation({
        mutationFn: createUser,
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchemaSignup),
        defaultValues: initialValuesSignup,
    });

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        mutate(data);
        console.log(data);
        reset();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={s.formContainer}>
                <Controller name='username' control={control} render={({ field }) => <TextField {...field} label='Username' type='text' variant='outlined' />} />
                <div className={s.errorMessage}>{errors.username?.message}</div>
                <Controller name='email' control={control} render={({ field }) => <TextField {...field} label='Email' type='email' variant='outlined' />} />
                <div className={s.errorMessage}>{errors.email?.message}</div>
                <Controller name='password' control={control} render={({ field }) => <TextField {...field} label='Password' type='password' variant='outlined' />} />
                <div className={s.errorMessage}>{errors.password?.message}</div>
                <Controller
                    name='role'
                    control={control}
                    render={({ field }) => (
                        <>
                            <InputLabel sx={{ color: '#ff5c00' }}>Select role</InputLabel>
                            <Select {...field}>
                                <MenuItem value='author'>Author</MenuItem>
                                <MenuItem value='commentator'>Commentator</MenuItem>
                            </Select>
                        </>
                    )}
                />
                <div className={s.errorMessage}>{errors.role?.message}</div>
                <Button variant='outlined' type='submit'>
                    Sign up
                </Button>
            </form>
            {isError && <div className={s.errorMessage}> {(error as { message?: string })?.message || 'Something went wrong'}</div>}
            {isSuccess && <div className={s.message}>User created</div>}
        </>
    );
};

export default SignupForm;
