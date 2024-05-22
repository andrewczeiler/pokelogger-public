import { prisma } from '@/lib/prisma';


export default async function getPokedexes(username: string) {
    try {
        const pokedexes = await prisma.pokedex.findMany({
            select: {
                name: true
            },
            where: {
                user: {
                    username: username
                }
            }
        })

        return pokedexes.map((pokedex) => pokedex.name);
    }
    catch (e) {
        console.log(e);

        return [];
    }
}