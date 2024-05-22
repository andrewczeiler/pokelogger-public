import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

import Container from '@/components/ServerComponents/Container';
import Paper from '@/components/ServerComponents/Paper';
import Typography from '@/components/ServerComponents/Typography';
import RegisterForm from './RegisterForm';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Register | Pokélogger'
}

export default async function RegisterPage() {
    const session = await getServerSession(authOptions);

    if(session && session?.user?.name) {
        redirect('/user/' + session.user.name);
    }

    return (
        <Container
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh'
            }}
        >
            <Paper
                sx={{
                    p: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: '12px',
                    width: '512px'
                }}
            >
                <Typography variant='h1' fontSize='2.4rem' fontWeight='500' textAlign='center' mb='12px' >
                    Register
                </Typography>
                <RegisterForm />
            </Paper>
        </Container>
    )
}