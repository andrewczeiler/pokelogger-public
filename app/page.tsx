import Box from '@/components/ServerComponents/Box';
import Button from '@/components/ServerComponents/Button';
import Container from '@/components/ServerComponents/Container';
import List from '@/components/ServerComponents/List';
import ListItem from '@/components/ServerComponents/ListItem';
import Typography from '@/components/ServerComponents/Typography';
import Link from '@mui/material/Link';

import NextLink from 'next/link';


const pokedexGenerations = [
	{
		generation: 1,
		games: 'Red/Blue/Yellow'
	},
	{
		generation: 2,
		games: 'Gold/Silver/Crystal'
	},
	{
		generation: 3,
		games: 'FireRed/LeafGreen and Ruby/Sapphire/Emerald'
	},
	{
		generation: 4,
		games: 'HeartGold/SoulSilver and Diamond/Pearl/Platinum'
	},
	{
		generation: 5,
		games: 'Black 2/White 2 and Black/White'
	},
	{
		generation: 6,
		games: 'Omega Ruby/Alpha Sapphire and X/Y'
	},
	{
		generation: 7,
		games: "Let's Go, Pikachu!/Let's Go, Eevee!, Ultra Sun/Ultra Moon, and Sun/Moon"
	},
	{
		generation: 8,
		games: 'Legends: Arceus, Brilliant Diamond/Shining Pearl, and Sword/Shield'
	},
	{
		generation: 9,
		games: 'Scarlet/Violet'
	}
]

export default function HomePage(){


  	return (
		<Container>
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
				p='64px 32px 64px 32px'
			>
			<Typography variant='h1' mb='16px' >
				PokéLogger
			</Typography>
				<Typography variant='body1' fontSize='1.2em' textAlign='center' >
					Welcome to PokéLogger! This is a fanmade Pokédex tracking website for all mainline Pokémon games. An updated list of all of the Pokémon games implemented is given below:
				</Typography>
				<List>
					{pokedexGenerations.map((gen, i) => {
						return (
							<ListItem key={i} >
								<Typography>
									<span style={{fontWeight: '600'}}>{'Generation ' + gen.generation + ': '}</span>
									{ gen.games }
								</Typography>
							</ListItem>
						)
					})}
				</List>
				<Typography fontSize='0.8em' >
					*All of the above games have Regional/National dexes as well as DLC options where applicable*
				</Typography>
				<Link component={NextLink} href='/login' mt='32px' >
					<Button variant='outlined' >
						Catch em&apos; all!
					</Button>
				</Link>
			</Box>
		</Container>
  	)
}
