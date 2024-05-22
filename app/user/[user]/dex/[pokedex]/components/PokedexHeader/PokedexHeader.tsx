import Box from '@/components/ServerComponents/Box';
import Typography from '@/components/ServerComponents/Typography';
import EditPokedex from './EditPokedex';


interface PokedexHeaderProps {
    name: string
    shiny: boolean
    game: string
    username: string
    dlc: boolean
}

export default function PokedexHeader(props: PokedexHeaderProps) {
    const { name, shiny, game, username, dlc } = props;

    const gameNameFormat: any = {
        "allgames": "All Games",
        "pokemonhome": "Pokemon Home",
        "scarletviolet": "Scarlet/Violet",
        "legendsarceus": "Legends: Arceus",
        "bdsp": "Brilliant Diamond/Shining Pearl",
        "swordshield": "Sword/Shield",
        "letsgopikachueevee": "Let's Go, Pikachu/Eevee!",
        "ultrasunmoon": "Ultra Sun/Moon",
        "sunmoon": "Sun/Moon",
        "oras": "Omega Ruby/Alpha Sapphire",
        "xy": "X/Y",
        "black2white2": "Black 2/White 2",
        "blackwhite": "Black/White",
        "hgss": "HeartGold/SoulSilver",
        "diamondpearlplatinum": "Diamond/Pearl/Platinum",
        "rubysapphireemerald": "Ruby/Sapphire/Emerald",
        "frlg": "FireRed/LeafGreen",
        "goldsilvercrystal": "Gold/Silver/Crystal",
        "redblueyellow": "Red/Blue/Yellow"
    }

    console.log(game)

    return (
        <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            width='100%'
            flexWrap='wrap'
        >
            <Box
                display='flex'
                flexDirection='row'
                alignItems='center'
                columnGap='8px'
            >
                <Typography variant='h3' >
                    { name }
                </Typography>
                <EditPokedex pokedexName={name} username={username} />
            </Box>
            <Box
                display='flex'
                flexDirection='row'
                columnGap='16px'
            >
                <Box bgcolor='#3182CE'>
                    <Typography color='white' fontWeight='600' p='4px 8px 4px 8px' >
                        { gameNameFormat[game] }
                    </Typography>
                </Box>
                { shiny ?
                    <Box bgcolor='#D53F8C'>
                        <Typography color='white' fontWeight='600' p='4px 8px 4px 8px' >
                            Shiny
                        </Typography>
                    </Box>
                    :
                    null
                }
                { dlc ?
                    <Box bgcolor='#c90a0a'>
                        <Typography color='white' fontWeight='600' p='4px 8px 4px 8px' >
                            DLC
                        </Typography>
                    </Box>
                    :
                    null
                }
            </Box>
        </Box>
    );
}