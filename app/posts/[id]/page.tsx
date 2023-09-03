'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Typography, Stack, Button } from '@mui/material';
import { CardList, CreateCommentForm } from '@/components';
import { useGetAuthUser, useGetPostsByAuthor, useGetCommentsAll, useGetAuthorById } from '@/utils';

type IMyPosts = {
    params: {
        id: string;
    };
};

const MyPosts = ({ params: { id } }: IMyPosts) => {
    const { data: user, isSuccess } = useGetAuthUser();
    const { data: posts, isError: isErrorPost } = useGetPostsByAuthor(id);
    const { data: comments, isError: isErrorComment } = useGetCommentsAll(id);
    const { data: author } = useGetAuthorById(id);
    //console.log(id, author);

    const [postID, setPostId] = useState('');

    const [role, setRole] = useState('');

    const setActivePost = (newPostId: string) => {
        setPostId(newPostId);
    };

    const resetActivePost = () => {
        setPostId('');
    };

    useEffect(() => {
        if (user) {
            setRole(user.role);
        }
    }, [isSuccess]);

    return (
        isSuccess && (
            <Stack justifyContent='center' alignItems='center' maxWidth='95vw' spacing={5}>
                <Typography component='h1'>Author Feed - {author?.username}</Typography>
                <Stack alignItems='center' justifyContent='space-between' direction='row' spacing={5}>
                    <Stack alignItems='center' justifyContent='center' spacing={5}>
                        {!!posts && (
                            <>
                                <Typography>Select post, which you want to comment</Typography>
                                <CardList posts={posts} showBtn={false} activePost={postID} onClick={setActivePost} />
                            </>
                        )}
                        {!!comments && (
                            <>
                                <Typography>Comments to the author posts</Typography>
                                <CardList posts={comments} showBtn={false} />
                            </>
                        )}
                        {isErrorPost && <span>Couldn`t get posts</span>}
                        {isErrorComment && <span>Couldn`t get comments</span>}
                    </Stack>
                    <Stack alignItems='center' justifyContent='center' spacing={5}>
                        {role === 'commentator' && <CreateCommentForm id={user.id} postID={postID} onReset={resetActivePost} />}
                    </Stack>
                </Stack>
                <Link href='/posts'>
                    <Button variant='text'>to General Feed</Button>
                </Link>
            </Stack>
        )
    );
};

export default MyPosts;
