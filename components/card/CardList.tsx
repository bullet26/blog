import { FC } from 'react';
import { Stack } from '@mui/material';
import { BasicCard } from '@/components';

interface ICardList {
    posts: { title: string; content: string; author_id: string; id: string; postTitle?: string }[];
    showBtn?: boolean;
    onClick?: (id: string) => void;
    activePost?: string;
}

const CardList: FC<ICardList> = props => {
    const { posts, showBtn, onClick, activePost } = props;

    return (
        <Stack alignItems='center' justifyContent='center' direction='row' flexWrap={'wrap'} gap='20px'>
            {posts?.map(({ title, content, author_id, id, postTitle }) => (
                <BasicCard
                    key={title}
                    title={postTitle ? `${title} for post ${postTitle}` : title}
                    content={content}
                    authorId={author_id}
                    id={id}
                    showBtn={showBtn}
                    onClick={onClick}
                    active={activePost === id}
                />
            ))}
        </Stack>
    );
};

export default CardList;
