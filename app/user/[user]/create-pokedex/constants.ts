interface PokemonGame {
    value: string
    name: string
    hasNational?: boolean
    hasDlc?: boolean
}

export const pokemonGames: PokemonGame[] = [
    {
        value: 'allgames',
        name: 'All Games'
    },
    {
        value: 'pokemonhome',
        name: 'Pokemon Home'
    },
    {
        value: 'scarletviolet',
        name: 'Scarlet/Violet',
        hasDlc: true
    },
    {
        value: 'legendsarceus',
        name: 'Legends: Arceus'
    },
    {
        value: 'bdsp',
        name: 'Brilliant Diamond/Shining Pearl'
    },
    {
        value: 'swordshield',
        name: 'Sword/Shield',
        hasDlc: true
    },
    {
        value: 'letsgopikachueevee',
        name: "Let's Go, Pikachu/Eevee"
    },
    {
        value: 'ultrasunmoon',
        name: 'Ultra Sun/Moon',
        hasNational: true
    },
    {
        value: 'sunmoon',
        name: 'Sun/Moon',
        hasNational: true
    },
    {
        value: 'oras',
        name: 'Omega Ruby/Alpha Sapphire',
        hasNational: true
    },
    {
        value: 'xy',
        name: 'X/Y',
        hasNational: true
    },
    {
        value: 'black2white2',
        name: 'Black 2/White 2',
        hasNational: true
    },
    {
        value: 'blackwhite',
        name: 'Black/White',
        hasNational: true
    },
    {
        value: 'hgss',
        name: 'HeartGold/SoulSilver',
        hasNational: true
    },
    {
        value: 'diamondpearlplatinum',
        name: 'Diamond/Pearl/Platinum',
        hasNational: true
    },
    {
        value: 'rubysapphireemerald',
        name: 'Ruby/Sapphire/Emerald',
        hasNational: true
    },
    {
        value: 'frlg',
        name: 'FireRed/LeafGreen',
        hasNational: true
    },
    {
        value: 'goldsilvercrystal',
        name: 'Gold/Silver/Crystal'
    },
    {
        value: 'redblueyellow',
        name: 'Red/Blue/Yellow'
    }
]