import { prisma } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse, NextRequest } from 'next/server';
import { DeletePokedex } from '@/types/DeletePokedex';


export async function POST(req: NextRequest) {
    try {
        const body: DeletePokedex = await req.json();

        const session = await getServerSession(authOptions);
        if(!session?.user?.name) return NextResponse.json({status: 'fail', message: 'Please make sure you are logged in.'});
        const username = session.user.name;

        if(username !== body.username) return NextResponse.json({status: 'fail', message: 'Invalid permissions.'});

        // Get ID of Pokedex, and return an error if it can't be found
        const pokedexId = await prisma.pokedex.findFirst({
            select: {
                id: true
            },
            where: {
                user: {
                    username
                },
                name: body.pokedexName
            }
        });
        if(!pokedexId) return NextResponse.json({status: 'fail', message: 'Pokedex not found.'});

        await prisma.pokemon.deleteMany({
            where: {
                pokedex_id: pokedexId.id
            }
        });

        await prisma.pokedex.delete({
            where: {
                id: pokedexId.id
            }
        });

        return NextResponse.json({status: 'ok', message: 'Successfully deleted Pokedex.'});
    }
    catch (e) {
        console.log(e);
        
        return NextResponse.json({status: 'fail', message: 'Error deleting Pokedex.'});
    }
}