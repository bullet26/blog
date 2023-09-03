import { FC } from 'react';
import { Typography } from '@mui/material';
import { CardList } from '@/components';

interface IPostSection {
    posts: { title: string; content: string; author_id: string; id: string; postTitle?: string }[];
    postID: string;
    setActivePost: (id: string) => void;
}

const PostSection: FC<IPostSection> = props => {
    const { posts, postID, setActivePost } = props;

    return (
        <>
            <Typography>Select post, which you want to comment</Typography>
            <CardList posts={posts} showBtn={false} activePost={postID} onClick={setActivePost} />
        </>
    );
};

export default PostSection;
