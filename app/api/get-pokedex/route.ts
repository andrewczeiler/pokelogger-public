import { NextResponse, NextRequest } from 'next/server';
import getCurrentPokedex from '@/lib/getServerSideProps/getCurrentPokedex';


export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const user = searchParams.get('user');
        const pokedexName = searchParams.get('pokedexName');

        if(!user || !pokedexName) return NextResponse.json({status: 'fail', message: 'Invalid Pokedex name or username.'});

        const pokedex = await getCurrentPokedex(user, pokedexName);
        if(!pokedex) return NextResponse.json({status: 'fail', message: 'No Pokedex found.'});
        
        return NextResponse.json({status: 'ok', message: 'Successfully found Pokedex.', pokedex});
    }
    catch (e) {
        console.log(e);
        
        return NextResponse.json({status: 'fail', message: 'Internal error creating Pokedex.'});
    }
}