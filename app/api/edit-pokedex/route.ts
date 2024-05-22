import { prisma } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse, NextRequest } from 'next/server';
import { ChangePokedexName } from '@/types/ChangePokedexName';


export async function POST(req: NextRequest) {
    try {
        const body: ChangePokedexName = await req.json();

        const session = await getServerSession(authOptions);
        if(!session?.user?.name) return NextResponse.json({status: 'fail', message: 'Please make sure you are logged in.'});
        const username = session.user.name;

        if(username !== body.username) return NextResponse.json({status: 'fail', message: 'Invalid permissions.'});
        if(body.newName.length < 3 || body.newName.length > 20 || !/^[a-zA-Z0-9\-]+$/.test(body.newName)) return NextResponse.json({status: 'fail', message: 'Invalid Pokedex name.'});

        await prisma.pokedex.updateMany({
            where: {
                user: {
                    username
                },
                name: body.pokedexName
            },
            data: {
                name: body.newName
            }
        });

        return NextResponse.json({status: 'ok', message: 'Successfully changed Pokedex name.'});
    }
    catch (e: any) {
        console.log(e);

        if (e.code === 'P2002') {
            if (e.meta.target[1] === 'name') {
                return NextResponse.json({status: 'fail', message: 'Pokedex name already in use.'});
            }
        }

        return NextResponse.json({status: 'fail', message: 'Error changing Pokedex name.'});
    }
}