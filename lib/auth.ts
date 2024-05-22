import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'username'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials.password) return null;

                const user = await prisma.user.findUnique({
                    where: {
                        username: credentials.username,
                    }
                });

                if (!user || !(await compare(credentials.password, user.password))) return null;
                
                return {
                    id: user.id,
                    email: user.email,
                    name: user.username
                };
            }
        })
    ],
    pages: {
        signIn: '/login'
    }
}