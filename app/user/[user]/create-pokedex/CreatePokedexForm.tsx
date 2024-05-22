'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import { pokemonGames } from './constants';
import PokedexForm from '@/types/PokedexForm';


interface CreatePokedexFormProps {
    username: string
}

export default function CreatePokedexForm(props: CreatePokedexFormProps) {
    const { username } = props;

    const [ name, setName ] = React.useState('');
    const [ game, setGame ] = React.useState('allgames');
    const [ shiny, setShiny ] = React.useState(false);
    const [ isNational, setIsNational ] = React.useState(false);
    const [ dlc, setDlc ] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);
    const [ error, setError ] = React.useState({ error: false, message: 'No error.' });

    const router = useRouter();
 
    function checkNameError() {
        if(name.length < 3) {
            setError({ error: true, message: 'Minimum name length is 3.'});
            return 0;
        }
        else if(name.length > 20) {
            setError({ error: true, message: 'Maximum name length is 20.'});
            return 0;
        }
        else if(!/^[a-zA-Z0-9\-]+$/.test(name)) {
            setError({ error: true, message: 'Pokedex name can only use letters, numbers, and dashes.'});
            return 0;
        }

        setError({ error: false, message: 'No error.' });
        return 1;
    }
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!checkNameError() || loading) return;

        // Set into loading state before going into fetch
        setLoading(true);

        const pokedexData: PokedexForm = {
            name,
            game,
            shiny,
            isNational,
            dlc
        }

        await fetch('/api/create-pokedex', { 
            method: 'POST',
            body: JSON.stringify(pokedexData)
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.status === 'fail') throw {message: data.message};
                router.push('/user/' + username + '/dex/' + name);
            })
            .catch((e) => {
                setError({ error: true, message: e.message });
            });

        setLoading(false);
    }

    let showDlc = false;
    if(pokemonGames.find(pokemonGame => pokemonGame.value === game)?.hasDlc) showDlc = true;

    let showNational = false;
    if(pokemonGames.find(pokemonGame => pokemonGame.value === game)?.hasNational) showNational = true;

    return (
        <Paper>
            <form onSubmit={(e) => handleSubmit(e)} method='POST' >
                <Box
                    display='flex'
                    flexDirection='column'
                    p='24px'
                    rowGap='24px'
                >
                    <Typography variant='h5' fontWeight='600' >
                        Create a New Pokédex
                    </Typography>
                    { error.error ?
                        <Box width='calc(100% + 48px)' bgcolor='#f7bcbc' m='0 -24px 0 -24px' >
                            <Typography textAlign='center' color='#fa0505' textOverflow='wrap' p='8px' > { error.message } </Typography>
                        </Box>
                        :
                        null
                    }
                    <div>
                        <Typography mb='8px'>
                            Pokédex Name
                        </Typography>
                        <OutlinedInput
                            size='small'
                            placeholder="Caught em' all"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Typography>
                            Shiny
                        </Typography>
                        <FormControl>
                            <RadioGroup
                                row
                                name='shiny-radio-group'
                                onChange={(e) => setShiny(e.target.value === 'true' ? true : false)}
                                value={shiny}
                            >
                                <FormControlLabel value={true} control={<Radio size='small' />} label='Yes' />
                                <FormControlLabel value={false} control={<Radio size='small' />} label='No' />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div>
                        <Typography mb='8px' >
                            Game
                        </Typography>
                        <FormControl fullWidth size='small'>
                            <Select
                                value={game}
                                onChange={(e) => setGame(e.target.value)}
                                fullWidth
                            >
                                { pokemonGames.map((game) => {
                                    return (
                                        <MenuItem key={game.value} value={game.value}>{game.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    { showDlc ? 
                        <div>
                            <Typography>
                                DLC
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    row
                                    name='shiny-radio-group'
                                    onChange={(e) => setDlc(e.target.value === 'true' ? true : false)}
                                    value={dlc}
                                >
                                    <FormControlLabel value={true} control={<Radio size='small' />} label='Add' />
                                    <FormControlLabel value={false} control={<Radio size='small' />} label="Don't Add" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        :
                        null
                    }
                    { showNational ? 
                        <div>
                            <Typography>
                                Dex Type
                            </Typography>
                            <FormControl>
                                <RadioGroup
                                    row
                                    name='shiny-radio-group'
                                    onChange={(e) => setIsNational(e.target.value === 'true' ? true : false)}
                                    value={isNational}
                                >
                                    <FormControlLabel value={true} control={<Radio size='small' />} label='National' />
                                    <FormControlLabel value={false} control={<Radio size='small' />} label='Regional' />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        :
                        null
                    }
                    <Box
                        display='flex'
                        justifyContent='flex-end'
                    >
                        <Button
                            type='submit'
                            variant='contained'
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </form>
        </Paper>
    )
}