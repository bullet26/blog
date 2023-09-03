'use client';
import { useEffect, useState } from 'react';
import { Typography, Stack } from '@mui/material';
import { CardList, CreatePostForm } from '@/components';
import { useRouter } from 'next/navigation';
import { useGetAuthUser, useGetPostsAll } from '@/utils';

const AllPosts = () => {
    const router = useRouter();
    const { data, isError, isSuccess } = useGetAuthUser();
    const { data: posts, isError: isErrorPost } = useGetPostsAll();

    const [role, setRole] = useState('');
    const [id, setID] = useState('');

    useEffect(() => {
        if (isError) {
            router.push('/login');
        }
    }, [isError]);

    useEffect(() => {
        if (data) {
            setRole(data.role);
            setID(data.id);
        }
    }, [isSuccess]);

    return (
        isSuccess && (
            <Stack justifyContent='center' alignItems='center' maxWidth='95vw' spacing={5}>
                <Typography component='h1'>General Feed</Typography>
                <Stack alignItems='center' justifyContent='space-between' direction='row'>
                    {!!posts && <CardList posts={posts} showBtn={true} />}
                    {role === 'author' && <CreatePostForm id={id} />}
                    {isErrorPost && <span>Couldn`t get posts</span>}
                </Stack>
            </Stack>
        )
    );
};

export default AllPosts;
