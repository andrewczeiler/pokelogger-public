import { prisma } from '@/lib/prisma';

import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';


export default async function UserPage({ params }: { params: { user: string } }) {
    const session = await getServerSession(authOptions);

    // Bring them to login page if there are not logged in
    if(!session || !session?.user?.name) {
        redirect('/login');
    }

    // If they are logged in but not the owner of this account, send them to their own page
    if(session?.user?.name !== params.user) {
        redirect('/user/' + session.user.name);
    }

    // If they are logged in and this is their page
    const pokedexName = await getFirstPokedex(session.user.name);
    if(pokedexName) redirect('/user/' + session.user.name + '/dex/' + pokedexName);
    redirect('/user/' + session.user.name + '/create-pokedex');
}

async function getFirstPokedex(username: string) {
    try {
        const pokedex = await prisma.pokedex.findFirst({
            select: {
                name: true
            },
            where: {
                user: {
                    username
                }
            },

        });

        return pokedex?.name;
    }
    catch (e) {
        return null;
    }
}