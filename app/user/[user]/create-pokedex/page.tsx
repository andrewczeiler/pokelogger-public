import Box from '@/components/ServerComponents/Box';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import CreatePokedexForm from './CreatePokedexForm';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Create Pokédex | Pokélogger'
}

interface PokedexPageParams {
    params: {
        user: string
        pokedex: string
    }
}
// Getting the Pokedex will be based on the users username (table 2) and their pokedex name
export default async function CreatePokedexPage(params: PokedexPageParams){
    const session = await getServerSession(authOptions);

    // Turn this into a redirect to login, since a user shouldn't go to create a pokedex page if they aren't logged in
    if(!session || !session.user?.name) {
        redirect('/login');
    }
    else if(params.params.user !== session.user.name) {
        redirect('/user/' + session.user.name + '/create-pokedex');
    }
    
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='80vh'
            width='100%'
        >
            <CreatePokedexForm username={session.user.name} />
        </Box>
    )
}