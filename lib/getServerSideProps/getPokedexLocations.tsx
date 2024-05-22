import { prisma } from '@/lib/prisma';


export const revalidate = 0;

export default async function getPokedexLocations(game: string, dlc: boolean, pokemonName: string) {
    try {
        const games = getGames(game, dlc);
        // Have to use findFirst, but there can only be one Pokedex that fits the criteria
        const locations = await prisma.location.findMany({
            select: {
                location: true,
                game: true
            },
            where: {
                game: {
                    in: games
                },
                pokemon_name: pokemonName
            }
        });

        return locations;
    }
    catch (e) {
        console.log(e);

        return null;
    }
}

function getGames(game: string, dlc: boolean) {
    switch(game) {
        case 'allgames':
        case 'pokemonhome':
            return undefined;
        case 'scarletviolet':
            if (dlc) return ['scarletdlc', 'violetdlc'];
            return ['scarlet', 'violet'];
        case 'legendsarceus':
            return ['legendsarceus'];
        case 'bdsp':
            return ['brilliantdiamond', 'shiningpearl'];
        case 'swordshielddlc':
            return ['sworddlc', 'shielddlc'];
        case 'swordshield':
            if (dlc) return ['sworddlc', 'shielddlc'];
            return ['sword', 'shield'];
        case 'letsgopikachueevee':
            return ['letsgopikachu', 'letsgoeevee'];
        case 'ultrasunmoon':
            return ['ultrasun', 'ultramoon'];
        case 'sunmoon':
            return ['sun', 'moon'];
        case 'oras':
            return ['omegaruby', 'alphasapphire'];
        case 'xy':
            return ['x', 'y'];
        case 'black2white2':
            return ['black2', 'white2'];
        case 'blackwhite':
            return ['black', 'white'];
        case 'hgss':
            return ['heartgold', 'soulsilver'];
        case 'diamondpearlplatinum':
            return ['diamond', 'pearl', 'platinum'];
        case 'rubysapphireemerald':
            return ['ruby', 'sapphire', 'emerald'];
        case 'frlg':
            return ['firered', 'leafgreen'];
        case 'goldsilvercrystal':
            return ['gold', 'silver', 'crystal'];
        case 'redblueyellow':
            return ['red', 'blue', 'yellow'];        
        default:
            return undefined;
    }
}