'use client';

import * as React from 'react';

import Box from '@mui/material/Box';
import { setQuery } from '@/redux/features/currentPokedexSlice';
import { useAppDispatch } from '@/redux/hooks';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';


export default function SearchBar() {
    const [ searchQuery, setSearchQuery ] = React.useState('');

    const dispatch = useAppDispatch();

    function handleSearch(query: string) {
        dispatch(setQuery(query));
        setSearchQuery(query);
    }

    return (
        <Box
            width='100%'
            height='32px'
        >
            <TextField 
                    size='small'
                    value={searchQuery}
                    variant='outlined'
                    placeholder={'Search Pokémon...'}
                    onChange={(e) => handleSearch(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: 'black',
                            },
                            pt: '0!important',
                            pb: '0!important',
                            pr: '0!important',
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment 
                                sx={{ 
                                    cursor: 'default', 
                                    color: '#1C3651', 
                                    p: '8px',
                                    borderTopRightRadius: '5px', 
                                    borderBottomRightRadius: '5px', 
                                }} 
                                position='start' 
                            >
                                <SearchIcon fontSize='large' />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: '0',
                            p: '0', 
                            backgroundColor: 'white', 
                            fontSize: '1.2rem'
                        },
                        endAdornment: (
                            <>
                                { searchQuery.length ?
                                    <InputAdornment 
                                        sx={{ 
                                            cursor: 'pointer', 
                                            color: '#1C3651', 
                                            p: '8px',
                                            borderTopRightRadius: '5px', 
                                            borderBottomRightRadius: '5px', 
                                        }} 
                                        onClick={() => handleSearch('')}
                                        position='start' 
                                    >
                                        <CloseIcon fontSize='small' />
                                    </InputAdornment>
                                    :
                                    null
                                } 
                            </>
                        )
                    }}
                    fullWidth
                />
        </Box>
    );
}