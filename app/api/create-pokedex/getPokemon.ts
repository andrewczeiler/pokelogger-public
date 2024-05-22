import { allGames } from '@/data/pokedexes//allGames/allGames';
import { redBlueYellow } from '@/data/pokedexes//gen1/redBlueYellow';
import { goldSilverCrystal } from '@/data/pokedexes//gen2/goldSilverCrystal';
import { frlgRegional } from '@/data/pokedexes//gen3/frlg.ts/frlgRegional';
import { gen3National } from '@/data/pokedexes//gen3/gen3National';
import { rubySapphireEmeraldRegional } from '@/data/pokedexes//gen3/rubySapphireEmerald/rubySapphireEmeraldRegional';
import { diamondPearlPlatinumRegional } from '@/data/pokedexes//gen4/diamondPearlPlatinum/diamondPearlPlatinumRegional';
import { gen4National } from '@/data/pokedexes//gen4/gen4National';
import { hgssRegional } from '@/data/pokedexes//gen4/hgss/hgssRegional';
import { black2White2Regional } from '@/data/pokedexes//gen5/black2White2/black2White2Regional';
import { blackWhiteRegional } from '@/data/pokedexes//gen5/blackWhite/blackWhiteRegional';
import { gen5National } from '@/data/pokedexes//gen5/gen5National';
import { gen6National } from '@/data/pokedexes//gen6/gen6National';
import { orasRegional } from '@/data/pokedexes//gen6/oras/orasRegional';
import { xyRegional } from '@/data/pokedexes//gen6/xy/xyRegional';
import { gen7National } from '@/data/pokedexes//gen7/gen7National';
import { letsGoPikachuEevee } from '@/data/pokedexes//gen7/letsGoPikachuEevee/letsGoPikachuEevee';
import { sunMoonRegional } from '@/data/pokedexes//gen7/sunMoon/sunMoonRegional';
import { ultraSunMoonRegional } from '@/data/pokedexes//gen7/ultraSunMoon/ultraSunMoonRegional';
import { legendsArceus } from '@/data/pokedexes//gen8/legendsArceus/legendsArceus';
import { swordShield } from '@/data/pokedexes//gen8/swordShield/swordShield';
import { swordShieldDlc } from '@/data/pokedexes//gen8/swordShield/swordShieldDlc';
import { scarletViolet } from '@/data/pokedexes//gen9/scarletViolet';
import { pokemonHome } from '@/data/pokedexes//pokemonHome/pokemonHome';
import { scarletVioletDlc } from '@/data/pokedexes/gen9/scarletVioletDlc';



export default function getPokemon(pokedexId: number, game: string,  shiny: boolean, dlc?: boolean, isNational?: boolean) {
    switch(game) {
        case 'allgames':
            return allGames(pokedexId);
        case 'pokemonhome':
            return pokemonHome(pokedexId);
        case 'scarletviolet':
            if(dlc) return scarletVioletDlc(pokedexId);
            return scarletViolet(pokedexId);
        case 'legendsarceus':
            return legendsArceus(pokedexId);
        case 'bdsp':
            if(isNational) return gen4National(pokedexId);
            return pokemonHome(pokedexId);
        case 'swordshield':
            if(dlc) return swordShieldDlc(pokedexId);
            return swordShield(pokedexId);
        case 'letsgopikachueevee':
            return letsGoPikachuEevee(pokedexId);
        case 'ultrasunmoon':
            if(isNational) return gen7National(pokedexId);
            return ultraSunMoonRegional(pokedexId);
        case 'sunmoon':
            if(isNational) return gen7National(pokedexId);
            return sunMoonRegional(pokedexId);
        case 'oras':
            if(isNational) return gen6National(pokedexId);
            return orasRegional(pokedexId);
        case 'xy':
            if(isNational) return gen6National(pokedexId);
            return xyRegional(pokedexId);
        case 'black2white2':
            if(isNational) return gen5National(pokedexId);
            return black2White2Regional(pokedexId);
        case 'blackwhite':
            if(isNational) return gen5National(pokedexId);
            return blackWhiteRegional(pokedexId);
        case 'hgss':
            if(isNational) return gen4National(pokedexId);
            return hgssRegional(pokedexId);
        case 'diamondpearlplatinum':
            if(isNational) return gen4National(pokedexId);
            return diamondPearlPlatinumRegional(pokedexId);
        case 'rubysapphireemerald':
            if(isNational) return gen3National(pokedexId);
            return rubySapphireEmeraldRegional(pokedexId);
        case 'frlg':
            if(isNational) return gen3National(pokedexId);
            return frlgRegional(pokedexId);
        case 'goldsilvercrystal':
            return goldSilverCrystal(pokedexId);
        case 'redblueyellow':
            return redBlueYellow(pokedexId);
        default:
            return allGames(pokedexId);
    }
}