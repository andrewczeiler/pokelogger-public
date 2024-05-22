import { prisma } from '@/lib/prisma';
import { Pokedex } from '@/types/Pokedex';


export const revalidate = 0;

export default async function getCurrentPokedex(username: string, pokedexName: string) {
    try {
        // Have to use findFirst, but there can only be one Pokedex that fits the criteria
        const pokedex: Pokedex = await prisma.pokedex.findFirstOrThrow({
            select: {
                name: true,
                game: true,
                shiny: true,
                dlc: true,
                pokemon: {
                    select: {
                        id: true,
                        number: true,
                        name: true,
                        form: true,
                        caught: true
                    }
                }
            },
            where: {
                user: {
                    username 
                },
                name: pokedexName
            }
        });

        return pokedex;
    }
    catch (e) {
        console.log(e);

        return null;
    }
}