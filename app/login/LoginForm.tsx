'use client';

import * as React from 'react';

import { signIn } from 'next-auth/react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function LoginForm() {
    const [ username, setUsername ] = React.useState('');
    const [ password , setPassword ] = React.useState('');

    async function handleLogin() {
        await signIn('credentials', {
            username,
            password,
            redirect: true,
            callbackUrl: '/user/' + username
        });
    }

    return (
        <form>
            <Box
                display='flex'
                flexDirection='column'
                rowGap='24px'
            >
                <TextField
                    onChange={(e) => setUsername(e.target.value)}
                    label='username'
                    type='text'
                />
                <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') handleLogin()
                    }}
                    label='password'
                    type='password'
                />
                <Button 
                    variant='contained'
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Box>
        </form>
    )
}