'use client';
import { FC } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TextField, Button, Typography, Stack } from '@mui/material';
import { cretePost } from '@/utils';
import { initialValuesCreatePost, validationSchemaPost } from './utils';
import s from './Form.module.css';

interface IFormInput {
    content: string;
    title: string;
}

interface ICreatePostForm {
    id: string;
}
const CreatePostForm: FC<ICreatePostForm> = props => {
    const { id } = props;
    const client = useQueryClient();

    const { mutate, isError, error } = useMutation({
        mutationFn: cretePost,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchemaPost),
        defaultValues: initialValuesCreatePost,
    });

    const onSubmit: SubmitHandler<IFormInput> = data => {
        mutate({ ...data, author_id: id });
        reset();
    };

    return (
        <Stack justifyContent='center' alignItems='center' width='30vw'>
            <Typography className={s.title}>Write a post</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={s.formContainer}>
                <Controller name='title' control={control} render={({ field }) => <TextField {...field} type='text' label='Title' />} />
                <div className={s.errorMessage}>{errors.title?.message}</div>
                <Controller name='content' control={control} render={({ field }) => <TextField {...field} label='What is your opinion?' type='text' />} />
                <div className={s.errorMessage}>{errors.content?.message}</div>
                <Button variant='outlined' type='submit'>
                    Send Post
                </Button>
            </form>
            {isError && <div className={s.errorMessage}>{error?.message || 'Something went wrong'}</div>}
        </Stack>
    );
};

export default CreatePostForm;
