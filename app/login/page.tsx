import { Typography, Stack } from '@mui/material';
import { LoginForm } from '@/components';

const Login = () => {
    return (
        <Stack width='100vw' height='100vh' alignItems='center' justifyContent='center' spacing={2}>
            <Typography>Login</Typography>
            <LoginForm />
        </Stack>
    );
};

export default Login;
