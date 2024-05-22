import Loading from '@/components/Loading';
import Box from '@/components/ServerComponents/Box';
import CircularProgress from '@/components/ServerComponents/CircularProgress';
import Typography from '@/components/ServerComponents/Typography';
import Sidebar from '@/components/Sidebar/Sidebar';
import getPokedexes from '@/lib/getServerSideProps/getPokedexes';
import { Providers } from '@/redux/provider';
import { Suspense } from 'react';


// Getting the Pokedex will be based on the users username (table 2) and their pokedex name
export default async function Layout({ children, params }: { children: React.ReactNode, params: { user: string }}){
    const pokedexNames = await getPokedexes(params.user);

    return (
        <Providers>
            <Box display='flex' width='100%'>
                <Sidebar pokedexNames={pokedexNames} username={params.user} />
                <div style={{marginLeft: '24px', width: '100%'}} >
                    { children }
                </div>
            </Box>
        </Providers>
    )
}