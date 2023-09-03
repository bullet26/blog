import { Typography, Stack, Button } from '@mui/material';
import Link from 'next/link';
import { SignupForm } from '@/components';

const Signup = () => {
    return (
        <Stack width='100vw' height='100vh' alignItems='center' justifyContent='center' spacing={2}>
            <Typography>Sign up</Typography>
            <SignupForm />
            <Link href='/login'>
                <Button variant='text'>to Login page</Button>
            </Link>
        </Stack>
    );
};

export default Signup;
