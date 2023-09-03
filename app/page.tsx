import { Button, Typography, Stack } from '@mui/material';
import Link from 'next/link';

const Home = () => {
    return (
        <main>
            <Stack width='100vw' height='100vh' alignItems='center' justifyContent='center' spacing={2}>
                <Typography>Hello, dear User. Please, sign up.</Typography>
                <Link href='/signup'>
                    <Button variant='outlined'>Fololow the link</Button>
                </Link>
            </Stack>
        </main>
    );
};

export default Home;
