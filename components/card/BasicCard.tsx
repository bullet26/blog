import { FC } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { borderColor } from '@mui/system';

interface IBasicCard {
    title: string;
    content: string;
    id?: string;
    authorId: string;
    showBtn?: boolean;
    onClick?: (id: string) => void;
    active?: boolean;
}

const BasicCard: FC<IBasicCard> = props => {
    const { title, content, authorId, active, id = '', showBtn = true, onClick = () => {} } = props;
    const router = useRouter();

    const handleClickBtn = () => {
        !!id && router.push(`/posts/${authorId}`);
    };

    return (
        <Card onClick={() => onClick(id)} sx={{ width: 275, cursor: 'pointer', backgroundColor: theme => (active ? theme.palette.primary.extraLight : theme.palette.primary.white) }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                    {title}
                </Typography>
                <Typography sx={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{content}</Typography>
            </CardContent>
            <CardActions>
                {showBtn && (
                    <Button size='small' onClick={handleClickBtn}>
                        See all posts from author
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default BasicCard;
