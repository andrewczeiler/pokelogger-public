import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';
import { Pokedex } from '@/types/Pokedex';
import { Pokemon } from '@/types/Pokemon';


export interface CurrentPokedex {
    pokedex: Pokedex
    viewPokemon: Pokemon[]
    hideCaught: boolean
    numPokemon: number
    totalCaught: number
    searchQuery: string
}

const initialState: CurrentPokedex = {
    pokedex: {
        name: '',
        shiny: false,
        game: '',
        dlc: false,
        pokemon: []
    },
    viewPokemon: [],
    hideCaught: false,
    numPokemon: 0,
    totalCaught: 0,
    searchQuery: ''
}

export const currentPokedexSlice = createSlice({
    name: 'currentPokedex',
    initialState,
    reducers: {
        setPokedex: (state, action : {payload: Pokedex, type: string}) => {
            state.hideCaught = false;
            state.pokedex = action.payload;
            state.viewPokemon = action.payload.pokemon;
            state.numPokemon = action.payload.pokemon.length;
            state.totalCaught = action.payload.pokemon.filter(poke => poke.caught).length;
            state.searchQuery = '';
        },
        setCaught: (state, action : {payload: number, type: string}) => {
            const index = state.pokedex.pokemon.map(poke => poke.id).indexOf(action.payload);
            if(index >= 0) {
                // Set the new state with the updated caught Pokemon
                state.pokedex.pokemon = [
                    ...state.pokedex.pokemon.slice(0, index),
                    { 
                        ...state.pokedex.pokemon[index],
                        caught: !state.pokedex.pokemon[index].caught
                    },
                    ...state.pokedex.pokemon.slice(index+1),
                ];

                // Change the viewable Pokemon if the caught filter is on
                if(state.hideCaught) {
                    filterPokemon(state);
                }

                if (state.pokedex.pokemon[index].caught) state.totalCaught++;
                else state.totalCaught--;
            }
        },
        hideCaught: state => {
            state.hideCaught = true;
            filterPokemon(state);
        },
        showCaught: state => {
            state.hideCaught = false;
            filterPokemon(state);
        },
        setQuery: (state, action : {payload: string, type: string}) => {
            state.searchQuery = action.payload;
            filterPokemon(state);
        }
    }
});

function filterPokemon(state: CurrentPokedex) {
    if (state.hideCaught) {
        const notCaughtPokemon = state.pokedex.pokemon.filter(poke => !poke.caught);
        state.viewPokemon = notCaughtPokemon.filter(poke => poke.name.includes(state.searchQuery));
    }
    else state.viewPokemon = state.pokedex.pokemon.filter(poke => poke.name.includes(state.searchQuery));
}

export const { setPokedex, setCaught, hideCaught, showCaught, setQuery } = currentPokedexSlice.actions;

export const getPokemonData = (state: RootState, action : {payload: number}) => {
    const index = state.currentPokedex.pokedex.pokemon.map(poke => poke.id).indexOf(action.payload);
    return state.currentPokedex.pokedex.pokemon[index];
}
export default currentPokedexSlice.reducer;