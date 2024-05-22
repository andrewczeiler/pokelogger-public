import { Pokemon } from './Pokemon';


export interface Pokedex {
    name: string
    game: string
    shiny: boolean
    dlc: boolean
    pokemon: Pokemon[]
}