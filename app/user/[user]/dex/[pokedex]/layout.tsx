import { Metadata } from 'next';


interface PokedexPageParams {
    params: {
        user: string
        pokedex: string
    }
}

export function generateMetadata(params: PokedexPageParams): Metadata {
    return ({
        title: params.params.pokedex + ' | ' + params.params.user
    });
}

// Getting the Pokedex will be based on the users username (table 2) and their pokedex name
export default async function Layout({ children, params }: { children: React.ReactNode, params: { user: string }}){
    return (
        <>
            { children }
        </>
    )
}