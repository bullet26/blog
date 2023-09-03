'use client';
import { FC, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TextField, Button, Typography, Stack } from '@mui/material';
import { creteComent } from '@/utils';
import { initialValuesCreatePost, validationSchemaPost } from './utils';
import s from './Form.module.css';

interface IFormInput {
    content: string;
    title: string;
}

interface ICommentPostForm {
    id: string;
    postID: string;
    onReset?: () => void;
}
const CreateCommentForm: FC<ICommentPostForm> = props => {
    const { id, postID, onReset } = props;
    const [showError, setShowError] = useState(false);
    const client = useQueryClient();

    const { mutate, isError, error } = useMutation({
        mutationFn: creteComent,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['comments'] });
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
        if (!postID || !id) {
            setShowError(true);
            return;
        }
        setShowError(false);
        mutate({ ...data, author_id: id, post_id: postID });
        reset();
        !!onReset && onReset();
    };

    return (
        <Stack justifyContent='center' alignItems='center' width='30vw'>
            <Typography className={s.title}>Write a comment</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={s.formContainer}>
                <Controller name='title' control={control} render={({ field }) => <TextField {...field} type='text' label='Title' />} />
                <div className={s.errorMessage}>{errors.title?.message}</div>
                <Controller name='content' control={control} render={({ field }) => <TextField {...field} label='What is your opinion?' type='text' />} />
                <div className={s.errorMessage}>{errors.content?.message}</div>
                <Button variant='outlined' type='submit'>
                    Send Comment
                </Button>
            </form>
            {isError && <div className={s.errorMessage}>{error?.message || 'Something went wrong'}</div>}
            {!postID && showError && <div className={s.errorMessage}>{'Select the post'}</div>}
        </Stack>
    );
};

export default CreateCommentForm;
