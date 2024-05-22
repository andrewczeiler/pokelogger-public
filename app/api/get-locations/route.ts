import { NextResponse, NextRequest } from 'next/server';
import getPokedexLocations from '@/lib/getServerSideProps/getPokedexLocations';
import { PokemonLocation } from '@/types/Location';


export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const pokemonName = searchParams.get('pokemonName');
    const game = searchParams.get('game');
    const dlcString = searchParams.get('dlc');

    let dlc = false;
    if (dlcString && dlcString === 'true') dlc = true;

    if(!game || !pokemonName) return NextResponse.json({status: 'fail', message: 'Must give both Pokemon name and game.'});

    try {
        const locations = await getPokedexLocations(game, dlc, pokemonName);
        if(!locations) return NextResponse.json({status: 'fail', message: 'No locations found.'});
        
        return NextResponse.json({status: 'ok', message: 'Successfully got locations.', locations: sortLocations(locations)});
    }
    catch (e) {
        console.log(e);
        
        return NextResponse.json({status: 'fail', message: 'Internal error getting locations.'});
    }
}

function sortLocations(locations: { location: string, game: string }[]) {
    const uniqueGames: string[] = [];
    for (const location of locations) {
        if(!uniqueGames.includes(location.game)) uniqueGames.push(location.game);
    }

    const sortedLocations: PokemonLocation[] = [];
    for (const game of uniqueGames) {
        const locationsOfGame = locations.filter(loc => loc.game === game);

        sortedLocations.push({
            game,
            locations: locationsOfGame.map(e => e.location)
        });
    }

    return sortedLocations;
}