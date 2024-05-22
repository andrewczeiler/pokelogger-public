import { prisma } from '@/lib/prisma';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse, NextRequest } from 'next/server';
import PokedexForm from '@/types/PokedexForm';


export async function POST(req: NextRequest) {
    try {
        /*
        const result = await fetch('https://pokeapi.co/api/v2/pokedex/14');
        const data = await result.json();

        const pokemon = data.pokemon_entries;

        console.log(pokemon);

        for (const poke of pokemon) {
            let pokeStr = "{pokedex_id: pokedexId, form: 'normal', number: ";
            pokeStr += (poke.entry_number + 303);
            pokeStr += ", name: '";
            pokeStr += poke.pokemon_species.name;
            pokeStr += "', created_at: new Date(), updated_at: new Date()},"

            console.log(pokeStr)
        }

        const string = "{pokedex_id: pokedexId, form: 'normal', number: 148, name: 'axew', created_at: new Date(), updated_at: new Date()},"

        console.log(data);
        */


        // Save this for when uploading the next DLC
        const result1 = await fetch('https://pokeapi.co/api/v2/pokedex/31');
        const paldea = await result1.json();
        const paldeaPokemon: string[] = paldea.pokemon_entries.map((e: any) => e.pokemon_species.name);


        const result2 = await fetch('https://pokeapi.co/api/v2/pokedex/33');
        const kitakami = await result2.json();
        const kitakamiPokemon = kitakami.pokemon_entries.map((e: any) => e);


        const uniquePokemon: any[] = [];
        for (const poke of kitakamiPokemon) {
            if(!paldeaPokemon.includes(poke.pokemon_species.name)) uniquePokemon.push(poke);
        }


        let dlcStr = '';
        for (const poke of uniquePokemon) {
            let str = "{pokedex_id: pokedexId, form: 'blueberry', number: " + (poke.entry_number + 50000);
            str += ", name: '";
            str += poke.pokemon_species.name;
            str += "', created_at: new Date(), updated_at: new Date()},\n";

            dlcStr += str;
        }

        console.log(dlcStr)

        let pythonStr = '[';
        for (const poke of kitakamiPokemon) {
            pythonStr += '"' + poke.pokemon_species.name + '", '
        }

        pythonStr += ']'

        console.log(pythonStr)


        return NextResponse.json({status: 'ok', message: 'No Error.'});
    }
    catch (e) {
        console.log(e);

        return NextResponse.json({status: 'fail', message: 'Error.'});
    }
}