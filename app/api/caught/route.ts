import { prisma } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse, NextRequest } from 'next/server';
import { PokemonCaught } from '@/types/PokemonCaught';


export async function POST(req: NextRequest) {
    try {
        const request: PokemonCaught = await req.json();

        const session = await getServerSession(authOptions);
        if(!session?.user?.name) return NextResponse.json({status: 'fail', message: 'User not logged in.'});
        const username = session.user.name;

        const pokedexes = await prisma.pokedex.findMany({
            where: {
                user: {
                    username
                }
            },
            select: {
                id: true
            }
        });

        const status = await prisma.pokemon.update({
            where: {
                id: request.id,
                pokedex_id: {
                    in: pokedexes.map((e: any) => e.id)
                }
            },
            data: {
                caught: request.caught,
                updated_at: new Date()
            }
        });

        if(status) return NextResponse.json({status: 'ok', message: 'Successfully updated Pokemon.'});
        else throw 'Internal Error (made by me)';
    }
    catch (e) {
        console.log(e);

        return NextResponse.json({status: 'fail', message: 'Internal error updating Pokemon caught status.'});
    }
}