import { FC } from 'react';
import { Typography } from '@mui/material';
import { CardList } from '@/components';

interface ICommentSection {
    comments: { title: string; content: string; author_id: string; id: string; postTitle?: string }[];
}

const CommentSection: FC<ICommentSection> = props => {
    const { comments } = props;

    return (
        <>
            <Typography>Comments to the author posts</Typography>
            <CardList posts={comments} showBtn={false} />
        </>
    );
};

export default CommentSection;
