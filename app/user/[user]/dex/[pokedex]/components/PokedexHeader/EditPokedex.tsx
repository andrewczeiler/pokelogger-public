'use client';

import * as React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useSession } from 'next-auth/react';
import { ChangePokedexName } from '@/types/ChangePokedexName';
import { DeletePokedex } from '@/types/DeletePokedex';


interface EditPokedexProps {
    pokedexName: string
    username: string
}

export default function EditPokedex(props: EditPokedexProps) {
    const { pokedexName, username } = props;

    const [ openEdit, setOpenEdit ] = React.useState(false);
    const [ openDelete, setOpenDelete ] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);
    const [ name, setName ] = React.useState(pokedexName);
    const [ editError, setEditError ] = React.useState({
        error: false,
        message: ''
    });
    const [ deleteError, setDeleteError ] = React.useState({
        error: false,
        message: ''
    });

    const { data: session } = useSession();

    if(session?.user?.name !== username) return null;

    function handleOpenDeleteInEdit() {
        setOpenEdit(false);
        setOpenDelete(true);
    }

    async function handleDeletePokedex() {
        if(loading) return;
        setLoading(true);

        const body: DeletePokedex = {
            username,
            pokedexName
        }

        await fetch('/api/delete-pokedex', {
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                if(data.status !== 'ok') throw data.message;
                window.location.href = '/user/' + username;
            })
            .catch(e => {
                setDeleteError({
                    error: true,
                    message: e
                });
            });

        setLoading(false);
    }

    function handleCancelDeletion() {
        setOpenDelete(false);
        setOpenEdit(true);
    }

    async function handleChangePokedexName() {
        if(loading || !checkNameError()) return;
        if(name === pokedexName) {
            setEditError({
                error: true,
                message: 'Name has not been changed.'
            });
            return;
        }
        setLoading(true);

        const body: ChangePokedexName = {
            username,
            newName: name,
            pokedexName
        }

        await fetch('/api/edit-pokedex', {
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                if(data.status !== 'ok') throw data.message;
                window.location.href = '/user/' + username + '/dex/' + name;
            })
            .catch(e => {
                setEditError({
                    error: true,
                    message: e
                });
            });

        setLoading(false);
    }

    function checkNameError() {
        if(name.length < 3) {
            setEditError({ error: true, message: 'Minimum length is 3.'});
            return 0;
        }
        else if(name.length > 20) {
            setEditError({ error: true, message: 'Maximum name length is 20.'});
            return 0;
        }
        else if(!/^[a-zA-Z0-9\-]+$/.test(name)) {
            setEditError({ error: true, message: 'Pokédex name can only use letters, numbers, and dashes.'});
            return 0;
        }

        setEditError({ error: false, message: 'No error.' });
        return 1;
    }

    return (
        <>
            <EditIcon 
                fontSize='medium' 
                sx={{
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }} 
                onClick={() => setOpenEdit(true)}
            />
            <Modal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                disableAutoFocus
            >
                <Box
                    position='absolute'
                    width='324px'
                    bgcolor='white'
                    left='50%'
                    top='40%'
                    sx={{
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '4px'
                    }}
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                    >
                        <Box>
                            <Box 
                                display='flex'
                                flexDirection='row'
                                justifyContent='space-between'
                                alignItems='center'
                                p='12px' 
                            >
                                <Typography variant='h5' fontWeight='600' >
                                    Edit Pokédex
                                </Typography>
                                <CloseIcon 
                                    onClick={() => setOpenEdit(false)}
                                    sx={{
                                        '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }}
                                />
                            </Box>
                            <Divider />
                        </Box> 
                        { editError.error ?
                            <Box width='100%' bgcolor='#f7bcbc' m='12px 0 12px 0' >
                                <Typography textAlign='center' color='#fa0505' textOverflow='wrap' p='8px' > { editError.message } </Typography>
                            </Box>
                            :
                            null
                        }
                        <Box
                            p='12px'
                        >
                            <TextField 
                                label='Pokédex Name'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                            />
                        </Box>
                        <Box
                            display='flex'
                            flexDirection='row'
                            justifyContent='space-between'
                            p='12px'
                        >
                            <Button 
                                variant='contained' 
                                onClick={handleOpenDeleteInEdit}
                                sx={{
                                    bgcolor: '#e30505', 
                                    '&:hover': { 
                                        bgcolor: '#cc0606'
                                    }
                                }} 
                            >
                                Delete
                            </Button>
                            <Button 
                                variant='contained' 
                                onClick={handleChangePokedexName}
                                sx={{
                                    bgcolor: '#3182CE', 
                                    '&:hover': { 
                                        bgcolor: '#2b72b5'
                                    }
                                }}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={openDelete}
                onClose={handleCancelDeletion}
                disableAutoFocus
            >
                <Box
                    position='absolute'
                    width='324px'
                    bgcolor='white'
                    left='50%'
                    top='40%'
                    sx={{
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '4px'
                    }}
                >
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='space-between'
                    >
                        <Box>
                            <Typography fontSize='20px' fontWeight='600' p='12px' >
                                { 'Are you sure that you would like to delete ' + name + '? This action cannot be undone.'}
                            </Typography>
                            <Divider />
                        </Box> 
                        { deleteError.error ?
                            <Box width='100%' bgcolor='#f7bcbc' m='12px 0 12px 0' >
                                <Typography textAlign='center' color='#fa0505' textOverflow='wrap' p='8px' > { deleteError.message } </Typography>
                            </Box>
                            :
                            null
                        }
                        <Box
                            display='flex'
                            flexDirection='row'
                            justifyContent='space-between'
                            p='12px'
                        >
                            <Button 
                                variant='contained' 
                                onClick={handleCancelDeletion}
                                sx={{
                                    bgcolor: '#3182CE', 
                                    '&:hover': { 
                                        bgcolor: '#2b72b5' 
                                    }  
                                }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant='contained' 
                                onClick={handleDeletePokedex}
                                sx={{
                                    bgcolor: '#e30505', 
                                    '&:hover': { 
                                        bgcolor: '#cc0606' 
                                    }  
                                }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}