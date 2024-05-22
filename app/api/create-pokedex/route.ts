import { prisma } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse, NextRequest } from 'next/server';
import PokedexForm from '@/types/PokedexForm';
import getPokemon from './getPokemon';


export async function POST(req: NextRequest) {
    try {
        const request: PokedexForm = await req.json();

        const session = await getServerSession(authOptions);
        if(!session?.user?.name) return NextResponse.json({status: 'fail', message: 'Please make sure you are logged in.'});
        const username = session.user.name;

        if(request.name.length < 3 || request.name.length > 20 || !/^[a-zA-Z0-9\-]+$/.test(request.name)) return NextResponse.json({status: 'fail', message: 'Invalid Pokedex name.'});

        const user = await prisma.user.findUnique({
            select: {
                id: true
            },
            where: {
                username
            }
        });
        if(!user) return NextResponse.json({status: 'fail', message: 'Please make sure you are logged in.'});

        const pokedex = await prisma.pokedex.create({
            data: {
                user_id: user.id,
                game: request.game,
                shiny: request.shiny,
                name: request.name,
                dlc: request.dlc,
                created_at: new Date(),
                updated_at: new Date()
            }
        });

        const pokemon = getPokemon(pokedex.id, request.game, request.shiny, request.dlc, request.isNational);
        await prisma.pokemon.createMany({
            data: pokemon
        });

        return NextResponse.json({status: 'ok', message: 'Successfully created Pokedex.'});
    }
    catch (e) {
        console.log(e);
        
        return NextResponse.json({status: 'fail', message: 'Internal error creating Pokedex.'});
    }
}